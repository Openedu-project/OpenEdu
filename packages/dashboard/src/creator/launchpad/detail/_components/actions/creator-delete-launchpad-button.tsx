'use client';

import { usePostAdminCancelLaunchpads } from '@oe/api/hooks/useAdminLaunchpad';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { revalidateAdminLaunchpadDetail } from '../../_action';
import CreatorDeleteLaunchpadModal from '../modals/creator-delete-launchpad-modal';

interface CreatorDeleteLaunchpadButtonProps {
  id: string;
}

export function CreatorDeleteLaunchpadButton({ id }: CreatorDeleteLaunchpadButtonProps) {
  const t = useTranslations('creatorLaunchpad');
  const tError = useTranslations('errors');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutate: globalMutate } = useSWRConfig();
  const { triggerPostAdminCancelLaunchpads, isLoadingPostAdminCancelLaunchpads } = usePostAdminCancelLaunchpads(id);

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

  const handleCancelLaunchpads = useCallback(async () => {
    try {
      await triggerPostAdminCancelLaunchpads();
      handleActionSuccess(API_ENDPOINT.LAUNCHPADS);
      await revalidateAdminLaunchpadDetail();
      toast.success(t('cancelLaunchpadSuccess'));
    } catch (error) {
      console.error('Error Cancel Launchpad', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [handleActionSuccess, t, tError, triggerPostAdminCancelLaunchpads]);

  return (
    <>
      <Button variant="destructive" className="w-full" onClick={handleOpenModal}>
        {t('deleteLaunchpad')}
      </Button>
      {isOpenModal && (
        <CreatorDeleteLaunchpadModal
          isLoading={isLoadingPostAdminCancelLaunchpads}
          onClose={handleCloseModal}
          onSubmit={handleCancelLaunchpads}
        />
      )}
    </>
  );
}
