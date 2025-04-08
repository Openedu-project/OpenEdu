'use client';
import {
  useCreatePermissionConfig,
  useGetPermissionPageConfig,
  usePermissionRoutes,
} from '@oe/api/hooks/usePermission';
import type {
  IPermissionAction,
  IPermissionConfigEntityItem,
  IPermissionConfigPayload,
  IPermissionRouteInfo,
  IPermissionRouteKey,
  IPermissionSelectedActions,
} from '@oe/api/types/permissions';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@oe/ui/shadcn/table';
import { Save, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { DEFAULT_ACTIONS_PERMISSION } from '../../permission-constant';
import { TableHeaderActions } from './pages-list-header';
import { RouteRow } from './pages-list-row';

export default function PagesList() {
  const t = useTranslations('permissionPagesList');
  const groupedRoutes = usePermissionRoutes();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActions, setSelectedActions] = useState<IPermissionSelectedActions>({});
  const [isSaving, setIsSaving] = useState(false);
  const { triggerCreatePermissionConfig } = useCreatePermissionConfig();
  const { dataListPermissionPageConfig } = useGetPermissionPageConfig({
    params: {
      type: 'entity',
      page: 1,
      per_page: 9999,
    },
  });
  const allRoutes = useMemo(
    () => [...(groupedRoutes?.admin ?? []), ...(groupedRoutes?.creator ?? []), ...(groupedRoutes?.blog_admin ?? [])],
    [groupedRoutes]
  );
  useEffect(() => {
    if (dataListPermissionPageConfig?.results) {
      const initialSelectedActions: IPermissionSelectedActions = {};

      for (const config of dataListPermissionPageConfig.results) {
        const matchingRoute = allRoutes.find(route => route.key === config.id);

        if (matchingRoute) {
          const actionMap: Record<IPermissionAction, boolean> = {
            read: config.actions.includes('read'),
            create: config.actions.includes('create'),
            update: config.actions.includes('update'),
            delete: config.actions.includes('delete'),
          };

          initialSelectedActions[config.id] = actionMap;
        }
      }

      setSelectedActions(initialSelectedActions);
    }
  }, [dataListPermissionPageConfig, allRoutes]);

  const handleActionToggle = useCallback((routeKey: IPermissionRouteKey, action: IPermissionAction) => {
    setSelectedActions(prev => ({
      ...prev,
      [routeKey]: {
        ...prev[routeKey],
        [action]: !prev[routeKey]?.[action],
      },
    }));
  }, []);

  const handleSelectAllForRoute = useCallback((routeKey: IPermissionRouteKey) => {
    setSelectedActions(prev => {
      const currentValues = prev[routeKey] || {};
      const areAllSelected = DEFAULT_ACTIONS_PERMISSION.every(action => currentValues[action]);

      return {
        ...prev,
        [routeKey]: Object.fromEntries(DEFAULT_ACTIONS_PERMISSION.map(action => [action, !areAllSelected])),
      };
    });
  }, []);

  const handleSelectAllForAction = useCallback(
    (action: IPermissionAction) => {
      const allRouteKeys = allRoutes.map(route => route.key);

      setSelectedActions(prev => {
        const areAllSelected = allRouteKeys.every(routeKey => prev[routeKey]?.[action]);

        return {
          ...prev,
          ...Object.fromEntries(
            allRouteKeys.map(routeKey => [
              routeKey,
              {
                ...prev[routeKey],
                [action]: !areAllSelected,
              },
            ])
          ),
        };
      });
    },
    [allRoutes]
  );

  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true);

      const configs: IPermissionConfigEntityItem[] = Object.values(groupedRoutes)
        .flat()
        .map(route => ({
          id: route.key,
          name: route.key,
          type: 'entity',
          actions: DEFAULT_ACTIONS_PERMISSION.filter(action => selectedActions[route.key]?.[action]),
          description: '',
        }));

      const payload: IPermissionConfigPayload = { configs };
      await triggerCreatePermissionConfig(payload);
      toast.success(t('success'));
    } catch (error) {
      console.error('Error saving permissions:', error);
    } finally {
      setIsSaving(false);
    }
  }, [groupedRoutes, selectedActions, t, triggerCreatePermissionConfig]);

  const filterRoutes = useCallback(
    (routes: IPermissionRouteInfo[]): IPermissionRouteInfo[] => {
      if (!searchTerm) {
        return routes;
      }

      const loweredSearch = searchTerm.toLowerCase();
      return routes.filter(
        route => route.name.toLowerCase().includes(loweredSearch) || route.path.toLowerCase().includes(loweredSearch)
      );
    },
    [searchTerm]
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Input
          placeholder={t('searchPage')}
          className="w-64 pl-8"
          value={searchTerm}
          prefixIcon={<Search className="h-4 w-4" />}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} className="flex items-center gap-2" disabled={isSaving} loading={isSaving}>
            <Save className="h-4 w-4" />
            {t('save')}
          </Button>
        </div>
      </div>
      <div className="scrollbar overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
            <TableHeaderActions
              selectedActions={selectedActions}
              groupedRoutes={groupedRoutes}
              onSelectAllAction={handleSelectAllForAction}
            />
          </TableHeader>
          <TableBody>
            {Object.entries(groupedRoutes).map(([group, routes]) => (
              <React.Fragment key={group}>
                <TableRow className="bg-slate-50">
                  <TableCell
                    colSpan={DEFAULT_ACTIONS_PERMISSION.length + 3}
                    className="sticky left-0 bg-slate-50 font-medium capitalize"
                  >
                    {group} {t('pages')}
                  </TableCell>
                </TableRow>
                {filterRoutes(routes).map(route => (
                  <RouteRow
                    key={route.key}
                    route={route}
                    selectedActions={selectedActions}
                    onActionToggle={handleActionToggle}
                    onSelectAllForRoute={handleSelectAllForRoute}
                  />
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <Card className="w-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{t('pagePermission')}</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
              <Input
                placeholder={t('searchPage')}
                className="w-64 pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleSave} className="flex items-center gap-2" disabled={isSaving} loading={isSaving}>
              <Save className="h-4 w-4" />
              {t('save')}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="w-full min-w-[1000px]">
            <Table>
              <TableHeader>
                <TableHeaderActions
                  selectedActions={selectedActions}
                  groupedRoutes={groupedRoutes}
                  onSelectAllAction={handleSelectAllForAction}
                />
              </TableHeader>
              <TableBody>
                {Object.entries(groupedRoutes).map(([group, routes]) => (
                  <React.Fragment key={group}>
                    <TableRow className="bg-slate-50">
                      <TableCell
                        colSpan={DEFAULT_ACTIONS_PERMISSION.length + 3}
                        className="sticky left-0 bg-slate-50 font-medium capitalize"
                      >
                        {group} {t('pages')}
                      </TableCell>
                    </TableRow>
                    {filterRoutes(routes).map(route => (
                      <RouteRow
                        key={route.key}
                        route={route}
                        selectedActions={selectedActions}
                        onActionToggle={handleActionToggle}
                        onSelectAllForRoute={handleSelectAllForRoute}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
