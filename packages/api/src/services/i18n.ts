import { buildUrl, deepMerge, deleteNestedValue, setNestedValue } from '@oe/core';
import { DEFAULT_LOCALE, DEFAULT_LOCALES } from '@oe/i18n';
import type { I18nMessage, LanguageCode } from '@oe/i18n';
import { messages } from '@oe/i18n';
import { hasLocale } from 'next-intl';
import { cache } from 'react';
import type { I18nConfig } from '#types/i18n';
import type { ISystemConfigRes } from '#types/system-config';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';
import { getAPIReferrerAndOrigin } from '#utils/referrer-origin';
import { systemConfigKeys } from '#utils/system-config';
import { createOrUpdateSystemConfig, getSystemConfigClient, getSystemConfigServer } from './system-config';

export const getI18nConfig = cache(async () => {
  try {
    const { host } = await getAPIReferrerAndOrigin();
    const endpointKey = buildUrl({
      endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
      queryParams: {
        keys: systemConfigKeys.i18nConfig,
        domains: host,
      },
    });
    const res = await fetchAPI<ISystemConfigRes<I18nConfig>[]>(endpointKey);
    return res?.data?.[0]?.value;
  } catch {
    return null;
  }
});

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

export const fetchTranslationFile = async (path: string, fallbackData?: I18nMessage) => {
  if (!path) {
    return fallbackData;
  }

  try {
    const url = `https://${process.env.NEXT_PUBLIC_MEDIA_S3_HOST}/configs/${path}`;
    const response = await fetch(url);
    return (await response.json()) as I18nMessage;
  } catch (error) {
    console.error(
      'Error fetching translation file:',
      error,
      `https://${process.env.NEXT_PUBLIC_MEDIA_S3_HOST}/configs/${path}`
    );
    return fallbackData;
  }
};

export const getAllTranslations = cache(async (requestedLocale: LanguageCode) => {
  const start = performance.now();
  const i18nConfig = await getI18nConfig();

  const files = i18nConfig?.files;
  const locale = hasLocale(i18nConfig?.locales ?? [], requestedLocale) ? requestedLocale : DEFAULT_LOCALE;

  let translations = messages as I18nMessage | undefined;
  let fallbackTranslations = messages as I18nMessage | undefined;

  if (!files) {
    return { locale, messages };
  }

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
  const end = performance.now();
  console.log(`Time taken for getAllTranslations: ${end - start} milliseconds`);
  return { locale, messages: mergedTranslations };
});

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
