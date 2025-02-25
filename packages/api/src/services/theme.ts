import { DEFAULT_LOCALE, DEFAULT_LOCALES } from '@oe/i18n/constants';
import type { LanguageCode } from '@oe/i18n/languages';
import type { ThemeSystem } from '@oe/themes/types/index';
import type { ISystemConfigRes } from '#types/system-config';
import { API_ENDPOINT } from '#utils/endpoints';
import { systemConfigKeys, themeSystemConfigKeyByHost } from '#utils/system-config';
import { createOrUpdateSystemConfig, getSystemConfigClient, getSystemConfigServer } from './system-config';

//TODO: remove
export const createOrUpdateThemeConfig = async ({
  config,
  id,
  locale,
}: {
  config: ThemeSystem;
  id?: string;
  locale?: LanguageCode;
}) => {
  const response = await createOrUpdateSystemConfig(undefined, {
    id,
    payload: {
      key: systemConfigKeys.themeSystem,
      value: config,
      locale,
    },
  });
  return response?.data;
};

export const createOrUpdateThemeConfigByHost = async ({
  config,
  id,
  locale,
}: {
  config: ThemeSystem;
  id?: string;
  locale?: LanguageCode;
}) => {
  const response = await createOrUpdateSystemConfig(undefined, {
    id,
    payload: {
      key: themeSystemConfigKeyByHost(),
      value: config,
      locale,
    },
  });
  return response?.data;
};

//TODO: remove
export const getThemeConfigClient = async (endpoint?: string, init?: RequestInit) => {
  try {
    const themeSystem = await getSystemConfigClient<ThemeSystem>(endpoint ?? API_ENDPOINT.SYSTEM_CONFIGS, {
      key: systemConfigKeys.themeSystem,
      init,
    });
    return themeSystem;
  } catch {
    return { value: { locales: DEFAULT_LOCALES, locale: DEFAULT_LOCALE, stats: [] } } as unknown as Partial<
      ISystemConfigRes<ThemeSystem>
    >;
  }
};

export const getThemeConfigByHostClient = async (endpoint?: string, init?: RequestInit) => {
  try {
    const themeSystem = await getSystemConfigClient<ThemeSystem>(endpoint ?? API_ENDPOINT.SYSTEM_CONFIGS, {
      key: themeSystemConfigKeyByHost(),
      init,
    });
    return themeSystem;
  } catch {
    return { value: { locales: DEFAULT_LOCALES, locale: DEFAULT_LOCALE, stats: [] } } as unknown as Partial<
      ISystemConfigRes<ThemeSystem>
    >;
  }
};

//TODO: remove
export const getThemeConfigServer = async () => {
  const themeSystem = await getSystemConfigServer<ThemeSystem>({
    key: systemConfigKeys.themeSystem,
  });
  return themeSystem;
};

export const getThemeConfigByHostServer = async () => {
  const themeSystem = await getSystemConfigServer<ThemeSystem>({
    key: themeSystemConfigKeyByHost(),
  });
  return themeSystem;
};
