'use client';

import { useGetMeSettings, useUpdateMeSettings } from '@oe/api/hooks/useUserProfile';
import type { ICertificateMyProfile, IMyCertificateSetting } from '@oe/api/types/user-profile';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { Spinner } from '#components/spinner';
import { useShowProfileItemsStore } from '../../../../_store/userProfileStore';
import SettingWrapper from '../../_component/setting-wrapper';

export default function MyCertificateSettings() {
  const [isShow, setIsShow] = useState<boolean>();

  const { setInitialData, showItemList } = useShowProfileItemsStore();

  const { dataMeSettings, isLoadingMeSettings, mutateMeSettings } = useGetMeSettings<ICertificateMyProfile>({
    page: 1,
    per_page: 99,
    type: 'certificates',
  });

  const { triggerMeSettings } = useUpdateMeSettings<IMyCertificateSetting>();

  const onSaveChanges = async () => {
    const certificate_ids = showItemList.map(item => item.id);

    try {
      await triggerMeSettings({
        type: 'certificates',
        enable: isShow ?? false,
        value: { certificate_ids },
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
  }, [dataMeSettings?.settings, dataMeSettings?.enable, setInitialData]);

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
            settingsType="certificates"
            onSaveChanges={onSaveChanges}
            onShowContent={value => setIsShow(value)}
            mutateData={() => mutateMeSettings().catch(error => console.error(error))}
          />
        )
      )}
    </>
  );
}
