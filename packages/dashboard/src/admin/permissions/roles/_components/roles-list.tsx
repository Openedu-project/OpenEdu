'use client';
import { useGetOrganization } from '@oe/api/hooks/useOrganization';
import {
  useCreatePermissionAccess,
  useGetPermissionPageAccess,
  useGetPermissionPageConfig,
  usePermissionRoutes,
} from '@oe/api/hooks/usePermission';
import type { IPermissionAccessItemPayload, IPermissionRouteInfo } from '@oe/api/types/permissions';
import { Button } from '@oe/ui/shadcn/button';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { Input } from '@oe/ui/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { toast } from '@oe/ui/shadcn/sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@oe/ui/shadcn/table';
import { Save, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';
import { useDebouncedCallback } from 'use-debounce';
import { DEFAULT_ACTIONS_PERMISSION, DEFAULT_ROLES_PERMISSION } from '../../permission-constant';

export default function RolesList() {
  const t = useTranslations('permissionRoleList');

  const groupedRoutes = usePermissionRoutes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});
  const [isSaving, setIsSaving] = useState(false);

  const { dataListOrganization } = useGetOrganization({
    params: { page: 1, per_page: 9999 },
  });

  const { dataListPermissionPageConfig } = useGetPermissionPageConfig({
    params: {
      type: 'entity',
      page: 1,
      per_page: 9999,
    },
  });

  const { dataListPermissionPageAccess } = useGetPermissionPageAccess({
    orgId: selectedOrgId,
    params: {
      page: 1,
      per_page: 999999,
      org_id: selectedOrgId,
      role: selectedRole,
    },
  });

  const allRoutes = useMemo(() => [...groupedRoutes.admin, ...groupedRoutes.creator], [groupedRoutes]);

  const { triggerCreatePermissionAccess } = useCreatePermissionAccess();

  const createInitialPermissions = useCallback(() => {
    const perms: Record<string, Record<string, boolean>> = {};
    for (const route of allRoutes) {
      if (!route.key) {
        continue;
      }
      perms[route.key] = Object.fromEntries(DEFAULT_ACTIONS_PERMISSION.map(action => [action, false]));
    }
    return perms;
  }, [allRoutes]);

  useEffect(() => {
    if (dataListOrganization?.results) {
      setSelectedOrgId(dataListOrganization.results[0]?.id ?? '');
    }
  }, [dataListOrganization]);

  useEffect(() => {
    if (!(selectedRole && selectedOrgId)) {
      setPermissions(createInitialPermissions());
      return;
    }

    if (!dataListPermissionPageAccess) {
      return;
    }

    if (dataListPermissionPageAccess.results.length === 0) {
      setPermissions(createInitialPermissions());
      return;
    }

    const newPermissions: Record<string, Record<string, boolean>> = createInitialPermissions();

    for (const access of dataListPermissionPageAccess.results) {
      if (access.role === selectedRole) {
        const entityPermissions = (newPermissions[access.entity] || {}) as Record<string, boolean>;
        newPermissions[access.entity] = entityPermissions;
        entityPermissions[access.action] = access.allow;
      }
    }

    setPermissions(newPermissions);
  }, [selectedRole, selectedOrgId, dataListPermissionPageAccess, createInitialPermissions]);

  const permissionConfigMap = useMemo(() => {
    if (!dataListPermissionPageConfig?.results) {
      return {};
    }
    return dataListPermissionPageConfig.results.reduce((acc: Record<string, string[]>, config) => {
      acc[config.id] = config.actions;
      return acc;
    }, {});
  }, [dataListPermissionPageConfig]);

  const handleTogglePermission = useCallback(
    (routeKey: string, action: string) => {
      const availableActions = permissionConfigMap[routeKey] || [];
      if (!availableActions.includes(action)) {
        return;
      }

      setPermissions(prev => ({
        ...prev,
        [routeKey]: {
          ...prev[routeKey],
          [action]: !prev[routeKey]?.[action],
        },
      }));
    },
    [permissionConfigMap]
  );

  const handleToggleAll = useCallback(
    (action: string, checked: boolean) => {
      setPermissions(prev => {
        const newPermissions = { ...prev };
        for (const route of allRoutes) {
          if (route.key && permissionConfigMap[route.key]?.includes(action)) {
            newPermissions[route.key] = {
              ...newPermissions[route.key],
              [action]: checked,
            };
          }
        }
        return newPermissions;
      });
    },
    [allRoutes, permissionConfigMap]
  );

  const handleRowToggleAll = useCallback(
    (routeKey: string, checked: boolean) => {
      const availableActions = permissionConfigMap[routeKey] || [];
      if (availableActions.length === 0) {
        return;
      }

      setPermissions(prev => ({
        ...prev,
        [routeKey]: Object.fromEntries(
          DEFAULT_ACTIONS_PERMISSION.map(action => [action, checked && availableActions.includes(action)])
        ),
      }));
    },
    [permissionConfigMap]
  );

  const handleSave = useCallback(async () => {
    if (!(selectedOrgId && selectedRole)) {
      return;
    }

    try {
      setIsSaving(true);
      const pageAccesses = allRoutes.flatMap(route => {
        const availableActions = permissionConfigMap[route.key] || [];
        return availableActions.map(action => ({
          role: selectedRole,
          entity: route.key,
          action,
          allow: !!permissions[route.key]?.[action],
          org_id: selectedOrgId,
        }));
      }) as IPermissionAccessItemPayload[];

      await triggerCreatePermissionAccess({ page_access: pageAccesses });
      mutate(() => true);
      toast.success(t('success'));
    } catch (error) {
      console.error('Error saving permissions:', error);
    } finally {
      setIsSaving(false);
    }
  }, [t, permissions, allRoutes, permissionConfigMap, selectedOrgId, selectedRole, triggerCreatePermissionAccess]);

  const debouncedSetSearch = useDebouncedCallback((value: string) => setSearchTerm(value), 300);

  const filteredRoutes = useMemo(() => {
    if (!searchTerm.trim()) {
      return groupedRoutes;
    }

    const loweredSearch = searchTerm.toLowerCase();
    const filterRouteFn = (routes: IPermissionRouteInfo[]): IPermissionRouteInfo[] =>
      routes.filter(
        route => route.name.toLowerCase().includes(loweredSearch) || route.path.toLowerCase().includes(loweredSearch)
      );

    return {
      admin: filterRouteFn(groupedRoutes.admin),
      creator: filterRouteFn(groupedRoutes.creator),
    };
  }, [searchTerm, groupedRoutes]);

  const isActionAllChecked = useCallback(
    (action: string) => {
      const routesWithAction = allRoutes.filter(route => permissionConfigMap[route.key]?.includes(action));
      return routesWithAction.length > 0 && routesWithAction.every(route => permissions[route.key]?.[action]);
    },
    [allRoutes, permissionConfigMap, permissions]
  );
  const isAllRowsChecked = useCallback(() => {
    const routesWithActions = allRoutes.filter(route => Object.keys(permissionConfigMap[route.key] || {}).length > 0);
    return (
      routesWithActions.length > 0 &&
      routesWithActions.every(route =>
        DEFAULT_ACTIONS_PERMISSION.every(
          action => !(permissionConfigMap[route.key] || []).includes(action) || permissions[route.key]?.[action]
        )
      )
    );
  }, [allRoutes, permissionConfigMap, permissions]);

  const handleToggleAllRows = useCallback(
    (checked: boolean) => {
      setPermissions(prev => {
        const newPermissions = { ...prev };
        for (const route of allRoutes) {
          if (route.key) {
            const availableActions = permissionConfigMap[route.key] || [];
            if (availableActions.length > 0) {
              newPermissions[route.key] = Object.fromEntries(
                DEFAULT_ACTIONS_PERMISSION.map(action => [action, checked && availableActions.includes(action)])
              );
            }
          }
        }
        return newPermissions;
      });
    },
    [allRoutes, permissionConfigMap]
  );
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Select value={selectedOrgId} onValueChange={setSelectedOrgId}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select organization" />
          </SelectTrigger>
          <SelectContent>
            {dataListOrganization?.results?.map(org => (
              <SelectItem key={org.id} value={org.id}>
                {org.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_ROLES_PERMISSION.map(role => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder={t('searchPage')}
          className="w-48 pl-8 md:w-64"
          defaultValue={searchTerm}
          prefixIcon={<Search className="h-4 w-4" />}
          onChange={e => debouncedSetSearch(e.target.value)}
        />
        <div>
          <Button
            onClick={handleSave}
            className="flex items-center gap-2 md:ml-auto"
            disabled={isSaving || !selectedOrgId || !selectedRole}
          >
            <Save className="h-4 w-4" />
            {t('save')}
          </Button>
        </div>
      </div>

      <div className="scrollbar overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 shadow">
            <TableRow>
              <TableHead className="min-w-[250px] bg-muted">
                <div className="flex items-center">
                  <span>{t('pageName')}</span>
                </div>
              </TableHead>
              {DEFAULT_ACTIONS_PERMISSION.map(action => (
                <TableHead key={action} className="bg-muted text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs capitalize">{action}</span>
                    <Checkbox
                      checked={isActionAllChecked(action)}
                      onCheckedChange={checked => handleToggleAll(action, !!checked)}
                    />
                  </div>
                </TableHead>
              ))}
              <TableHead className="bg-muted text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs capitalize">{t('selectAll')}</span>
                  <Checkbox checked={isAllRowsChecked()} onCheckedChange={checked => handleToggleAllRows(!!checked)} />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(filteredRoutes).map(([group, routes]) => (
              <React.Fragment key={group}>
                <TableRow className="bg-slate-50">
                  <TableCell className="-left-[24px] bg-slate-50 font-medium capitalize">
                    <div className="flex items-center">
                      <span>
                        {group} {t('pages')}
                      </span>
                    </div>
                  </TableCell>
                  {DEFAULT_ACTIONS_PERMISSION.map(action => (
                    <TableCell key={action} className="bg-slate-50" />
                  ))}
                  <TableCell className="bg-slate-50" />
                </TableRow>

                {routes?.map((route: IPermissionRouteInfo) => (
                  <TableRow key={route.key}>
                    <TableCell className="-left-[24px] bg-white font-medium capitalize">
                      <span>{route.name}</span>
                    </TableCell>
                    {DEFAULT_ACTIONS_PERMISSION.map(action => {
                      const isAvailable = (permissionConfigMap[route.key] || []).includes(action);
                      return (
                        <TableCell key={action} className="text-center">
                          <Checkbox
                            checked={permissions[route.key]?.[action]}
                            disabled={!isAvailable}
                            onCheckedChange={() => handleTogglePermission(route.key, action)}
                            className={isAvailable ? '' : 'bg-slate-300 opacity-50'}
                          />
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center">
                      <Checkbox
                        checked={DEFAULT_ACTIONS_PERMISSION.every(
                          action =>
                            !(permissionConfigMap[route.key] || []).includes(action) || permissions[route.key]?.[action]
                        )}
                        disabled={Object.keys(permissionConfigMap[route.key] || {}).length === 0}
                        onCheckedChange={checked => handleRowToggleAll(route.key, !!checked)}
                        className={
                          Object.keys(permissionConfigMap[route.key] || {}).length > 0 ? '' : 'bg-slate-300 opacity-50'
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
