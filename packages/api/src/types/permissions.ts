import type { ADMIN_ROUTES, CREATOR_ROUTES } from '@oe/core/utils/routes';
import type { HTTPPagination } from './fetch';

// Permission Page Config
export interface IPermissionConfigEntityItem {
  id: string;
  name: string;
  type: string;
  actions: string[];
  description: string;
}

export interface IPermissionConfigActionItem extends Omit<IPermissionConfigEntityItem, 'actions'> {}

export interface IPermissionConfigPayload {
  configs: IPermissionConfigEntityItem[] | IPermissionConfigActionItem[];
}

export interface IPermissionConfigRes extends HTTPPagination<IPermissionConfigEntityItem> {}

// Permission Page Access
export interface IPermissionAccessItem {
  id: string;
  role: string;
  entity: string;
  action: string;
  allow: boolean;
  org_id: string;
}

export interface IPermissionAccessItemPayload extends Omit<IPermissionAccessItem, 'id'> {
  id?: string;
}

export interface IPermissionAccessPayload {
  page_access: IPermissionAccessItemPayload[];
}

export interface IPermissionAccessRes extends HTTPPagination<IPermissionAccessItem> {}

export interface IPermissionMyAccessItem extends Omit<IPermissionAccessItem, 'id' | 'role'> {}

export type IPermissionMyAccessRes = IPermissionAccessItem[];

export type IPermissionRoutePrefix = 'admin' | 'creator';

export type IPermissionAction = 'read' | 'create' | 'update' | 'delete';

export type IPermissionAdminRouteKey = keyof typeof ADMIN_ROUTES;

export type IPermissionCreatorRouteKey = keyof typeof CREATOR_ROUTES;

export type IPermissionRouteKey = `${IPermissionRoutePrefix}.${IPermissionAdminRouteKey | IPermissionCreatorRouteKey}`;

export interface IPermissionRouteInfo {
  key: IPermissionRouteKey;
  path: string;
  name: string;
}

export interface IPermissionGroupedRoutes {
  admin: IPermissionRouteInfo[];
  creator: IPermissionRouteInfo[];
  blog_admin: IPermissionRouteInfo[];
}

export interface IPermissionSelectedActions {
  [routeKey: string]: {
    [action in IPermissionAction]?: boolean;
  };
}
