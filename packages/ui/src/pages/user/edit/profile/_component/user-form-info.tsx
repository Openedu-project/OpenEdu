'use client';

import { type IEditProfileFormSchemaType, editProfileFormSchema } from '@oe/api/schemas/profileSchema';
import type { IMyProfilePayload, IUserProfile, TProfilePlatform } from '@oe/api/types/user-profile';
import LinkIcon from '@oe/assets/icons/link';
import Mail from '@oe/assets/icons/mail';
import SecurityUser from '@oe/assets/icons/security-user';
import Facebook from '@oe/assets/icons/social-icon/facebook';
import Github from '@oe/assets/icons/social-icon/github';
import Linkedin from '@oe/assets/icons/social-icon/linkedin';
import Telegram from '@oe/assets/icons/social-icon/telegram';
import Twitter from '@oe/assets/icons/social-icon/twitter';
import User from '@oe/assets/icons/user';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { type JSX, useCallback } from 'react';
import { FormWrapper } from '#components/form-wrapper';
import { Button } from '#shadcn/button';

interface IUserFormInfo {
  onSubmit: (value: IMyProfilePayload) => void;
  data: IUserProfile;
}

type PlatformIcons = {
  [key: string]: JSX.Element;
};

export const platformIcons: PlatformIcons = {
  facebook: <Facebook width={20} height={20} color="#2C2C2C" />,
  github: <Github color="#2C2C2C" />,
  linkedin: <Linkedin width={20} height={20} />,
  telegram: <Telegram />,
  twitter: <Twitter />,
  gmail: <Mail color="#2C2C2C" />,
  website: <LinkIcon />,
};

const detectSocialPlatformDetails = (url: string): { platform: TProfilePlatform; icon: JSX.Element } => {
  const platform = url.includes('facebook.com')
    ? 'facebook'
    : url.includes('github.com')
      ? 'github'
      : url.includes('linkedin.com')
        ? 'linkedin'
        : url.includes('telegram.me') || url.includes('t.me')
          ? 'telegram'
          : url.includes('twitter.com') || url.includes('x.com')
            ? 'twitter'
            : url.includes('gmail.com')
              ? 'gmail'
              : 'website'; // fallback

  return {
    platform,
    icon: platformIcons[platform] || <LinkIcon />,
  };
};

const convertData = (urls: string[]): Record<TProfilePlatform, string | undefined> =>
  urls?.reduce(
    (acc: Record<TProfilePlatform, string | undefined>, url) => {
      if (url) {
        const { platform } = detectSocialPlatformDetails(url);
        acc[platform] = url;
      }
      return acc;
    },
    {} as Record<TProfilePlatform, string | undefined>
  );

export default function UserFormInfo({ onSubmit, data }: IUserFormInfo) {
  const t = useTranslations('userProfile.profileForm');
  const tProfileForm = useTranslations('userProfile.profileForm');

  const handleFormSubmit = useCallback(
    async (value: IEditProfileFormSchemaType) => {
      const props = convertData(value.props as string[]);
      const submissionValue = {
        ...value,
        props,
      };

      await onSubmit(submissionValue as IMyProfilePayload);
    },
    [onSubmit]
  );

  return (
    <FormWrapper
      id="form_edit_profile_info"
      className="w-full [&>div]:mb-6"
      schema={editProfileFormSchema}
      useFormProps={{
        defaultValues: {
          display_name: data?.display_name || '',
          headline: data?.headline || '',
          about: data?.about || '',
          props: Object.values(data?.props || {}).filter(value => value !== '') || [],
        },
      }}
      onSubmit={handleFormSubmit}
    >
      {({ watch, loading }) => {
        const links = watch('props');

        return (
          <>
            <FormFieldWithLabel label={t('name')} name="display_name">
              <Input placeholder={t('namePlaceholder')} prefixIcon={<User />} />
            </FormFieldWithLabel>

            <FormFieldWithLabel label={t('headline')} name="headline">
              <Input placeholder={t('headlinePlaceholder')} prefixIcon={<SecurityUser />} />
            </FormFieldWithLabel>

            <div>
              <h4 className="mbutton-semibold16 mb-3">{t('socialNetworks')}</h4>
              {Array.from({ length: 4 }).map((_, index) => {
                const currentLink = links?.[index] || '';
                const currentIcon =
                  currentLink.trim() !== '' ? detectSocialPlatformDetails(currentLink).icon : <LinkIcon />;

                return (
                  <FormFieldWithLabel
                    key={Math.random()}
                    name={`props.${index}`}
                    label=""
                    className="mb-3 flex w-[95%] items-center gap-3"
                  >
                    <div className="flex w-full items-center gap-3">
                      <span className="h-5 w-5">{currentIcon}</span>
                      <Input placeholder={t('socialLinkPlaceholder')} />
                    </div>
                  </FormFieldWithLabel>
                );
              })}
            </div>

            <FormFieldWithLabel label={t('about')} name="about">
              <Textarea placeholder={t('aboutPlaceholder')} />
            </FormFieldWithLabel>

            <div className="flex w-full justify-end gap-3">
              <Button type="submit" variant="default" loading={loading}>
                {tProfileForm('saveChanges')}
              </Button>
            </div>
          </>
        );
      }}
    </FormWrapper>
  );
}
