import { buildUrl, getCookie } from '@oe/core';
import { getOrgByDomainService } from '#services/organizations';
import type { ISystemConfigKey } from '#types/system-config';
import { getAPIReferrerAndOriginClient } from './referrer-origin';

export const systemConfigKeys = {
  builderData: 'builder_data',
  buiderTranslations: 'builder_translations',
  i18nConfig: 'i18n_config',
  i18nTranslations: 'i18n_translations',
  themeSystem: 'theme_system',
  termPage: 'term_page',
  faqPage: 'faq_page',
  specificThemeSystem: 'theme_system_:themeName',
} as const;

export const createThemeSystemConfigKeyServer = async (): Promise<ISystemConfigKey> => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  const [orgData] = await Promise.all([
    getOrgByDomainService(undefined, {
      domain: domain?.split('/')?.[0] ?? '',
    }),
  ]);

  return buildUrl({
    endpoint: systemConfigKeys.specificThemeSystem,
    params: { themeName: orgData?.domain?.split('.')?.[0] }, //theme_system_vbi
  }) as ISystemConfigKey;
};

export const createThemeSystemConfigKeyClient = (domain?: string): ISystemConfigKey => {
  const { host } = getAPIReferrerAndOriginClient();

  return buildUrl({
    endpoint: systemConfigKeys.specificThemeSystem,
    params: { themeName: (domain || host)?.split('.')?.[0] }, //theme_system_vbi
  }) as ISystemConfigKey;
};

//system-configs?keys={}
export const systemConfigQueryByKeys = {
  aiedu: 'ai_gov_vn_2025_campaign',
};
