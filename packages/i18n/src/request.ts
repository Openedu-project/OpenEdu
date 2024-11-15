import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { DEFAULT_LOCALE } from './constants';
import type { LanguageCode } from './languages';
import { messages } from './messages';

export default getRequestConfig(async ({ requestLocale }) => {
  const cookieStore = await cookies();
  let locale = await requestLocale;

  locale = locale ?? cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY)?.value;
  const locales = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY)?.value;
  if (!(locale && locales && JSON.parse(locales).includes(locale as LanguageCode))) {
    locale = DEFAULT_LOCALE as LanguageCode;
  }

  return {
    locale,
    messages,
  };
});
