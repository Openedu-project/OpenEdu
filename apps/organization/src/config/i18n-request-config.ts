import { getAllTranslations } from '@oe/api';
import type { LanguageCode } from '@oe/i18n';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const requestConfig = await getAllTranslations(requestedLocale as LanguageCode);
  return requestConfig;
});
