import type { IUserRoleInOrg } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Link } from '#common/navigation';
import { filterUserData, roleMappings } from './_helper';

export function CreatorRole({ roles }: { roles: IUserRoleInOrg[] }) {
  const tProfile = useTranslations('userProfile.profile');

  const filteredOrgs = filterUserData(roles);

  const getRoleDisplayNames = (): string[] =>
    roleMappings
      .filter(mapping => filteredOrgs?.some(org => mapping?.roleId?.includes(org?.role_id)))
      .map(mapping => mapping.displayName);

  const roleDisplayNames = getRoleDisplayNames();

  const validOrgs = useMemo(
    () =>
      // Always include the first org, then filter the rest based on org_name
      [filteredOrgs[0], ...filteredOrgs.slice(1).filter(org => org?.org_name?.length > 0)],
    [filteredOrgs]
  );

  const visibleOrgs = filteredOrgs?.slice(0, 2);
  const hasMore = filteredOrgs?.slice(2)?.some(org => org?.org_name?.length > 0);

  return (
    <div className="mcaption-semibold14 lg:mcaption-semibold16 mt-1 flex flex-col justify-between gap-1 lg:mt-2 lg:gap-2">
      <div>
        {roleDisplayNames?.length > 0 &&
          roleDisplayNames?.map((role, index) => (
            <span key={role} className="mb-3 text-current">
              {index > 0 && <span> . </span>}&nbsp;
              {tProfile(role.toLowerCase())}
            </span>
          ))}
      </div>
      {filteredOrgs?.length > 0 && (
        <div className="mcaption-regular12 lg:mcaption-regular14 flex items-center">
          <span className="mr-4 text-neutral-900">{tProfile('for')}</span>
          <div className="flex gap-2">
            {visibleOrgs.map((item, index) => (
              <div key={item?.org_id} className="flex h-fit flex-wrap">
                <Link
                  href={`//${item?.org_domain}`}
                  target="_blank"
                  className="flex h-fit items-center justify-center p-0 text-forground hover:no-underline"
                >
                  <span className="mcaption-semibold12 lg:mcaption-semibold16 line-clamp-1 flex-1 text-center">
                    {item?.org_name}
                  </span>
                </Link>
                {validOrgs?.length > 0 && index < validOrgs.length - 1 && validOrgs?.length > 1 && (
                  <span className="mcaption-semibold12 lg:mcaption-semibold16 mt-auto h-fit text-center">,</span>
                )}
              </div>
            ))}

            {hasMore && <span>...</span>}
          </div>
        </div>
      )}
    </div>
  );
}
