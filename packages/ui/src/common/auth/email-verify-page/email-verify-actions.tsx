'use client';

import { setCookiesService } from '@oe/api';
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
      await setCookiesService(typeof window !== 'undefined' ? window.location.origin : '', [
        {
          key: process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY,
          value: accessToken,
        },
        {
          key: process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY,
          value: refreshToken,
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
