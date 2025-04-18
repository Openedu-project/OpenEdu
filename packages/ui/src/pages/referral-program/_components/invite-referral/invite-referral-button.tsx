'use client';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Button } from '#shadcn/button';
import { InviteReferralModal } from './invite-referral-modal';

export function InviteReferralButton({ refCode }: { refCode: string }) {
  const t = useTranslations('referralProgram.invite');

  const [isOpenInviteModal, setOpenInviteModal] = useState<boolean>(false);

  const handleOpenInviteModal = useCallback(() => {
    setOpenInviteModal(true);
  }, []);

  const handleCloseInviteModal = useCallback(() => {
    setOpenInviteModal(false);
  }, []);

  return (
    <div>
      <Button className="mbutton-semibold16 rounded-[40px] bg-gradient-1 text-primary" onClick={handleOpenInviteModal}>
        {t('inviteFriendsButton')}
      </Button>

      {isOpenInviteModal && (
        <InviteReferralModal open={isOpenInviteModal} refCode={refCode} onClose={handleCloseInviteModal} />
      )}
    </div>
  );
}
