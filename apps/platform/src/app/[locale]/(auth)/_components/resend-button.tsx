'use client';

import { usePostResendEmail } from '@oe/api/hooks/useResendEmail';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ResendButton = ({ event }: { event: 'REGISTER' | 'RESET_PASSWORD' | 'EXTERNAL_REGISTER' }) => {
  const t = useTranslations('resendEmailButton');
  const searchParams = useSearchParams();
  const [seconds, setSeconds] = useState(59);
  const { triggerResendEmail } = usePostResendEmail();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleResendEmail = async () => {
    const email = searchParams.get('email');

    if (email) {
      setSeconds(59);
      try {
        await triggerResendEmail({ email, event });
      } catch (error) {
        console.error('error', error);
      }
    }
  };

  return (
    <Button variant="primary" disabled={seconds > 0} onClick={handleResendEmail}>
      {seconds > 0
        ? t('resendWaitMsg', { seconds: seconds.toString().length >= 2 ? seconds : `0${seconds}` })
        : t('resendEmail')}
    </Button>
  );
};

export default ResendButton;
