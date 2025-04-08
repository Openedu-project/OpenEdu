// import type { IOrganization } from '@oe/api/types/organizations';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, DEFAULT_LOCALES } from './constants';
import type { LanguageCode } from './languages';

export function i18nMiddleware(
  request: NextRequest,
  { org, locales, defaultLocale }: { org: { domain: string }; locales?: LanguageCode[]; defaultLocale?: LanguageCode }
) {
  const handleI18nRouting = createMiddleware({
    locales: locales ?? DEFAULT_LOCALES,
    defaultLocale: defaultLocale ?? DEFAULT_LOCALE,
    localeDetection: false,
    domains: [
      {
        domain: org.domain,
        defaultLocale: defaultLocale ?? DEFAULT_LOCALE,
        locales: locales ?? DEFAULT_LOCALES,
      },
    ],
  });
  return handleI18nRouting(request);
}
