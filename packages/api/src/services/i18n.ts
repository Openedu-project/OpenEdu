import { cookieOptions } from '@oe/core/utils/cookie';
import { DEFAULT_LOCALE } from '@oe/i18n/constants';
import { DEFAULT_LOCALES } from '@oe/i18n/constants';
import type { LanguageCode } from '@oe/i18n/languages';
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
    const i18nConfig = await getSystemConfigClient<I18nConfig>(endpoint ?? API_ENDPOINT.SYSTEM_CONFIGS, {
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
  const i18nTranslations = await getSystemConfigClient<I18nMessage>(endpoint ?? API_ENDPOINT.SYSTEM_CONFIGS, {
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
}: {
  messages: I18nMessage;
  id?: string;
  locale?: LanguageCode;
}) => {
  const response = await createOrUpdateSystemConfig(undefined, {
    id,
    payload: {
      key: systemConfigKeys.i18nTranslations,
      value: messages,
      data_type: 'json_array',
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

  if (cookiesLocales && cookiesLocale) {
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

  try {
    const endpoint = `${API_ENDPOINT.SYSTEM_CONFIGS}?keys=${systemConfigKeys.i18nConfig}&domains=${origin}`;
    const apiURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}${endpoint}`;
    const i18nConfigResponse = await fetch(apiURL, {
      headers: {
        'X-referrer': referrer,
        Origin: origin,
      },
    });
    const i18nConfig = (await i18nConfigResponse.json()) as HTTPResponse<
      ISystemConfigRes<{ locales: LanguageCode[]; locale: LanguageCode }>[]
    >;
    const data = i18nConfig?.data?.[0]?.value;
    i18nLocales = data?.locales ?? DEFAULT_LOCALES;
    i18nLocale = data?.locale ?? DEFAULT_LOCALE;
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

  return response;
};
