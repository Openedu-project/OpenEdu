import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LOCALE, DEFAULT_LOCALES } from './constants';

export const routing = defineRouting({
  locales: DEFAULT_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeCookie: {
    name: process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY,
    maxAge: 60 * 60 * 24 * 365,
  },
});
