'use client';

import { API_ENDPOINT } from '@oe/api';
import type { HTTPErrorMetadata } from '@oe/api';
import { useApprove, useReject } from '@oe/api';
import type { IApprovalPayload, IRejectPayload } from '@oe/api';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { ApproveLaunchpadModal } from '../../_components/approve-launchpad-modal';
import { RejectLaunchpadModal } from '../../_components/reject-launchpad-modal';

interface LaunchpadDetailActionButtonProps {
  orderId: string;
}

export function LaunchpadDetailActionButton({ orderId }: LaunchpadDetailActionButtonProps) {
  const t = useTranslations('adminLaunchpadRequest');
  const tError = useTranslations('errors');
  const { mutate: globalMutate } = useSWRConfig();

  const [isOpenApproveModal, setIsOpenApproveModal] = useState<boolean>(false);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState<boolean>(false);

  const { triggerApprove, isLoadingApprove } = useApprove(orderId ?? '');
  const { triggerReject } = useReject(orderId ?? '');

  const handleOpenApproveModal = useCallback(() => {
    setIsOpenApproveModal(true);
  }, []);

  const handleCloseApproveModal = useCallback(() => {
    setIsOpenApproveModal(false);
  }, []);

  const handleOpenRejectModal = useCallback(() => {
    setIsOpenRejectModal(true);
  }, []);

  const handleCloseRejectModal = useCallback(() => {
    setIsOpenRejectModal(false);
  }, []);

  const handleActionSuccess = useCallback(() => {
    globalMutate((key: string) => !!key?.includes(API_ENDPOINT.APPROVALS), undefined, { revalidate: false });
  }, [globalMutate]);

  const handleApprove = useCallback(
    async (values: IApprovalPayload) => {
      try {
        await triggerApprove(values);

        handleActionSuccess();
        toast.success(t('approveSuccess'));
        handleCloseApproveModal();
      } catch (error) {
        console.error('Error Approve Launchpad', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleCloseApproveModal, handleActionSuccess, triggerApprove, t, tError]
  );

  const handleReject = useCallback(
    async (values: IRejectPayload) => {
      try {
        await triggerReject(values);
        handleActionSuccess();
        toast.success(t('rejectSuccess'));
        handleCloseRejectModal();
      } catch (error) {
        console.error('Error Reject Launchpad', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleCloseRejectModal, handleActionSuccess, triggerReject, t, tError]
  );

  return (
    <div className="flex gap-2">
      <Button variant="destructive" onClick={handleOpenRejectModal}>
        {t('reject')}
      </Button>
      <Button variant="default" onClick={handleOpenApproveModal}>
        {t('approve')}
      </Button>
      {isOpenApproveModal && (
        <ApproveLaunchpadModal
          isLoading={isLoadingApprove}
          onSubmit={handleApprove}
          onClose={handleCloseApproveModal}
        />
      )}

      {isOpenRejectModal && <RejectLaunchpadModal onSubmit={handleReject} onClose={handleCloseRejectModal} />}
    </div>
  );
}
