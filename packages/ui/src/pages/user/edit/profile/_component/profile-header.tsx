'use client';

import { useGetUserProfile } from '@oe/api/hooks/useUserProfile';
import type { IUserRole } from '@oe/api/types/user-profile';
import { createAPIUrl } from '@oe/api/utils/fetch';
import DocumentAttach from '@oe/assets/icons/document-attach';
import Pencil from '@oe/assets/icons/pencil';
import PersonCircle from '@oe/assets/icons/person-circle';
import School from '@oe/assets/icons/school';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Navigation } from '#components/navigation';
import EditProfileHeader from '../../_components/edit-profile-header';

export default function ProfileHeader() {
  const tProfile = useTranslations('userProfile.profile');

  const { user } = useParams();

  const [roles, setMyRoles] = useState<IUserRole[]>([]);

  const { dataUserProfile } = useGetUserProfile(user as string);

  const navItems = useMemo(() => {
    const items = [
      {
        title: tProfile('profileNavigations.information'),
        href: createAPIUrl({
          endpoint: PLATFORM_ROUTES.editProfileInformation,
          params: { username: user as string },
        }),
        icon: <PersonCircle />,
      },
      {
        title: tProfile('profileNavigations.certificates'),
        href: createAPIUrl({
          endpoint: PLATFORM_ROUTES.editProfileCertificates,
          params: { username: user as string },
        }),
        icon: <School height={36} width={36} />,
      },
      {
        title: tProfile('profileNavigations.blogs'),
        href: createAPIUrl({
          endpoint: PLATFORM_ROUTES.editProfileBlogs,
          params: { username: user as string },
        }),
        icon: <Pencil />,
      },
    ];

    if (roles.some(item => item.role_id === 'partner')) {
      items.splice(2, 0, {
        title: tProfile('profileNavigations.courses'),
        href: createAPIUrl({
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
