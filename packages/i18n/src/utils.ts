import { DEFAULT_LOCALE } from './constants';
import { type LanguageCode, languages } from './languages';

export function isPathnameHasLocale(pathname: string) {
  const locale = getLocaleFromPathname(pathname);

  return pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`;
}

export function getLocaleFromPathname(pathname: string) {
  const [, locale] = pathname.split('/');

  return languages[locale as LanguageCode] ? (locale as LanguageCode) : DEFAULT_LOCALE;
}

export function getUnlocalizedPathname(pathname: string) {
  const locale = getLocaleFromPathname(pathname);

  if (pathname === `/${locale}`) {
    return '/';
  }
  return pathname.startsWith(`/${locale}/`) ? pathname.replace(`/${locale}`, '') : pathname;
}
