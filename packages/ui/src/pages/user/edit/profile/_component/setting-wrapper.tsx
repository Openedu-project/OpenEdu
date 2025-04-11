'use client';

// import { useGetUserProfile } from '@oe/api';
import type { IBlogMyProfile, ICertificateMyProfile, ICourseMyProfile, TSettingsType } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '#shadcn/button';
import { Switch } from '#shadcn/switch';

import type { HTTPErrorMetadata } from '@oe/api';
import { useGetUserProfile } from '@oe/api';
import image from '@oe/assets/images/whale-no-data.png';
import { toast } from 'sonner';
import { CertificateCard } from '#components/certificate';
import { Image } from '#components/image';
import { BlogCardProfile } from '../../../_components/blog-profile';
import { CourseProfile } from '../../../_components/course-profile';
import { useShowProfileItemsStore } from '../../../_store/userProfileStore';

interface SettingProps<T> {
  data?: T[];
  isShow: boolean;
  settingsType?: TSettingsType;
  totalItems?: number;
  page?: number;
  onSaveChanges?: () => void;
  onSetPage?: (page: number) => void;
  onShowContent?: (value: boolean) => void;
  mutateData?: () => void;
}

export function SettingWrapper<T>({
  isShow,
  settingsType,
  data,
  onSaveChanges,
  onShowContent,
  mutateData,
}: SettingProps<T>) {
  const tProfile = useTranslations('userProfile.profile');
  const tError = useTranslations('errors');

  const { user } = useParams();

  const [show, setShow] = useState<boolean>(isShow);

  const { initialData, setInitialData } = useShowProfileItemsStore();

  const { mutateUserProfile } = useGetUserProfile(user as string);

  const renderData = (data: T[]) => {
    switch (settingsType) {
      case 'courses': {
        return (
          <>
            {(data as ICourseMyProfile[]).map(course => (
              <CourseProfile
                key={`course_${course?.id}`}
                courseData={course as unknown as ICourseMyProfile}
                isSetting
              />
            ))}
          </>
        );
      }
      case 'blogs': {
        return (
          <>
            {data.map(blog => (
              <BlogCardProfile key={`course_${blog}`} blog={blog as IBlogMyProfile} isSetting />
            ))}
          </>
        );
      }
      case 'certificates': {
        return (
          <>
            {data?.map(certificate => (
              <CertificateCard
                key={`cert_${certificate}`}
                certificate={certificate as ICertificateMyProfile}
                isSetting
                username={user as string}
              />
            ))}
          </>
        );
      }
      default: {
        return <></>;
      }
    }
  };

  const handleShowContent = (value: boolean) => {
    onShowContent?.(value);
    setShow(value);
  };

  const handleSaveChanges = async () => {
    onSaveChanges?.();

    try {
      await mutateUserProfile();

      mutateData?.();
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  };

  return (
    <div className="mx-3 flex max-h-[calc(100vh-(var(--header-height)+24px))] flex-col rounded-[12px] border border-primary p-6 xl:mx-0">
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-6">
          <p className="mbutton-semibold16">
            {tProfile('showOnYourProfile')}&nbsp;
            <span className="mcaption-regular12">({tProfile('maximumContents')})</span>
          </p>
          <Switch checked={show} onCheckedChange={value => handleShowContent(value)} />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setInitialData(initialData);
            }}
          >
            {tProfile('cancel')}
          </Button>
          <Button variant="default" onClick={handleSaveChanges}>
            {tProfile('saveChanges')}
          </Button>
        </div>
      </div>

      {data && data?.length > 0 ? (
        <div className="mt-6 grid flex-1 grid-cols-1 justify-items-center gap-6 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
          {renderData(data)}
        </div>
      ) : (
        <div className="mt-6 flex h-full flex-col items-center justify-center">
          <div className="w-[280px]">
            <Image src={image.src} alt="" height={280} width={280} className="mb-6" />
          </div>
          <p className="giant-iheading-semibold32 text-center text-[#838383]">{tProfile('noData')}</p>
        </div>
      )}
    </div>
  );
}
