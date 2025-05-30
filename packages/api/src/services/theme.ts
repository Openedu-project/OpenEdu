import { DEFAULT_LOCALE, DEFAULT_LOCALES } from '@oe/i18n/constants';
import type { LanguageCode } from '@oe/i18n/languages';
import type { ISystemConfigRes } from '#types/system-config';
import { API_ENDPOINT } from '#utils/endpoints';
import { createThemeSystemConfigKeyServer } from '#utils/system-config';
import type { ThemeSystem } from '../../../themes/src/_types';
import { createOrUpdateSystemConfig, getSystemConfigClient, getSystemConfigServer } from './system-config';

//TODO: remove
// export const createOrUpdateThemeConfig = async ({
//   config,
//   id,
//   locale,
// }: {
//   config: ThemeSystem;
//   id?: string;
//   locale?: LanguageCode;
// }) => {
//   const response = await createOrUpdateSystemConfig(undefined, {
//     id,
//     payload: {
//       key: systemConfigKeys.themeSystem,
//       value: config,
//       locale,
//     },
//   });
//   return response?.data;
// };

// Client
export const createOrUpdateThemeConfig = async ({
  config,
  id,
  locale,
}: {
  config: ThemeSystem;
  id?: string;
  locale?: LanguageCode;
}) => {
  const key = await createThemeSystemConfigKeyServer();

  const response = await createOrUpdateSystemConfig(undefined, {
    id,
    payload: {
      key,
      value: config,
      locale,
    },
  });
  return response?.data;
};

//TODO: remove
// export const getThemeConfigClient = async (endpoint?: string, init?: RequestInit) => {
//   try {
//     const themeSystem = await getSystemConfigClient<ThemeSystem>(endpoint ?? API_ENDPOINT.SYSTEM_CONFIGS, {
//       key: systemConfigKeys.themeSystem,
//       init,
//     });
//     return themeSystem;
//   } catch {
//     return { value: { locales: DEFAULT_LOCALES, locale: DEFAULT_LOCALE, stats: [] } } as unknown as Partial<
//       ISystemConfigRes<ThemeSystem>
//     >;
//   }
// };

export const getThemeConfigClient = async (endpoint?: string, init?: RequestInit) => {
  const key = await createThemeSystemConfigKeyServer();

  try {
    const themeSystem = await getSystemConfigClient<ThemeSystem>(endpoint ?? API_ENDPOINT.SYSTEM_CONFIGS, {
      key,
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
// export const getThemeConfigServer = async () => {
//   const themeSystem = await getSystemConfigServer<ThemeSystem>({
//     key: systemConfigKeys.themeSystem,
//   });
//   return themeSystem;
// };

export const getThemeConfigServer = async () => {
  const key = await createThemeSystemConfigKeyServer();
  const themeSystem = await getSystemConfigServer<ThemeSystem>({
    key,
  });
  return themeSystem;
};
