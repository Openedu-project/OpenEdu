'use client';

import { useGetMeSettings, useUpdateMeSettings } from '@oe/api/hooks/useUserProfile';
import type { IBlogMyProfile, IMyBlogSetting } from '@oe/api/types/user-profile';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { Spinner } from '#components/spinner';
import { useShowProfileItemsStore } from '../../../../_store/userProfileStore';
import SettingWrapper from '../../_component/setting-wrapper';

export default function MyBlogSettings() {
  const [isShow, setIsShow] = useState<boolean>();

  const { setInitialData, showItemList } = useShowProfileItemsStore();

  const { dataMeSettings, isLoadingMeSettings, mutateMeSettings } = useGetMeSettings<IBlogMyProfile>({
    page: 1,
    per_page: 999,
    type: 'blogs',
  });

  const { triggerMeSettings } = useUpdateMeSettings<IMyBlogSetting>();

  const onSaveChanges = async () => {
    const blog_ids = showItemList.map(item => item.cuid) as string[];

    try {
      await triggerMeSettings({
        type: 'blogs',
        enable: isShow ?? false,
        value: { blog_ids },
      });
      toast.success('Your update settings have been updated');
    } catch (error) {
      console.error(error);
    }
  };

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
            settingsType="blogs"
            onSaveChanges={onSaveChanges}
            onShowContent={value => setIsShow(value)}
            mutateData={() => mutateMeSettings().catch(error => console.error(error))}
          />
        )
      )}
    </>
  );
}
