import type { IUser } from '#types/user';

export type IPermission = {
  resource: string;
  actions: string[];
};

export type IRolePermissions = {
  name: string;
  permissions: IPermission[];
  dashboards: string[];
};

export const ROLES: IRolePermissions[] = [
  {
    name: 'org_admin',
    permissions: [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'settings', actions: ['read', 'update'] },
    ],
    dashboards: ['/admin', '/organization-blog'],
  },
  {
    name: 'org_moderator',
    permissions: [
      { resource: 'users', actions: ['read', 'update'] },
      { resource: 'content', actions: ['read', 'update', 'delete'] },
    ],
    dashboards: ['/admin', '/organization-blog'],
  },
  {
    name: 'partner',
    permissions: [
      { resource: 'courses', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'assignments', actions: ['create', 'read', 'update', 'delete'] },
    ],
    dashboards: ['/creator', '/organization-blog'],
  },
  {
    name: 'learner',
    permissions: [
      { resource: 'courses', actions: ['read'] },
      { resource: 'assignments', actions: ['read', 'update'] },
    ],
    dashboards: ['/learner'],
  },
];

export function canAccessDashboard(user: IUser, dashboard: string, orgDomain: string) {
  // const orgId = getOrgIdServer();

  const userRoles = ROLES.filter(role =>
    user.roles?.find(userRole => userRole.role_id === role.name && userRole.org_domain === orgDomain)
  );

  return userRoles.some(role => role.dashboards.includes(dashboard));
}
