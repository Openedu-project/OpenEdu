import { buildUrl } from '@oe/core/utils/url';
import type { ISystemConfigKey } from '#types/system-config';

import type { ThemeName } from '../../../themes/src/_types/theme-page';

import { getCookie } from '@oe/core/utils/cookie';
import { getOrgByDomainService } from '#services/organizations';
import { getAPIReferrerAndOriginClient } from './referrer-origin';

export const systemConfigKeys = {
  builderData: 'builder_data',
  buiderTranslations: 'builder_translations',
  i18nConfig: 'i18n_config',
  i18nTranslations: 'i18n_translations',
  themeSystem: 'theme_system',
  termPage: 'term_page',
  specificThemeSystem: 'theme_system_:themeName',
} as const;

export const createThemeSystemConfigKeyServer = async (themeName?: ThemeName): Promise<ISystemConfigKey> => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  const [orgData] = await Promise.all([
    getOrgByDomainService(undefined, {
      domain: domain?.split('/')?.[0] ?? domain,
    }),
  ]);

  return buildUrl({
    endpoint: systemConfigKeys.specificThemeSystem,
    params: { themeName: themeName || orgData?.domain?.split('.')?.[0] }, //theme_system_vbi
  }) as ISystemConfigKey;
};

export const createThemeSystemConfigKeyClient = (themeName?: ThemeName): ISystemConfigKey => {
  const { host } = getAPIReferrerAndOriginClient();

  return buildUrl({
    endpoint: systemConfigKeys.specificThemeSystem,
    params: { themeName: themeName || host?.split('.')?.[0] }, //theme_system_vbi
  }) as ISystemConfigKey;
};
