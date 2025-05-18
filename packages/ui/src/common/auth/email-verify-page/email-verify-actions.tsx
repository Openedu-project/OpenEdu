'use client';

import { API_ENDPOINT, setSessionRevalidatePath } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
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
      await setSessionRevalidatePath({ accessToken, refreshToken });
      await Promise.all([mutate(API_ENDPOINT.USERS_ME), mutate(() => true, undefined, { revalidate: false })]);
      router.replace(path);
    }
  };

  return (
    <Button variant={isError ? 'destructive' : 'default'} className="w-full" onClick={() => handleNavigate(nextPath)}>
      {tGeneral('backToPreviousPage')}
    </Button>
  );
}
