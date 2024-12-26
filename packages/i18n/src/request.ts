import { getAllTranslations } from '@oe/api/services/i18n';
import { getRequestConfig } from 'next-intl/server';
import type { LanguageCode } from './languages';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return getAllTranslations(locale as LanguageCode);
  // const cookieStore = await cookies();
  // const localesCookie = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY)?.value;
  // const locales = localesCookie ? JSON.parse(localesCookie) : DEFAULT_LOCALES;
  // const filesCookie = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_LOCALE_FILES_KEY)?.value;
  // const files = filesCookie ? JSON.parse(filesCookie) : {};
  // locale = locale ?? cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY)?.value;

  // if (!(locale && locales.includes(locale as LanguageCode))) {
  //   locale = DEFAULT_LOCALE as LanguageCode;
  // }

  // let translations = messages as I18nMessage | undefined;
  // let fallbackTranslations = messages as I18nMessage | undefined;

  // if (locale === DEFAULT_LOCALE) {
  //   translations = await fetchTranslationFile(files[locale as LanguageCode], messages);
  // } else {
  //   [translations, fallbackTranslations] = await Promise.all([
  //     fetchTranslationFile(files[locale as LanguageCode], messages),
  //     fetchTranslationFile(files[DEFAULT_LOCALE as LanguageCode], messages),
  //   ]);
  //   fallbackTranslations = deepMerge(messages, fallbackTranslations ?? {}) as I18nMessage;
  // }

  // const mergedTranslations = deepMerge(fallbackTranslations ?? {}, translations ?? {}) as I18nMessage;

  // return {
  //   locale,
  //   messages: mergedTranslations,
  // };
});
