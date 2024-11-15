'use client';
import { useLocale } from 'next-intl';
import { usePathname as useNextPathname } from 'next/navigation';
import { useMemo } from 'react';

export function usePathname() {
  const pathname = useNextPathname();
  const locale = useLocale();

  return useMemo(() => {
    if (!pathname) {
      return pathname;
    }

    const unlocalizedPathname = pathname.replace(`/${locale}`, '');

    return unlocalizedPathname || '/';
  }, [locale, pathname]);
}
