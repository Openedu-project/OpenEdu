'use client';
import { API_ENDPOINT } from '@oe/api';
import type { HTTPErrorMetadata } from '@oe/api';
import { usePostAdminStartVotingLaunchpads } from '@oe/api';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { revalidateAdminLaunchpadDetail } from '../../_action';
import { CreatorStartVotingLaunchpadModal } from '../modals/creator-start-voting-modal';

interface CreatorStartVotingLaunchpadButtonProps {
  id: string;
  milestoneId: string;
  phase: number;
}

export function CreatorStartVotingLaunchpadButton({ id, milestoneId, phase }: CreatorStartVotingLaunchpadButtonProps) {
  const t = useTranslations('creatorLaunchpad');
  const tError = useTranslations('errors');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutate: globalMutate } = useSWRConfig();
  const { triggerPostAdminStartVotingLaunchpads, isLoadingPostAdminStartVotingLaunchpads } =
    usePostAdminStartVotingLaunchpads(id, milestoneId);

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

  const handleStartVotingTime = useCallback(async () => {
    try {
      await triggerPostAdminStartVotingLaunchpads();
      handleActionSuccess(API_ENDPOINT.LAUNCHPADS);
      await revalidateAdminLaunchpadDetail();
      toast.success(t('updateStartVotingSuccess'));
    } catch (error) {
      console.error('Error Set Start Voting Launchpad', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [handleActionSuccess, t, tError, triggerPostAdminStartVotingLaunchpads]);

  return (
    <div className="flex flex-col gap-4">
      <Button variant="default" className="w-full" onClick={handleOpenModal}>
        {t.rich('startVoting', {
          number: phase,
        })}
      </Button>

      {isOpenModal && (
        <CreatorStartVotingLaunchpadModal
          isLoading={isLoadingPostAdminStartVotingLaunchpads}
          onClose={handleCloseModal}
          onSubmit={handleStartVotingTime}
        />
      )}
    </div>
  );
}
