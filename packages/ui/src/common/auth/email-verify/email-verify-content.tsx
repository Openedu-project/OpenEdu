'use client';

import { useVerifyEmail } from '@oe/api/hooks/useVerifyEmail';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { useRouter } from '@oe/ui/common/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export function EmailVerifyContent() {
  const t = useTranslations('auth.verifyEmail');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [seconds, setSeconds] = useState(5);
  const queryToken = searchParams.get('token');

  useVerifyEmail(queryToken as string);

  useEffect(() => {
    if (!queryToken) {
      router.replace(PLATFORM_ROUTES.homepage);
    }
  }, [queryToken, router.replace]);

  useEffect(() => {
    const interval = setInterval(() => {
      const count = seconds - 1;

      if (count < 0) {
        clearInterval(interval);
        router.replace(PLATFORM_ROUTES.homepage);
      } else {
        setSeconds(count);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, router.replace]);

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="giant-iheading-semibold20">{t('congratTitle')}</h3>
      <p>{t('congratDescription', { seconds })}</p>
      <Link href={PLATFORM_ROUTES.homepage} variant="default" replace>
        {t('backToHome')}
      </Link>
    </div>
  );
}
