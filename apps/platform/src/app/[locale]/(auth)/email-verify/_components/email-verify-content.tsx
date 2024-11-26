'use client';

import { useVerifyEmail } from '@oe/api/hooks/useVerifyEmail';
import { decodedToken } from '@oe/core/utils/decoded-token';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { useRouter } from '@oe/ui/common/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function EmailVerifyContent() {
  const t = useTranslations('verifyEmail');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [seconds, setSeconds] = useState(5);
  const res = decodedToken(searchParams.get('token'));

  if (!res) {
    router.replace(PLATFORM_ROUTES.homepage);
  }

  useVerifyEmail(res?.token as string);

  useEffect(() => {
    setSeconds(5);
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          router.replace(PLATFORM_ROUTES.homepage);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col ">
      <h3 className="giant-iheading-semibold20">{t('congratTitle')}</h3>
      <p>{t('congratDesc', { seconds })}</p>
      <Link href={PLATFORM_ROUTES.homepage} className="mt-[32px] max-w-[120px]" variant="primary" replace>
        {t('backToHome')}
      </Link>
    </div>
  );
}
