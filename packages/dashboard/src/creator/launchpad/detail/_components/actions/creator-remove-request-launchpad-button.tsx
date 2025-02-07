'use client';

import { usePutAdminCancelPublishLaunchpads } from '@oe/api/hooks/useAdminLaunchpad';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { revalidateAdminLaunchpadDetail } from '../../_action';
import CreatorRemoveRequestLaunchpadModal from '../modals/creator-remove-request-launchpad-modal';

interface CreatorRemoveRequestLaunchpadButtonProps {
  id: string;
}

export function CreatorRemoveRequestLaunchpadButton({ id }: CreatorRemoveRequestLaunchpadButtonProps) {
  const t = useTranslations('creatorLaunchpad');
  const tError = useTranslations('errors');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutate: globalMutate } = useSWRConfig();
  const { triggerPutAdminCancelPublishLaunchpads } = usePutAdminCancelPublishLaunchpads(id);

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

  const handleCancelPublishLaunchpads = useCallback(async () => {
    try {
      await triggerPutAdminCancelPublishLaunchpads();
      handleActionSuccess(API_ENDPOINT.LAUNCHPADS);
      await revalidateAdminLaunchpadDetail();
      toast.success(t('cancelPublishLaunchpadSuccess'));
    } catch (error) {
      console.error('Error Cancel Publish Launchpad', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [handleActionSuccess, t, tError, triggerPutAdminCancelPublishLaunchpads]);

  return (
    <>
      <Button variant="destructive" className="w-full" onClick={handleOpenModal}>
        {t('removeRequestForApproval')}
      </Button>
      {isOpenModal && (
        <CreatorRemoveRequestLaunchpadModal onClose={handleCloseModal} onSubmit={handleCancelPublishLaunchpads} />
      )}
    </>
  );
}
