'use client';
import type { IUserRoleInOrg } from '@oe/api';
import type { IUserProfile } from '@oe/api';
import { ROLES_USER_MAPPING } from '@oe/api';
import { pickCharacters } from '@oe/core';
import { Button } from '@oe/ui';
import { Link } from '@oe/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

interface GeneralInformationProps {
  profile: IUserProfile;
}

interface RoleMapping {
  roleId: string[];
  displayName: string;
}

function filterUserData(roles: IUserRoleInOrg[]) {
  if (!roles) {
    return [];
  }

  const orgMap: { [key: string]: IUserRoleInOrg } = {};

  for (const role of roles) {
    if (role.role_id !== 'learner' && role.role_id !== 'guest') {
      const orgId = role.org_id;

      if (!orgId) {
        continue;
      }

      if (!orgMap[orgId]) {
        orgMap[orgId] = {
          org_id: orgId,
          org_name: role.org_name && role.org_name.length > 0 ? role.org_name : (role.org_domain?.split('.')[0] ?? ''),
          role_id: role.role_id,
          org_domain: role.org_domain,
        };
      }
    }
  }

  const result = Object.values(orgMap).sort((a, b) => {
    if (a.org_name && a.org_name.length > 0 && (!b.org_name || b.org_name.length === 0)) {
      return -1;
    }
    if ((!a.org_name || a.org_name.length === 0) && b.org_name && b.org_name.length > 0) {
      return 1;
    }

    return (a.org_name ?? '').localeCompare(b.org_name ?? '');
  });

  return result;
}

const GeneralInformation = ({ profile }: GeneralInformationProps) => {
  const t = useTranslations('creatorSettingLaunchpad.ownerAndCollabs');
  const [showAll, setShowAll] = useState<boolean>(false);
  const { avatar, display_name, username, roles } = profile;

  const filteredOrgs = filterUserData(roles ?? []);

  const roleMappings: RoleMapping[] = [
    { roleId: [ROLES_USER_MAPPING.partner], displayName: t('roles.creator') },
    { roleId: [ROLES_USER_MAPPING.org_writer], displayName: t('roles.writer') },
    { roleId: [ROLES_USER_MAPPING.org_editor], displayName: t('roles.editor') },
    {
      roleId: [ROLES_USER_MAPPING.org_moderator, ROLES_USER_MAPPING.org_admin],
      displayName: t('roles.admin'),
    },
  ];

  const getRoleDisplayNames = (): string[] =>
    roleMappings
      .filter(mapping => filteredOrgs?.some(org => mapping?.roleId?.includes(org?.role_id ?? '')))
      .map(mapping => mapping.displayName);

  const roleDisplayNames = getRoleDisplayNames();

  const validOrgs = useMemo(
    () => [...filteredOrgs.filter(org => org?.org_name && org?.org_name?.length > 0)],
    [filteredOrgs]
  );

  const visibleOrgs = showAll ? validOrgs : filteredOrgs?.slice(0, 2);
  const hasMore = filteredOrgs?.slice(2)?.some(org => org?.org_name && org?.org_name?.length > 0);

  if (!profile) {
    return <div />;
  }

  return (
    <div className="justify-between">
      <div className="flex flex-col md:flex-row md:items-center">
        <Avatar className="me-4 size-32">
          <AvatarImage src={avatar} alt="avatar" />
          <AvatarFallback>
            {display_name && display_name?.length > 0 ? pickCharacters(display_name) : pickCharacters(username)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold text-3xl">
            {display_name && display_name?.length > 0 ? display_name : username}
          </h1>
          <div className="flex flex-col justify-between gap-spacing-sm font-semibold text-xl">
            <div>
              {roleDisplayNames?.length > 0 &&
                roleDisplayNames?.map(role => (
                  <span key={role} className="mb-spacing-sm capitalize">
                    {role.toLowerCase()}
                  </span>
                ))}
            </div>
            {filteredOrgs?.length > 0 && (
              <div className="mcaption-regular16 flex items-center">
                <span className="mr-spacing-s text-content-neutral-strong-900">{t('for')}</span>
                <div className="flex flex-wrap items-center">
                  {visibleOrgs.map((item, index) => (
                    <div key={item.org_id} className="flex flex-wrap items-center">
                      <Link
                        href={`//${item.org_domain}`}
                        target="_blank"
                        className="!p-0 flex items-center justify-center"
                      >
                        <span className="line-clamp-1 flex-1 text-center">{item.org_name}</span>
                      </Link>
                      {validOrgs?.length > 0 && index < validOrgs.length - 1 && validOrgs?.length > 1 && (
                        <span className="me-2">,</span>
                      )}
                    </div>
                  ))}

                  {hasMore && (
                    <Button
                      variant="ghost"
                      className="!rounded-none h-fit border-primary border-b p-0 text-primary hover:bg-transparent hover:text-primary sm:ml-spacing-xs"
                      onClick={() => setShowAll(!showAll)}
                    >
                      {showAll ? t('seeLess') : t('seeMore')}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mcaption-semibold16 md:mcaption-semibold20 whitespace-pre-wrap ">{profile?.headline}</h3>
        <span className="flex space-x-4 text-primary text-xl">
          <p>
            <b>{profile?.total_courses}</b> {t('courses')}
          </p>
          <p>
            <b>{profile.total_blogs}</b> {t('blogs')}
          </p>
        </span>
      </div>
    </div>
  );
};

export { GeneralInformation };
