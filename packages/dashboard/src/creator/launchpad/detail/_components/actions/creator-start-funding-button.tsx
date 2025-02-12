'use client';

import { usePutAdminStartFundingTimeLaunchpad } from '@oe/api/hooks/useAdminLaunchpad';
import type { IStartFundingTimeLaunchpadPayload } from '@oe/api/types/admin-launchpad';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { revalidateAdminLaunchpadDetail } from '../../_action';
import CreatorStartFundingLaunchpadModal from '../modals/creator-start-funding-modal';

interface CreatorStartFundingLaunchpadButtonProps {
  id: string;
}

export function CreatorStartFundingLaunchpadButton({ id }: CreatorStartFundingLaunchpadButtonProps) {
  const t = useTranslations('creatorLaunchpad');
  const tError = useTranslations('errors');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutate: globalMutate } = useSWRConfig();
  const { triggerPutAdminStartFundingTimeLaunchpad, isLoadingPutAdminStartFundingTimeLaunchpad } =
    usePutAdminStartFundingTimeLaunchpad(id);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleActionSuccess = useCallback(
    (endpoint: string) => {
      globalMutate((key: string) => !!key?.includes(endpoint), undefined, {
        revalidate: false,
      });
    },
    [globalMutate]
  );

  const handleStartFundingTime = useCallback(
    async (value: IStartFundingTimeLaunchpadPayload) => {
      try {
        await triggerPutAdminStartFundingTimeLaunchpad(value);
        handleActionSuccess(API_ENDPOINT.LAUNCHPADS);
        await revalidateAdminLaunchpadDetail();
        toast.success(t('setStartFundingTimeSuccess'));
      } catch (error) {
        console.error('Error Set Start Funding Time Launchpad', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleActionSuccess, t, tError, triggerPutAdminStartFundingTimeLaunchpad]
  );

  return (
    <>
      <Button variant="default" className="w-full" onClick={handleOpenModal}>
        {t('startFunding')}
      </Button>
      {isOpenModal && (
        <CreatorStartFundingLaunchpadModal
          isLoading={isLoadingPutAdminStartFundingTimeLaunchpad}
          onClose={handleCloseModal}
          onSubmit={handleStartFundingTime}
        />
      )}
    </>
  );
}
