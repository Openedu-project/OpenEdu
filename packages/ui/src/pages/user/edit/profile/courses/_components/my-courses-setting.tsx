'use client';

import type { ICourseMyProfile, IMyCourseSetting } from '@oe/api';
import { useGetMeSettings, useUpdateMeSettings } from '@oe/api';
import { useCallback, useEffect, useState } from 'react';

import type { HTTPErrorMetadata } from '@oe/api';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Spinner } from '#components/spinner';
import { useShowProfileItemsStore } from '../../../../_store/userProfileStore';
import { SettingWrapper } from '../../_component/setting-wrapper';

export function MyCourseSettings() {
  const t = useTranslations('userProfile.profileCourse');
  const tError = useTranslations('errors');

  const [isShow, setIsShow] = useState<boolean>();

  const { setInitialData, showItemList } = useShowProfileItemsStore();

  const { dataMeSettings, isLoadingMeSettings, mutateMeSettings } = useGetMeSettings<ICourseMyProfile>({
    page: 1,
    per_page: 999,
    type: 'courses',
  });

  const { triggerMeSettings } = useUpdateMeSettings<IMyCourseSetting>();

  const onSaveChanges = useCallback(async () => {
    const course_ids = showItemList.map(item => item.cuid) as string[];

    try {
      await triggerMeSettings({
        type: 'courses',
        enable: isShow ?? false,
        value: { course_ids },
      });
      toast.success(t('updateSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [isShow, showItemList, t, tError, triggerMeSettings]);

  useEffect(() => {
    if (dataMeSettings?.settings) {
      setInitialData(dataMeSettings.settings);
    }

    setIsShow(dataMeSettings?.enable);
  }, [dataMeSettings, setInitialData]);

  return (
    <>
      {isLoadingMeSettings ? (
        <div className="flex items-center justify-center bg-white">
          <Spinner size="md" />
        </div>
      ) : (
        dataMeSettings && (
          <SettingWrapper
            isShow={dataMeSettings.enable}
            data={dataMeSettings?.settings}
            settingsType="courses"
            onSaveChanges={onSaveChanges}
            onShowContent={value => setIsShow(value)}
            mutateData={() => mutateMeSettings().catch(error => console.error(error))}
          />
        )
      )}
    </>
  );
}
