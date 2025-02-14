import { cookieOptions, getCookies } from '@oe/core/utils/cookie';
import { deepMerge, deleteNestedValue, setNestedValue } from '@oe/core/utils/object';
import { DEFAULT_LOCALE } from '@oe/i18n/constants';
import { DEFAULT_LOCALES } from '@oe/i18n/constants';
import type { LanguageCode } from '@oe/i18n/languages';
import { messages } from '@oe/i18n/messages';
import type { I18nMessage } from '@oe/i18n/types';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import type { HTTPResponse } from '#types/fetch';
import type { I18nConfig } from '#types/i18n';
import type { ISystemConfigRes } from '#types/system-config';
import { API_ENDPOINT } from '#utils/endpoints';
import { systemConfigKeys } from '#utils/system-config';
import { createOrUpdateSystemConfig, getSystemConfigClient, getSystemConfigServer } from './system-config';

export const getI18nConfigServer = async () => {
  const i18nConfig = await getSystemConfigServer<I18nConfig>({
    key: systemConfigKeys.i18nConfig,
  });
  return i18nConfig;
};

export const getI18nConfigClient = async (endpoint?: string) => {
  try {
    const i18nConfig = await getSystemConfigClient<I18nConfig>(endpoint, {
      key: systemConfigKeys.i18nConfig,
    });
    return i18nConfig;
  } catch {
    return { value: { locales: DEFAULT_LOCALES, locale: DEFAULT_LOCALE, stats: [] } } as Partial<
      ISystemConfigRes<I18nConfig>
    >;
  }
};

export const getI18nTranslationsServer = async ({ locales }: { locales: LanguageCode[] }) => {
  const i18nTranslations = await getSystemConfigServer<I18nMessage>({
    key: systemConfigKeys.i18nTranslations,
    locales,
  });
  return i18nTranslations;
};

export const getI18nTranslationsClient = async (endpoint?: string, params?: { locales: LanguageCode[] }) => {
  const i18nTranslations = await getSystemConfigClient<I18nMessage>(endpoint, {
    key: systemConfigKeys.i18nTranslations,
    locales: params?.locales,
  });
  return i18nTranslations;
};

export const createOrUpdateI18nConfig = async ({
  config,
  id,
  locale,
}: {
  config: I18nConfig;
  id?: string;
  locale?: LanguageCode;
}) => {
  const response = await createOrUpdateSystemConfig(undefined, {
    id,
    payload: {
      key: systemConfigKeys.i18nConfig,
      value: config,
      locale,
    },
  });
  return response?.data;
};

export const createOrUpdateTranslations = async ({
  messages,
  id,
  locale,
  data_type,
}: {
  messages: I18nMessage;
  id?: string;
  locale?: LanguageCode;
  data_type?: 'jsonb' | 'json_array';
}) => {
  const response = await createOrUpdateSystemConfig(undefined, {
    id,
    payload: {
      key: systemConfigKeys.i18nTranslations,
      value: messages,
      data_type: data_type ?? 'json_array',
      is_storage_in_file: true,
      locale,
    },
  });
  return response?.data;
};

const i18nCookieConfig = {
  ...cookieOptions(),
  maxAge: 3600 * 24 * 365, // 1 year
};

