'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Spinner } from '@oe/ui/components/spinner';
import AuthCallbackPage from './social-callback';

export default function AuthCallbackWrapper() {
  const router = useRouter();
  const searchParamsClient = useSearchParams();
  const state = searchParamsClient.get('state') ?? '';
  const code = searchParamsClient.get('code') ?? '';

  useEffect(() => {
    const handleRedirect = async () => {
      const result = await AuthCallbackPage({ state, code });

      if (result?.redirectTo) {
        router.replace(result.redirectTo);
      }
    };

    void handleRedirect();
  }, [router, state, code]);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-[1] flex h-[100%] min-h-screen items-center justify-center rounded-[16px]">
      <Spinner backdrop={false} />
    </div>
  );
}
