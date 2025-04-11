import { DEFAULT_LOCALE, DEFAULT_LOCALES } from '@oe/i18n';
import type { ISystemConfigRes } from '#types/system-config';
import type { IThemeSystemConfigPayload } from '#types/theme';
import { API_ENDPOINT } from '#utils/endpoints';
import { createThemeSystemConfigKeyClient, createThemeSystemConfigKeyServer } from '#utils/system-config';
// import type { ThemeSystem } from '../../../themes/src/_types';
import { createOrUpdateSystemConfig, getSystemConfigClient, getSystemConfigServer } from './system-config';

// Client
export const createOrUpdateThemeConfig = async (
  endpoint: string,
  { config, id, locale, domain }: IThemeSystemConfigPayload
) => {
  const key = createThemeSystemConfigKeyClient(domain);

  const response = await createOrUpdateSystemConfig(endpoint, {
    id,
    payload: {
      key,
      value: config,
      locale,
      domain,
    },
  });
  return response?.data;
};

export const getThemeConfigClient = async (endpoint?: string, init?: RequestInit) => {
  const key = await createThemeSystemConfigKeyServer();

  try {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const themeSystem = await getSystemConfigClient<any>(endpoint ?? API_ENDPOINT.SYSTEM_CONFIGS, {
      key,
      init,
    });
    return themeSystem;
  } catch {
    return { value: { locales: DEFAULT_LOCALES, locale: DEFAULT_LOCALE, stats: [] } } as unknown as Partial<
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ISystemConfigRes<any>
    >;
  }
};

export const getThemeConfigServer = async () => {
  const key = await createThemeSystemConfigKeyServer();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const themeSystem = await getSystemConfigServer<any>({
    key,
  });
  return themeSystem;
};
