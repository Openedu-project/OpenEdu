'use client';
import type {
  IPermissionAction,
  IPermissionGroupedRoutes,
  IPermissionSelectedActions,
} from '@oe/api/types/permissions';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { TableHead, TableRow } from '@oe/ui/shadcn/table';
import { useTranslations } from 'next-intl';
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
      <TableHead className="min-w-[100px] whitespace-nowrap bg-muted text-center">{t('selectAll')}</TableHead>
    </TableRow>
  );
};
