'use client';

import { useTranslations } from 'next-intl';
import { SWRConfig, type SWRConfiguration } from 'swr';
import { toast } from '#shadcn/sonner';

import type { HTTPError } from '@oe/api';
import { registerCustomZodErrorMap } from '@oe/api';
import { type ReactNode, useEffect } from 'react';

interface Props extends SWRConfiguration {
  children: ReactNode;
}

export function SWRProvider({ children, ...rest }: Props) {
  const t = useTranslations('errors');
  const tForms = useTranslations('formValidation');

  useEffect(() => {
    registerCustomZodErrorMap(tForms);
  }, [tForms]);

  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        onError(error: HTTPError) {
          toast.error(error.status, {
            description: t(error.message),
          });
        },
        ...rest,
      }}
    >
      {children}
    </SWRConfig>
  );
}
