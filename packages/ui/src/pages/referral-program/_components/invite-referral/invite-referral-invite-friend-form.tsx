'use client';
import { type HTTPErrorMetadata, usePostInviteReferrer } from '@oe/api';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';

export function InviteReferralProgramInviteForm() {
  const t = useTranslations('referralProgram.invite');
  const tInviteFriend = useTranslations('referralProgram.inviteFriend');
  const [email, setEmail] = useState<string>('');
  const tError = useTranslations('errors');

  const { triggerPostInviteReferrer } = usePostInviteReferrer();

  const handleSubmit = useCallback(async () => {
    if (!email.trim()) {
      toast.error(tInviteFriend('emailRequired'));
      return;
    }

    try {
      await triggerPostInviteReferrer({
        emails: [email],
        referral_type: 'ref-user',
      });
      setEmail('');
      toast.success(tInviteFriend('inviteSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [email, tError, tInviteFriend, triggerPostInviteReferrer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex gap-2">
      <Input
        placeholder={t('friendEmailPlaceholder')}
        className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSubmit}>{t('sendButton')}</Button>
    </div>
  );
}
