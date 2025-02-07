'use client';
import { useGetMe } from '@oe/api/hooks/useMe';
import { useFollowUser, useGetUserProfile, useUnfollowUser } from '@oe/api/hooks/useUserProfile';
import type { IUserProfile } from '@oe/api/types/user-profile';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { createAPIUrl } from '@oe/api/utils/fetch';
import { BLOG_ROUTES } from '@oe/core/utils/routes';
import { CertificateCard } from '#components/certificate';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { NoDataAvailable } from '#components/no-data-available';
import { Spinner } from '#components/spinner';
import { useUserRoleStore } from '../_store/userProfileStore';
import AboutMe from './about-me';
import BlogCardProfile from './blog-profile';
import CourseProfile from './course-profile';
import UserBio from './user-bio';
import Section from './user-section';

export default function UserProfileContent() {
  const tProfile = useTranslations('userProfile.profile');

  const { user } = useParams();
  const [userProfile, setUserProfile] = useState<IUserProfile>();

  const { setRoles } = useUserRoleStore();

  const { dataMe: me } = useGetMe();
  const { dataUserProfile, isLoadingUserProfile, mutateUserProfile } = useGetUserProfile(user as string);

  const { triggerFollow } = useFollowUser(dataUserProfile?.id ?? '');
  const { triggerUnfollow } = useUnfollowUser(dataUserProfile?.id ?? '');

  const { setLoginRequiredModal } = useLoginRequiredStore();

  const handleFollowUser = useCallback(async () => {
    if (!me) {
      setLoginRequiredModal(true);
      return;
    }

    if (dataUserProfile?.status === 'followed') {
      try {
        await triggerUnfollow();

        await mutateUserProfile();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await triggerFollow(null);

        await mutateUserProfile();
      } catch (error) {
        console.error(error);
      }
    }
  }, [dataUserProfile?.status, me, mutateUserProfile, triggerFollow, triggerUnfollow, setLoginRequiredModal]);

  useEffect(() => {
    if (dataUserProfile) {
      setUserProfile(dataUserProfile);

      setRoles(dataUserProfile?.roles);
    }
  }, [dataUserProfile, setRoles]);

  const sections = useMemo(() => {
    return [
      {
        title: 'about',
        content: userProfile && <AboutMe data={userProfile} />,
        // content: !!userProfile?.about?.length && <p className="text-justify">{userProfile.about}</p>,
      },
      {
        isShow: userProfile?.certificate.is_show,
        title: `${tProfile('certificates')} (${userProfile?.certificate.count ?? 0})`,
        content: (
          <>
            {userProfile?.certificate?.results?.map(item => (
              <CertificateCard key={item.id} certificate={item} username={user as string} />
            ))}
          </>
        ),
        url: '',
        // viewAll: true,
      },
      {
        isShow: userProfile?.course.is_show,
        title: `${tProfile('courses')} (${userProfile?.course.count ?? 0})`,
        content: (
          <>
            {userProfile?.course?.results?.map(item => (
              <CourseProfile key={item.id} courseData={item} />
            ))}
          </>
        ),
        url: '',
        // viewAll: true,
      },
      {
        isShow: userProfile?.blog.is_show,
        title: `${tProfile('blogs')} (${userProfile?.blog.count ?? 0})`,
        content: (
          <>
            {userProfile?.blog?.results?.map(item => (
              <BlogCardProfile key={item.id} blog={item} />
            ))}
          </>
        ),
        url: createAPIUrl({
          endpoint: BLOG_ROUTES.authorBlog,
          params: { username: userProfile?.username },
        }),
        viewAll: true,
      },
    ];
  }, [userProfile, user, tProfile]);

  return (
    <>
      {isLoadingUserProfile ? (
        <div className="container flex h-[calc(100vh-var(--header-height))] items-center justify-center bg-white">
          <Spinner size="md" />
        </div>
      ) : (
        <>
          {dataUserProfile ? (
            <div className="mb-32">
              <UserBio
                data={dataUserProfile}
                isMe={me?.id === dataUserProfile?.id}
                handleFollowUser={handleFollowUser}
              />

              {sections.map(section => (
                <Section
                  key={section.title}
                  className="mb-12 px-6 last:mb-0"
                  title={section.title}
                  content={section.content}
                  viewAll={section.viewAll}
                  url={section.url}
                  isShow={section.isShow}
                />
              ))}
            </div>
          ) : (
            <div className="h-[calc(100vh-var(--header-height))] bg-white">
              <NoDataAvailable message={tProfile('userNotFound')} />
            </div>
          )}
        </>
      )}
    </>
  );
}
