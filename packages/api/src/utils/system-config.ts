import { buildUrl } from '@oe/core/utils/url';
import type { ISystemConfigKey } from '#types/system-config';

export const systemConfigKeys = {
  builderData: 'builder_data',
  buiderTranslations: 'builder_translations',
  i18nConfig: 'i18n_config',
  i18nTranslations: 'i18n_translations',
  themeSystem: 'theme_system',
  termPage: 'term_page',
  specificThemeSystem: 'theme_system_:themeName',
} as const;

export const themeSystemConfigKeyByReferrer = (referrer?: string): ISystemConfigKey => {
  return buildUrl({
    endpoint: systemConfigKeys.specificThemeSystem,
    params: { themeName: referrer },
  }) as ISystemConfigKey;
};
