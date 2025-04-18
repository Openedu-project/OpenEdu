'use client';
import { type HTTPErrorMetadata, type INewPoints, usePostClaimNewPoint } from '@oe/api';
import { IconOpeneduBalance } from '@oe/assets';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '#shadcn/button';
import { InviteReferralInviteSuccessModal } from './invite-referral-invite-success-modal';

export function InviteReferralClaimButton({
  data,
}: {
  data: INewPoints | undefined;
}) {
  const t = useTranslations('referralProgram.availableReward');
  const tError = useTranslations('errors');
  const router = useRouter();
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);

  const { triggerPostClaimNewPoint, isLoadingPostClaimNewPoint } = usePostClaimNewPoint();

  const totalClaim = useMemo(() => {
    return (
      Number(data?.referral?.amount ?? 0) +
      Number(data?.milestone?.amount ?? 0) +
      Number(data?.featured?.amount ?? 0) +
      Number(data?.timebase?.amount ?? 0) +
      Number(data?.weekly_streak?.amount ?? 0) +
      Number(data?.monthly_streak?.amount ?? 0) +
      Number(data?.referee?.amount ?? 0)
    );
  }, [
    data?.referral?.amount,
    data?.milestone?.amount,
    data?.featured?.amount,
    data?.timebase?.amount,
    data?.weekly_streak?.amount,
    data?.monthly_streak?.amount,
    data?.referee?.amount,
  ]);

  const handleOpenModal = useCallback(() => {
    setIsOpenSuccessModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenSuccessModal(false);
  }, []);

  const handleClaim = useCallback(async () => {
    try {
      await triggerPostClaimNewPoint({
        sources: [],
      });
      router.refresh();
      handleOpenModal();
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [triggerPostClaimNewPoint, router, tError, handleOpenModal]);

  return (
    <>
      <Button
        className="rounded-[24px]"
        disabled={totalClaim <= 0}
        onClick={handleClaim}
        loading={isLoadingPostClaimNewPoint}
      >
        {t('claimButton', { points: totalClaim })}
        <IconOpeneduBalance className="ml-4 h-7 w-7" />
      </Button>
      {isOpenSuccessModal && (
        <InviteReferralInviteSuccessModal open={true} point={totalClaim} onClose={handleCloseModal} />
      )}
    </>
  );
}
