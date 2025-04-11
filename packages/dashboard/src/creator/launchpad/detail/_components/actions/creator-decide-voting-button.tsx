'use client';
import { API_ENDPOINT } from '@oe/api';
import type { HTTPErrorMetadata } from '@oe/api';
import { usePutAdminDecideVotingLaunchpad } from '@oe/api';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { revalidateAdminLaunchpadDetail } from '../../_action';
import { CreatorDecideVotingLaunchpadModal } from '../modals/creator-decide-voting-modal';

interface CreatorDecideVotingLaunchpadButtonProps {
  id: string;
}

export function CreatorDecideVotingLaunchpadButton({ id }: CreatorDecideVotingLaunchpadButtonProps) {
  const t = useTranslations('creatorLaunchpad');
  const tError = useTranslations('errors');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutate: globalMutate } = useSWRConfig();
  const { triggerPostAdminDecideVotingLaunchpad, isLoadingPostAdminDecideVotingLaunchpad } =
    usePutAdminDecideVotingLaunchpad(id);

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

  const handleDecideVotingTime = useCallback(
    async (isContinued: boolean) => {
      try {
        await triggerPostAdminDecideVotingLaunchpad({
          is_continued: isContinued,
        });
        handleActionSuccess(API_ENDPOINT.LAUNCHPADS);
        await revalidateAdminLaunchpadDetail();
        toast.success(t('updateDecideVotingSuccess'));
      } catch (error) {
        console.error('Error Set Decide Voting Launchpad', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleActionSuccess, t, tError, triggerPostAdminDecideVotingLaunchpad]
  );

  return (
    <div className="flex flex-col gap-4">
      <Button variant="default" className="w-full" onClick={handleOpenModal}>
        {t('startFunding')}
      </Button>
      <Button variant="destructive" className="w-full" onClick={() => handleDecideVotingTime(false)}>
        {t('deleteLaunchpad')}
      </Button>
      {isOpenModal && (
        <CreatorDecideVotingLaunchpadModal
          isLoading={isLoadingPostAdminDecideVotingLaunchpad}
          onClose={handleCloseModal}
          onSubmit={() => handleDecideVotingTime(true)}
        />
      )}
    </div>
  );
}
