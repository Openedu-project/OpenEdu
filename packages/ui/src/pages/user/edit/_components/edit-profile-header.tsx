'use client';

import { useGetUserProfile, useUpdateMyProfile } from '@oe/api/hooks/useUserProfile';
import Camera from '@oe/assets/icons/camera';
import { Lock } from '@oe/assets/icons/lock';
import Notification from '@oe/assets/icons/notification';
import ProfileCircle from '@oe/assets/icons/profile-circle';
import Setting2 from '@oe/assets/icons/setting-2';
import User from '@oe/assets/icons/user';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import type { IFileResponse } from '@oe/api/types/file';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import background from '@oe/assets/images/user-background.png';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { toast } from 'sonner';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { Navigation } from '#components/navigation';
import { Uploader } from '#components/uploader';

export default function EditProfileHeader() {
  const tProfile = useTranslations('userProfile.profile');
  const tError = useTranslations('errors');

  const { user } = useParams();

  const [file] = useState<IFileResponse>();

  const { triggerMyProfile } = useUpdateMyProfile();
  const { mutateUserProfile, dataUserProfile } = useGetUserProfile(user as string);

  const navItems = [
    {
      title: tProfile('navigations.profile'),
      href: createAPIUrl({
        endpoint: PLATFORM_ROUTES.editProfileInformation,
        params: { username: user as string },
      }),
      icon: <User height={16} width={16} />,
    },
    {
      title: tProfile('navigations.account'),
      href: createAPIUrl({
        endpoint: PLATFORM_ROUTES.editProfileAccount,
        params: { username: user as string },
      }),
      icon: <ProfileCircle />,
    },
    {
      title: tProfile('navigations.password'),
      href: createAPIUrl({
        endpoint: PLATFORM_ROUTES.editProfilePassword,
        params: { username: user as string },
      }),
      icon: <Lock />,
    },
    {
      title: tProfile('navigations.notifications'),
      href: createAPIUrl({
        endpoint: PLATFORM_ROUTES.editProfileNotifications,
        params: { username: user as string },
      }),
      icon: <Notification />,
    },
    {
      title: tProfile('navigations.privacy'),
      href: createAPIUrl({
        endpoint: PLATFORM_ROUTES.editProfilePrivacy,
        params: { username: user as string },
      }),
      icon: <Setting2 />,
    },
  ];

  const coverphoto =
    dataUserProfile && dataUserProfile?.cover_photo?.length > 0 ? dataUserProfile?.cover_photo : background.src;

  const handleEditCoverPhoto = (file: IFileResponse) => {
    if (file) {
      const cover_photo = file?.url;

      triggerMyProfile({ cover_photo })
        .then(() => {
          toast.success('Update successfully');

          mutateUserProfile().catch(error => console.error(error));
        })
        .catch(error => {
          console.error(error);
          toast.error(tError((error as HTTPErrorMetadata).code.toString()));
        });
    }
  };

  return (
    <>
      <Uploader
        accept="image/*"
        value={file}
        onChange={file => handleEditCoverPhoto(file as IFileResponse)}
        contentClassName="p-0"
        isShowInformation={false}
      >
        <div className="relative">
          <div className="max-h-[316px]">
            <Image
              src={coverphoto}
              alt=""
              objectFit="cover"
              fill
              containerHeight={316}
              className="w-full object-cover"
            />
          </div>
          <Button
            variant="outline"
            size="default"
            className="absolute top-5 right-5"
            // onClick={handleEditCoverPhoto}
          >
            <Camera className="mr-2 text-black" color="#000" />
            {tProfile('editCoverPhoto')}
          </Button>
        </div>
      </Uploader>

      <div className="mb-6 flex w-full flex-col items-start justify-between xl:flex-row">
        <Navigation className="m-2 mb-0" data={navItems} />

        <Button variant="default" className="!mbutton-semibold16 mt-2 mr-6 ml-auto h-auto rounded-2 p-0">
          <Link
            href={createAPIUrl({
              endpoint: PLATFORM_ROUTES.userProfile,
              params: { username: user as string },
            })}
            className="!text-primary-foreground p-2"
          >
            {tProfile('backToUserProfile')}
          </Link>
        </Button>
      </div>
    </>
  );
}
