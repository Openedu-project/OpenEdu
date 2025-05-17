import { getAPIReferrerAndOrigin, getAllTranslations } from '@oe/api';
import type { LanguageCode } from '@oe/i18n';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const { host } = await getAPIReferrerAndOrigin();
  const isAiOrg = host?.includes('aigov') || host?.includes('phocap.ai');
  const requestConfig = await getAllTranslations(isAiOrg ? 'vi' : (requestedLocale as LanguageCode), isAiOrg);
  return requestConfig;
});
