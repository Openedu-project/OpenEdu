'use client';

import type { IPermissionAction, IPermissionGroupedRoutes, IPermissionSelectedActions } from '@oe/api';
import { Checkbox } from '@oe/ui';
import { TableHead, TableRow } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { DEFAULT_ACTIONS_PERMISSION } from '../../permission-constant';

export const TableHeaderActions = ({
  selectedActions,
  groupedRoutes,
  onSelectAllAction,
}: {
  selectedActions: IPermissionSelectedActions;
  groupedRoutes: IPermissionGroupedRoutes;
  onSelectAllAction: (action: IPermissionAction) => void;
}) => {
  const t = useTranslations('permissionPagesList');

  const isAllChecked = useMemo(() => {
    const allRoutes = [...(groupedRoutes?.admin ?? []), ...(groupedRoutes?.creator ?? [])];
    return allRoutes.every(route => DEFAULT_ACTIONS_PERMISSION.every(action => selectedActions[route.key]?.[action]));
  }, [groupedRoutes, selectedActions]);

  const handleSelectAll = () => {
    const allRoutes = [...(groupedRoutes?.admin ?? []), ...(groupedRoutes?.creator ?? [])];
    const shouldCheck = !isAllChecked;
    for (const action of DEFAULT_ACTIONS_PERMISSION) {
      if (shouldCheck !== allRoutes.every(route => selectedActions[route.key]?.[action])) {
        onSelectAllAction(action);
      }
    }
  };

  return (
    <TableRow>
      <TableHead className="w-[250px] whitespace-nowrap bg-muted">{t('pageName')}</TableHead>
      <TableHead className="w-[250px] whitespace-nowrap bg-muted">{t('path')}</TableHead>
      {DEFAULT_ACTIONS_PERMISSION.map(action => (
        <TableHead key={action} className="min-w-[100px] bg-muted text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="whitespace-nowrap capitalize">{action}</span>
            <Checkbox
              checked={[...(groupedRoutes?.admin ?? []), ...(groupedRoutes?.creator ?? [])].every(
                route => selectedActions[route.key]?.[action]
              )}
              onCheckedChange={() => onSelectAllAction(action)}
            />
          </div>
        </TableHead>
      ))}
      <TableHead className="min-w-[100px] whitespace-nowrap bg-muted text-center">
        <div className="flex flex-col items-center gap-2">
          <span>{t('selectAll')}</span>
          <Checkbox checked={isAllChecked} onCheckedChange={handleSelectAll} />
        </div>
      </TableHead>
    </TableRow>
  );
};
