'use client';
import type { IZoneRoutes } from '@oe/core/utils/routes';
import type { LanguageCode } from '@oe/i18n/languages';
import { useRouter as useRouterNext } from 'next/navigation';
import { useCallback } from 'react';
import { useHref } from './useHref';

export function useRouter() {
  const router = useRouterNext();
  const { getFinalHref, isExternal } = useHref();

  const push = useCallback(
    (href: string, options?: { locale?: LanguageCode; scroll?: boolean; nextZone?: IZoneRoutes }) => {
      const finalHref = getFinalHref(href, { locale: options?.locale, nextZone: options?.nextZone });

      if (isExternal(href, options?.nextZone)) {
        window.location.href = finalHref;
      } else {
        router.push(finalHref, options);
      }
    },
    [router.push, getFinalHref, isExternal]
  );

  const replace = useCallback(
    (href: string, options?: { locale?: LanguageCode; scroll?: boolean; nextZone?: IZoneRoutes }) => {
      const finalHref = getFinalHref(href, { locale: options?.locale, nextZone: options?.nextZone });

      if (isExternal(href, options?.nextZone)) {
        window.location.href = finalHref;
      } else {
        router.replace(finalHref, options);
      }
    },
    [router.replace, getFinalHref, isExternal]
  );

  return {
    push,
    replace,
    back: router.back,
    forward: router.forward,
    prefetch: router.prefetch,
    refresh: router.refresh,
  };
}
