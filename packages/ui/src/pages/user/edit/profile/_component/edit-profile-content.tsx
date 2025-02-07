'use client';

import { useGetUserProfile, useUpdateMyProfile } from '@oe/api/hooks/useUserProfile';
import type { IMyProfilePayload, IUserProfile } from '@oe/api/types/user-profile';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { toast } from 'sonner';
import Section from '../../../_components/user-section';
import { revalidateProfile } from './_action';
import EditAvatar from './edit-avatar';
import UserFormInfo from './user-form-info';

export default function EditProfileContent() {
  const tProfileForm = useTranslations('userProfile.profileForm');
  const tError = useTranslations('errors');

  const { user } = useParams();

  const { dataUserProfile, mutateUserProfile } = useGetUserProfile(user as string);

  const { triggerMyProfile } = useUpdateMyProfile();
  const [avatar, setAvatar] = useState<string>(dataUserProfile?.avatar ?? '');

  useEffect(() => {
    if (dataUserProfile) {
      setAvatar(dataUserProfile?.avatar ?? '');
    }
  }, [dataUserProfile]);

  const handleSubmitForm = useCallback(
    async (value: IMyProfilePayload) => {
      try {
        await triggerMyProfile({
          about: value.about,
          display_name: value.display_name,
          headline: value.headline,
          props: value.props,
          avatar,
        });

        await revalidateProfile();
        await mutateUserProfile();
        toast.success(tProfileForm('updateSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [avatar, mutateUserProfile, tError, tProfileForm, triggerMyProfile]
  );

  const editSections = [
    {
      title: tProfileForm('yourPhoto'),
      content: <EditAvatar onSetAvaUrl={url => setAvatar(url)} avatar={dataUserProfile?.avatar ?? ''} />,
    },
    {
      title: tProfileForm('yourInformation'),
      content: (
        <UserFormInfo
          onSubmit={(value: IMyProfilePayload) => handleSubmitForm(value)}
          data={dataUserProfile as IUserProfile}
        />
      ),
    },
  ];

  return (
    <div className="mx-3 max-w-full rounded-[12px] border border-primary p-6 xl:mx-0 xl:max-w-none">
      {editSections.map(section => (
        <Section
          key={`edit-section-${section.title}`}
          title={section.title}
          content={section.content}
          className="my-6 last:mb-0"
        />
      ))}
    </div>
  );
}
