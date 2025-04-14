'use client';
import type { IPermissionRouteInfo } from '@oe/api';
import { Checkbox } from '@oe/ui';
import { memo, useMemo } from 'react';
import { DEFAULT_ACTIONS_PERMISSION } from '../../permission-constant';
import type { IRoleHeader } from './roles-list-header';

const RoleRowActions = memo(
  ({
    role,
    route,
    permissionConfig,
    onToggleRowRole,
    onTogglePermission,
  }: {
    role: IRoleHeader;
    route: IPermissionRouteInfo;
    permissionConfig: Record<string, string[]>;
    onToggleRowRole: (roleName: string, routeKey: string, checked: boolean) => void;
    onTogglePermission: (roleName: string, routeKey: string, action: string) => void;
  }) => {
    const availableActions = permissionConfig[route.key] || [];
    const isAllChecked = useMemo(() => {
      const enabledActions = DEFAULT_ACTIONS_PERMISSION.filter(action => availableActions.includes(action));
      return enabledActions.length > 0 && enabledActions.every(action => role.permissions[route.key]?.[action]);
    }, [role.permissions, route.key, availableActions]);

    return (
      <div className="flex justify-around gap-2">
        {DEFAULT_ACTIONS_PERMISSION.map(action => {
          const isAvailable = availableActions.includes(action);
          return (
            <div key={action} className="flex flex-col items-center gap-1">
              <Checkbox
                checked={role.permissions[route.key]?.[action]}
                disabled={!isAvailable}
                onCheckedChange={() => onTogglePermission(role.name, route.key, action)}
                className={isAvailable ? '' : 'bg-slate-300 opacity-50'}
              />
            </div>
          );
        })}
        <div className="flex flex-col items-center gap-1">
          <Checkbox
            checked={isAllChecked}
            disabled={availableActions.length === 0}
            onCheckedChange={checked => onToggleRowRole(role.name, route.key, !!checked)}
            className={availableActions.length === 0 ? 'bg-slate-300 opacity-50' : ''}
          />
        </div>
      </div>
    );
  }
);

RoleRowActions.displayName = 'RoleRowActions';

export { RoleRowActions };
