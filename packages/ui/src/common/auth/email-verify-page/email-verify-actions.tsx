'use client';

import { setCookiesService } from '@oe/api/services/cookies';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '#shadcn/button';

export function EmailVerifyActions({
  isError,
  nextPath,
  accessToken,
  refreshToken,
}: {
  isError: boolean;
  nextPath: string;
  accessToken: string;
  refreshToken: string;
}) {
  const tGeneral = useTranslations('general');
  const router = useRouter();

  const handleNavigate = async (path: string) => {
    if (!isError && accessToken && refreshToken) {
      const domain = typeof window !== 'undefined' ? new URL(window.location.href).host : '';
      await setCookiesService([
        {
          key: process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY,
          value: accessToken,
          options: domain ? { domain } : undefined,
        },
        {
          key: process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY,
          value: refreshToken,
          options: domain ? { domain } : undefined,
        },
      ]);
      router.replace(path);
    }
  };

  return (
    <Button variant={isError ? 'destructive' : 'default'} className="w-full" onClick={() => handleNavigate(nextPath)}>
      {tGeneral('backToPreviousPage')}
    </Button>
  );
}