export const getI18nResponseMiddleware = async (referrer: string, origin: string, request: NextRequest) => {
  const cookiesLocales = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY)?.value;
  const cookiesLocale = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY)?.value;
  const cookiesLocaleFiles = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_LOCALE_FILES_KEY)?.value;
  const files = cookiesLocaleFiles ? JSON.parse(decodeURIComponent(cookiesLocaleFiles)) : null;

  if (cookiesLocales && cookiesLocale && files) {
    const locales = JSON.parse(decodeURIComponent(cookiesLocales));
    const response = createMiddleware({
      locales,
      defaultLocale: cookiesLocale,
      localeCookie: {
        name: process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY,
        ...i18nCookieConfig,
      },
    })(request);

    return response;
  }

  let i18nLocales = DEFAULT_LOCALES;
  let i18nLocale = DEFAULT_LOCALE;
  let i18nFiles = null as Record<LanguageCode, string> | null;

  try {
    const domain = new URL(origin).hostname;
    const endpoint = `${API_ENDPOINT.SYSTEM_CONFIGS}?keys=${systemConfigKeys.i18nConfig}&domains=${domain}`;
    const apiURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}${endpoint}`;
    const i18nConfigResponse = await fetch(apiURL, {
      headers: {
        'X-referrer': referrer,
        Origin: origin,
      },
    });
    const i18nConfig = (await i18nConfigResponse.json()) as HTTPResponse<ISystemConfigRes<I18nConfig>[]>;
    const data = i18nConfig?.data?.[0]?.value;
    i18nLocales = data?.locales ?? DEFAULT_LOCALES;
    i18nLocale = data?.locale ?? DEFAULT_LOCALE;
    i18nFiles = data?.files ?? null;
  } catch {
    // Use default values set above
  }

  const response = createMiddleware({
    locales: i18nLocales,
    defaultLocale: i18nLocale,
    localeCookie: {
      name: process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY,
      ...i18nCookieConfig,
    },
  })(request);

  response.cookies.set({
    name: process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY,
    value: JSON.stringify(i18nLocales),
    ...i18nCookieConfig,
  });

  if (i18nFiles) {
    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_LOCALE_FILES_KEY,
      value: JSON.stringify(i18nFiles),
      ...i18nCookieConfig,
    });
  }

  return response;
};

export const fetchTranslationFile = async (path: string, fallbackData?: I18nMessage) => {
  if (!path) {
    return fallbackData;
  }

  try {
    const url = `https://${process.env.NEXT_PUBLIC_MEDIA_S3_HOST}/configs/${path}`;
    const response = await fetch(url);
    return (await response.json()) as I18nMessage;
  } catch (error) {
    console.error('Error fetching translation file:', error);
    return fallbackData;
  }
};

export const getAllTranslations = async (locale: LanguageCode) => {
  const cookieStore = await getCookies();
  const localesCookie = cookieStore?.[process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY];
  const locales = localesCookie ? JSON.parse(decodeURIComponent(localesCookie)) : DEFAULT_LOCALES;
  const filesCookie = cookieStore?.[process.env.NEXT_PUBLIC_COOKIE_LOCALE_FILES_KEY];
  const files = filesCookie ? JSON.parse(decodeURIComponent(filesCookie)) : {};
  let newlocale = locale ?? cookieStore?.[process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY];

  if (!(newlocale && locales.includes(newlocale as LanguageCode))) {
    newlocale = DEFAULT_LOCALE as LanguageCode;
  }

  let translations = messages as I18nMessage | undefined;
  let fallbackTranslations = messages as I18nMessage | undefined;

  if (locale === DEFAULT_LOCALE) {
    translations = await fetchTranslationFile(files[locale as LanguageCode], messages);
  } else {
    [translations, fallbackTranslations] = await Promise.all([
      fetchTranslationFile(files[locale as LanguageCode], messages),
      fetchTranslationFile(files[DEFAULT_LOCALE as LanguageCode], messages),
    ]);
    fallbackTranslations = deepMerge(messages, fallbackTranslations ?? {}) as I18nMessage;
  }

  const mergedTranslations = deepMerge(fallbackTranslations ?? {}, translations ?? {}) as I18nMessage;
  // console.error('---------------------------------', mergedTranslations.errors);
  return { locale: newlocale, messages: mergedTranslations };
};

// export const getTranslationByKeys = async (keys: string[], locale: LanguageCode) => {
//   const { messages } = await getAllTranslations(locale);

//   return keys.map(key => getNestedValue(messages, key));
// };

export const CRUDTranslationByKey = async (key: string | string[], value: string, isDelete = false) => {
  const { messages } = await getAllTranslations(DEFAULT_LOCALE);
  const newMessages = isDelete ? deleteNestedValue(messages, key, true) : setNestedValue(messages, key, value);
  const res = await getI18nTranslationsClient(undefined, { locales: [DEFAULT_LOCALE] });
  // if (res?.[0]?.id) {
  await createOrUpdateTranslations({
    messages: newMessages as I18nMessage,
    locale: DEFAULT_LOCALE,
    id: res?.[0]?.id,
    data_type: 'jsonb',
  });
  // }
  return newMessages;
};
