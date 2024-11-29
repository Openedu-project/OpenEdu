'use client';
import type { IPermissionAction } from '@oe/api/types/permissions';
import { Button } from '@oe/ui/shadcn/button';
import type { ButtonProps } from '@oe/ui/shadcn/button';
import type React from 'react';
import { useButtonPermission, useCurrentPermissionRoute } from './use-role-button';

/*==============HOW TO USE==================
  - Auto get route

  <RoleButton
    action="create"
    onClick={handleCreate}
  >
    Create New Item
  </RoleButton>

  ===========================================

  - Override the route by entity name

  <RoleButton
    action="delete"
    entity="admin.courses"
    onClick={handleDelete}
    onValidationFail={() => toast.error('No permission')}
  >
    Delete Course
  </RoleButton>
*/
export interface IRoleButtonProps extends ButtonProps {
  action: IPermissionAction;
  children: React.ReactNode;
  onValidationFail?: () => void;
  className?: string;
  entity?: string;
}

export function RoleButton({
  action,
  children,
  onValidationFail,
  className = '',
  entity: entityOverride,
  ...buttonProps
}: IRoleButtonProps) {
  const currentRoute = useCurrentPermissionRoute();
  const entity = entityOverride || currentRoute?.key || '';
  const { hasPermission, isLoading } = useButtonPermission(entity, action);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hasPermission) {
      e.preventDefault();
      e.stopPropagation();
      onValidationFail?.();
      return;
    }

    buttonProps.onClick?.(e);
  };

  if (!(hasPermission && isLoading)) {
    return null;
  }

  return (
    <Button className={className} {...buttonProps} onClick={handleClick}>
      {children}
    </Button>
  );
}
