import { getAllTranslations } from '@oe/api';
import type { LanguageCode } from '@oe/i18n';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return getAllTranslations(locale as LanguageCode);
});
