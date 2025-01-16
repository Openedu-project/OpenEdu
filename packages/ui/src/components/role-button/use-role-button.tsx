'use client';

import { useGetPermissionMyPageAccess, usePermissionRoutes } from '@oe/api/hooks/usePermission';
import type { IPermissionAction, IPermissionRouteInfo } from '@oe/api/types/permissions';
import { useCallback, useEffect, useState } from 'react';
import { usePathname } from '#common/navigation';

export const useCurrentPermissionRoute = () => {
  const pathname = usePathname();
  const routes = usePermissionRoutes();

  return useCallback(() => {
    for (const group of Object.values(routes)) {
      const route = group.find((r: IPermissionRouteInfo) => {
        const routePattern = r.path.replace(/:\w+/g, '[^/]+');
        const regex = new RegExp(`^${routePattern}$`);
        return regex.test(pathname);
      });
      if (route) {
        return route;
      }
    }
    return null;
  }, [pathname, routes])();
};

export const useButtonPermission = (entity: string, action: IPermissionAction) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { dataListPermissionMyPageAccess } = useGetPermissionMyPageAccess();

  const checkPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!dataListPermissionMyPageAccess) {
        setHasPermission(false);
        return;
      }
      const permitted = dataListPermissionMyPageAccess.some(
        permission => permission.entity === entity && permission.action === action && permission.allow
      );

      setHasPermission(permitted);
    } catch (error) {
      console.error('Permission check failed:', error);
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  }, [entity, action, dataListPermissionMyPageAccess]);

  useEffect(() => {
    if (dataListPermissionMyPageAccess) {
      checkPermission();
    }
  }, [dataListPermissionMyPageAccess, checkPermission]);

  return { hasPermission, isLoading };
};
