import type { ReactElement } from 'react';
import { ADMIN_ROUTES, CREATOR_ROUTES } from './routes';

interface IMenuItem {
  id: string;
  label: string;
  icon: ReactElement;
  href?: string;
  items?: IMenuItem[];
  isRoot?: boolean;
}

interface IPermission {
  entity: string;
  action: string;
  allow: boolean;
}

type AdminRoutes = typeof ADMIN_ROUTES;
type CreatorRoutes = typeof CREATOR_ROUTES;

export function createPathEntityMap(adminRoutes: AdminRoutes, creatorRoutes: CreatorRoutes): Record<string, string> {
  const mapping: Record<string, string> = {};

  for (const [key, path] of Object.entries(adminRoutes)) {
    mapping[path] = `admin.${key}`;
  }

  for (const [key, path] of Object.entries(creatorRoutes)) {
    mapping[path] = `creator.${key}`;
  }

  return mapping;
}
export function hasPermission(entity: string, permissions: IPermission[]): boolean {
  return (
    permissions?.some(
      permission => permission.entity === entity && permission.action === 'read' && permission.allow === true
    ) ?? false
  );
}

export function filterMenuItems(
  items: IMenuItem[],
  getEntityFromPath: (path: string) => string,
  checkPermission: (entity: string) => boolean
): IMenuItem[] {
  return items
    .map(item => {
      const newItem = { ...item };

      if (newItem.href) {
        const entity = getEntityFromPath(newItem.href);
        if (!checkPermission(entity)) {
          return null;
        }
      }

      if (newItem.items) {
        const filteredItems = filterMenuItems(newItem.items, getEntityFromPath, checkPermission);
        if (filteredItems.length === 0 && !newItem.isRoot) {
          return null;
        }
        newItem.items = filteredItems;
      }

      return newItem;
    })
    .filter((item): item is IMenuItem => item !== null);
}

export function checkSidebarPermissions(menuItems: IMenuItem[], permissions: IPermission[]): IMenuItem[] {
  const pathToEntityMap = createPathEntityMap(ADMIN_ROUTES, CREATOR_ROUTES);

  const getEntityFromPath = (path: string): string => {
    return pathToEntityMap[path] || '';
  };

  const checkPermission = (entity: string): boolean => {
    return hasPermission(entity, permissions);
  };

  return filterMenuItems(menuItems, getEntityFromPath, checkPermission);
}
