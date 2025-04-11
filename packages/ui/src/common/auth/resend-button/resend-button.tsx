'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '#shadcn/button';

import type { HTTPError } from '@oe/api';
import { resendEmailService } from '@oe/api';
import type { AuthEventName } from '@oe/api';
import { useSearchParams } from 'next/navigation';

export type ResendButtonProps = {
  email?: string;
  event: AuthEventName;
  onError?: (error: HTTPError) => void;
};

const COUNT_DOWN = 59;

export const ResendButton = ({ email, event, onError }: ResendButtonProps) => {
  const t = useTranslations('auth.resendEmailButton');
  const searchParams = useSearchParams();
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
        const nextPath = searchParams.get('next');
        await resendEmailService(null, {
          payload: { email, event, next_path: nextPath },
        });
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
