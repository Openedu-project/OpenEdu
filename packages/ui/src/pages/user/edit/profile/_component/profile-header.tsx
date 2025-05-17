'use client';
import type { IUserProfileRole } from '@oe/api';
import { useGetUserProfile } from '@oe/api';
import { DocumentAttach, Pencil, PersonCircle, School } from '@oe/assets';
import { PLATFORM_ROUTES, buildUrl } from '@oe/core';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Navigation } from '#components/navigation';
import { EditProfileHeader } from '../../_components/edit-profile-header';

export function ProfileHeader() {
  const tProfile = useTranslations('userProfile.profile');

  const { user } = useParams();

  const [roles, setMyRoles] = useState<IUserProfileRole[]>([]);

  const { dataUserProfile } = useGetUserProfile(user as string);

  const navItems = useMemo(() => {
    const items = [
      {
        title: tProfile('profileNavigations.information'),
        href: buildUrl({
          endpoint: PLATFORM_ROUTES.editProfileInformation,
          params: { username: user as string },
        }),
        icon: <PersonCircle />,
      },
      {
        title: tProfile('profileNavigations.certificates'),
        href: buildUrl({
          endpoint: PLATFORM_ROUTES.editProfileCertificates,
          params: { username: user as string },
        }),
        icon: <School height={36} width={36} />,
      },
      {
        title: tProfile('profileNavigations.blogs'),
        href: buildUrl({
          endpoint: PLATFORM_ROUTES.editProfileBlogs,
          params: { username: user as string },
        }),
        icon: <Pencil />,
      },
    ];

    if (roles.some(item => item.role_id === 'partner')) {
      items.splice(2, 0, {
        title: tProfile('profileNavigations.courses'),
        href: buildUrl({
          endpoint: PLATFORM_ROUTES.editProfileCourses,
          params: { username: user as string },
        }),
        icon: <DocumentAttach />,
      });
    }

    return items;
  }, [roles, tProfile, user]);

  useEffect(() => {
    if (dataUserProfile) {
      setMyRoles(dataUserProfile?.roles);
    }
  }, [dataUserProfile]);

  return (
    <>
      <EditProfileHeader />

      <Navigation
        size="large"
        data={navItems}
        className="p-3"
        classNameScrollArea="border rounded-[12px] mb-6 mx-2 xl:mx-0"
      />
    </>
  );
}
