'use client';

import { type IEditProfileFormSchemaType, editProfileFormSchema } from '@oe/api/schemas/profileSchema';
import type { IMyProfilePayload, IUserProfile, TProfilePlatform } from '@oe/api/types/user-profile';
import SecurityUser from '@oe/assets/icons/security-user';
import User from '@oe/assets/icons/user';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { FormWrapper } from '#components/form-wrapper';
import { SocialIcon, type SocialType, getSocialType } from '#components/social-icon';
import { Button } from '#shadcn/button';

interface IUserFormInfo {
  onSubmit: (value: IMyProfilePayload) => void;
  data: IUserProfile;
}

const convertData = (urls: string[]): Record<TProfilePlatform, string | undefined> =>
  urls?.reduce(
    (acc: Record<SocialType, string | undefined>, url) => {
      if (url) {
        const platform = getSocialType(url);
        acc[platform] = url;
      }
      return acc;
    },
    {} as Record<SocialType, string | undefined>
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

                return (
                  <FormFieldWithLabel
                    key={`social-link-${index}`}
                    name={`props.${index}`}
                    label={
                      <SocialIcon iconClassName="h-5 w-5" url={currentLink} iconColor="#2C2C2C" showText={false} />
                    }
                    className="mb-3 flex w-[95%] items-center gap-3"
                  >
                    <Input placeholder={t('socialLinkPlaceholder')} />
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
