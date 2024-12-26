'use client';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { resendEmailService } from '@oe/api/services/auth';
import type { HTTPError } from '@oe/api/utils/http-error';

export type ResendButtonProps = {
  email?: string;
  event: 'REGISTER' | 'RESET_PASSWORD' | 'EXTERNAL_REGISTER';
  onError?: (error: HTTPError) => void;
};

const COUNT_DOWN = 59;

export const ResendButton = ({ email, event, onError }: ResendButtonProps) => {
  const t = useTranslations('auth.resendEmailButton');
  const [seconds, setSeconds] = useState(COUNT_DOWN);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleResendEmail = async () => {
    if (email) {
      try {
        await resendEmailService(null, { payload: { email, event } });
        setSeconds(COUNT_DOWN);
      } catch (error) {
        onError?.(error as HTTPError);
      }
    }
  };

  return (
    <Button disabled={seconds > 0} onClick={handleResendEmail}>
      {seconds > 0 ? `${t('resendTimeRemaining')} 00:${seconds.toString().padStart(2, '0')}` : t('resendEmail')}
    </Button>
  );
};
