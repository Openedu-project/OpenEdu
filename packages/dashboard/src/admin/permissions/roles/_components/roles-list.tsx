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
import { Card, CardContent, CardHeader, CardTitle } from '@oe/ui/shadcn/card';
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
import { type IRoleHeader, RoleHeader } from './roles-list-header';
import { RoleRowActions } from './roles-list-row';

export default function RolesList() {
  const t = useTranslations('permissionRoleList');

  const groupedRoutes = usePermissionRoutes();
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState<IRoleHeader[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');

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
    },
  });
  const allRoutes = useMemo(() => [...groupedRoutes.admin, ...groupedRoutes.creator], [groupedRoutes]);

  const { triggerCreatePermissionAccess } = useCreatePermissionAccess();

  const createInitialPermissions = useCallback(() => {
    const permissions: Record<string, Record<string, boolean>> = {};

    for (const route of allRoutes) {
      if (!route.key) {
        continue;
      }

      const actionMap: Record<string, boolean> = {};
      for (const action of DEFAULT_ACTIONS_PERMISSION) {
        actionMap[action] = false;
      }

      permissions[route.key] = actionMap;
    }

    return permissions;
  }, [allRoutes]);

  useEffect(() => {
    if (dataListOrganization?.results) {
      setSelectedOrgId(dataListOrganization.results[0]?.id ?? '');
    }
  }, [dataListOrganization]);

  useEffect(() => {
    if (roles.length === 0) {
      const initialRoles: IRoleHeader[] = [];

      for (const roleName of DEFAULT_ROLES_PERMISSION) {
        initialRoles.push({
          name: roleName,
          permissions: createInitialPermissions(),
        });
      }

      setRoles(initialRoles);
      return;
    }

    if (!dataListPermissionPageAccess) {
      return;
    }

    setRoles(prevRoles => {
      const newRoles: IRoleHeader[] = prevRoles.map(role => ({
        name: role.name,
        permissions: { ...role.permissions },
      }));

      if (dataListPermissionPageAccess.results.length === 0) {
        for (const role of newRoles) {
          role.permissions = createInitialPermissions();
        }
        return newRoles;
      }

      const roleMap = new Map(newRoles.map(role => [role.name, role]));

      for (const access of dataListPermissionPageAccess.results) {
        const role = roleMap.get(access.role);
        if (!role) {
          continue;
        }

        if (!(access.entity in role.permissions)) {
          role.permissions[access.entity] = {};
        }

        role.permissions[access.entity] = {
          ...role.permissions[access.entity],
          [access.action]: access.allow,
        };
      }

      return newRoles;
    });
  }, [roles.length, dataListPermissionPageAccess, createInitialPermissions]);

  const debouncedSetSearch = useDebouncedCallback((value: string) => setSearchTerm(value), 300);

  const permissionConfigMap = useMemo(() => {
    if (!dataListPermissionPageConfig?.results) {
      return {};
    }
    return dataListPermissionPageConfig.results.reduce((acc: Record<string, string[]>, config) => {
      acc[config.id] = config.actions;
      return acc;
    }, {});
  }, [dataListPermissionPageConfig]);

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

  const handleTogglePermission = useCallback(
    (roleName: string, routeKey: string, action: string) => {
      const availableActions = permissionConfigMap[routeKey] || [];
      if (!availableActions.includes(action)) {
        return;
      }

      setRoles(prev =>
        prev.map(role => {
          if (role.name !== roleName) {
            return role;
          }
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [routeKey]: {
                ...role.permissions[routeKey],
                [action]: !role.permissions[routeKey]?.[action],
              },
            },
          };
        })
      );
    },
    [permissionConfigMap]
  );

  const handleToggleRowRole = useCallback(
    (roleName: string, routeKey: string, checked: boolean) => {
      const availableActions = permissionConfigMap[routeKey] || [];
      if (availableActions.length === 0) {
        return;
      }

      setRoles(prev =>
        prev.map(role => {
          if (role.name !== roleName) {
            return role;
          }
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [routeKey]: Object.fromEntries(
                DEFAULT_ACTIONS_PERMISSION.map(action => [action, checked && availableActions.includes(action)])
              ),
            },
          };
        })
      );
    },
    [permissionConfigMap]
  );

  const handleSave = useCallback(async () => {
    if (!selectedOrgId) {
      return;
    }

    try {
      setIsSaving(true);

      const allRoutes = [...groupedRoutes.admin, ...groupedRoutes.creator];
      const pageAccesses = roles.flatMap(role =>
        allRoutes.flatMap(route => {
          const availableActions = permissionConfigMap[route.key] || [];
          return availableActions.map(action => ({
            role: role.name,
            entity: route.key,
            action,
            allow: !!role.permissions[route.key]?.[action],
            org_id: selectedOrgId,
          }));
        })
      ) as IPermissionAccessItemPayload[];

      await triggerCreatePermissionAccess({ page_access: pageAccesses });
      mutate(() => true);
      toast.success(t('success'));
    } catch (error) {
      console.error('Error saving permissions:', error);
    } finally {
      setIsSaving(false);
    }
  }, [t, roles, groupedRoutes, permissionConfigMap, selectedOrgId, triggerCreatePermissionAccess]);

  return (
    <div className="space-y-4">
      <Card className="w-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{t('pagePermission')}</CardTitle>
          <div className="flex items-center space-x-4">
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
            <div className="relative">
              <Search className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
              <Input
                placeholder={t('searchPage')}
                className="w-64 pl-8"
                defaultValue={searchTerm}
                onChange={e => debouncedSetSearch(e.target.value)}
              />
            </div>
            <Button onClick={handleSave} className="flex items-center gap-2" disabled={isSaving || !selectedOrgId}>
              <Save className="h-4 w-4" />
              {t('save')}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="relative w-full min-w-[1000px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="-left-[24px] sticky z-20 w-[250px] bg-white">
                    <div className="flex items-center">
                      <span>{t('pageName')}</span>
                    </div>
                  </TableHead>
                  {roles?.map(role => (
                    <TableHead key={role.name} className="min-w-[200px]">
                      <RoleHeader
                        role={role}
                        groupedRoutes={groupedRoutes}
                        permissionConfig={permissionConfigMap}
                        onToggleAll={action => {
                          const allRoutes = [...groupedRoutes.admin, ...groupedRoutes.creator];
                          for (const route of allRoutes) {
                            handleTogglePermission(role.name, route.key, action);
                          }
                        }}
                      />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(filteredRoutes).map(([group, routes]) => (
                  <React.Fragment key={group}>
                    <TableRow className="bg-slate-50">
                      <TableCell className="-left-[24px] sticky z-20 bg-slate-50 font-medium capitalize">
                        <div className="flex items-center">
                          <span>
                            {group} {t('pages')}
                          </span>
                        </div>
                      </TableCell>
                      {roles?.map(role => (
                        <TableCell key={role.name} className="bg-slate-50" />
                      ))}
                    </TableRow>
                    {routes?.map((route: IPermissionRouteInfo) => (
                      <TableRow key={route.key}>
                        <TableCell className="-left-[24px] sticky z-20 bg-white font-medium capitalize">
                          <span>{route.name}</span>
                        </TableCell>
                        {roles.map(role => (
                          <TableCell key={role.name} className="text-center">
                            <RoleRowActions
                              role={role}
                              route={route}
                              permissionConfig={permissionConfigMap}
                              onToggleRowRole={handleToggleRowRole}
                              onTogglePermission={handleTogglePermission}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
