import { buildUrl } from '@oe/core/utils/url';
import type { ThemeName } from '@oe/themes/types/index';
import type { ISystemConfigKey } from '#types/system-config';
import { getAPIReferrerAndOriginClient, getAPIReferrerAndOriginServer } from './referrer-origin';

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
  const { host } = await getAPIReferrerAndOriginServer();

  return buildUrl({
    endpoint: systemConfigKeys.specificThemeSystem,
    params: { themeName: themeName || host?.split('.')?.[0] }, //theme_system_vbi
  }) as ISystemConfigKey;
};

export const createThemeSystemConfigKeyClient = (themeName?: ThemeName): ISystemConfigKey => {
  const { host } = getAPIReferrerAndOriginClient();

  return buildUrl({
    endpoint: systemConfigKeys.specificThemeSystem,
    params: { themeName: themeName || host?.split('.')?.[0] }, //theme_system_vbi
  }) as ISystemConfigKey;
};
