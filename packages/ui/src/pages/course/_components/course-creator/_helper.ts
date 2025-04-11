import { createAPIUrl } from '@oe/api';
import type { IUserRoleInOrg } from '@oe/api';
import type { IUserProfileRole } from '@oe/api';
import { PLATFORM_ROUTES } from '@oe/core';

export const filterUserData = (roles: IUserRoleInOrg[]) => {
  const orgMap: { [key: string]: IUserProfileRole } = {};

  for (const role of roles) {
    if (role.role_id !== 'learner' && role.role_id !== 'guest') {
      const orgId = role.org_id;

      if (!orgMap[orgId]) {
        orgMap[orgId] = {
          org_id: orgId,
          org_name:
            role.org_name.length > 0 ? role.org_name : role.org_domain ? (role.org_domain.split('.')[0] ?? '') : '',
          role_id: role.role_id,
          org_domain: role.org_domain,
        };
      }
    }
  }

  // return Object.values(orgMap);
  const result = Object.values(orgMap).sort((a, b) => {
    // Organizations with non-empty names come first
    if (a.org_name.length > 0 && b.org_name.length === 0) {
      return -1;
    }
    if (a.org_name.length === 0 && b.org_name.length > 0) {
      return 1;
    }

    // If both have names or both don't have names, sort alphabetically
    return a.org_name.localeCompare(b.org_name);
  });

  return result;
};

interface RoleMapping {
  roleId: string[];
  displayName: string;
}

export const roleMappings: RoleMapping[] = [
  { roleId: ['partner'], displayName: 'Educator' },
  { roleId: ['org_writer'], displayName: 'Writer' },
  { roleId: ['org_editor'], displayName: 'Editor' },
  { roleId: ['org_moderator', 'org_admin'], displayName: 'Admin' },
];

export const userProfileUrl = (username: string) =>
  username && username?.length > 0
    ? createAPIUrl({
        endpoint: PLATFORM_ROUTES.userProfile,
        params: { username: username },
      })
    : '';
