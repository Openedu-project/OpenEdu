'use client';
import type { IPermissionGroupedRoutes } from '@oe/api/types/permissions';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';
import { DEFAULT_ACTIONS_PERMISSION } from '../../permission-constant';

export interface IRoleHeader {
  name: string;
  permissions: {
    [entityKey: string]: {
      [action: string]: boolean;
    };
  };
}

const RoleHeader = memo(
  ({
    role,
    groupedRoutes,
    permissionConfig,
    onToggleAll,
  }: {
    role: IRoleHeader;
    groupedRoutes: IPermissionGroupedRoutes;
    permissionConfig: Record<string, string[]>;
    onToggleAll: (action: string) => void;
  }) => {
    const t = useTranslations('permissionRoleList');

    const allRoutes = [...groupedRoutes.admin, ...groupedRoutes.creator];

    const actionAvailability = useMemo(() => {
      return DEFAULT_ACTIONS_PERMISSION.map(action => {
        const routesWithAction = allRoutes.filter(route => permissionConfig[route.key]?.includes(action));
        const allChecked =
          routesWithAction.length > 0 && routesWithAction.every(route => role.permissions[route.key]?.[action]);
        const isDisabled = routesWithAction.length === 0;
        return { action, allChecked, isDisabled };
      });
    }, [allRoutes.filter, permissionConfig, role.permissions]);

    return (
      <div className="space-y-2">
        <div className="text-center font-medium">{role.name}</div>
        <div className="flex justify-around gap-2">
          {actionAvailability.map(({ action, allChecked, isDisabled }) => (
            <div key={action} className="flex flex-col items-center gap-1">
              <span className="text-xs capitalize">{action}</span>
              <Checkbox
                checked={allChecked}
                disabled={isDisabled}
                onCheckedChange={() => onToggleAll(action)}
                className={isDisabled ? 'bg-slate-300 opacity-50' : ''}
              />
            </div>
          ))}
          <div className="flex flex-col items-center gap-1">
            <span className="text-center text-xs capitalize">{t('selectAll')}</span>
          </div>
        </div>
      </div>
    );
  }
);

RoleHeader.displayName = 'RoleHeader';

export { RoleHeader };
