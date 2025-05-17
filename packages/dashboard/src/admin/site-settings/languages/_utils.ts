import { createOrUpdateI18nConfig } from '@oe/api';
import type { IFileResponse } from '@oe/api';
import { systemConfigKeys } from '@oe/api';
import type { LanguageStats } from '@oe/api';
import type { ISystemConfigRes } from '@oe/api';
import { setCookie } from '@oe/core';
import type { LanguageCode } from '@oe/i18n';
import type { I18nMessage } from '@oe/i18n';
import { DEFAULT_LOCALE } from '@oe/i18n';
import type { LanguageOption, TranslationItem } from './_store/useLanguageStore';

export const convertTranslation = (translations: TranslationItem[]) => {
  const result = {} as Record<LanguageCode, I18nMessage>;

  const processTranslation = (key: string, translation: string, locale: LanguageCode) => {
    const keys = key.split('.');
    let current = result[locale] as I18nMessage;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k as keyof I18nMessage] = translation;
      } else {
        current[k as keyof I18nMessage] = current[k as keyof I18nMessage] || {};
        current = current[k as keyof I18nMessage] as I18nMessage;
      }
    }
  };

  for (const item of translations) {
    result[DEFAULT_LOCALE] = result[DEFAULT_LOCALE] || {};
    processTranslation(item.key, item.translation, DEFAULT_LOCALE);

    for (const subItem of item.subRows) {
      result[subItem.locale] = result[subItem.locale] || {};
      processTranslation(item.key, subItem.translation || '', subItem.locale);
    }
  }

  return result;
};

export const getI18nFileName = (orgId: string, locale: LanguageCode, type: 'current' | 'backup' = 'current') => {
  return `${type}_${orgId}_${systemConfigKeys.i18nTranslations}_${locale}.json`;
};

export const parseI18nFileName = (fileName: string) => {
  const parts = fileName.split('_');
  return {
    type: parts[0] as 'current' | 'backup',
    orgId: parts[1],
    // locale: parts?.[parts.length - 1]?.replace('.json', '') as LanguageCode,
  };
};

// export const getCurrentI18nFile = (files: IFileResponse[], locale: LanguageCode) => {
//   return files.find(file => {
//      const { type,locale: fileLocale } = parseI18nFileName(file.name);
//      return type === 'current' && locale === fileLocale;
//   });
// };

export const getCurrentI18nFile = (files: IFileResponse[]) => {
  return files.find(file => {
    const { type } = parseI18nFileName(file.name);
    return type === 'current';
  });
};

export const groupI18nConfigsByLocale = (configs: ISystemConfigRes<I18nMessage>[]) => {
  return configs.reduce(
    (acc, config) => {
      acc[config.locale] = config;
      return acc;
    },
    {} as Record<LanguageCode, ISystemConfigRes<I18nMessage>>
  );
};

export const handleSaveI18nConfig = async ({
  locales,
  locale,
  languageStats,
  id,
  files,
  setId,
}: {
  locales?: LanguageOption[];
  locale?: LanguageCode;
  languageStats?: LanguageStats[];
  id?: string;
  files?: Record<LanguageCode, string>;
  setId: (id: string) => void;
}) => {
  const localeValues = locales?.map(locale => locale.value);
  if (!(localeValues && locale)) {
    throw new Error('Locales or locale is not defined');
  }
  const response = await createOrUpdateI18nConfig({
    config: { locales: localeValues, locale, stats: languageStats, files },
    id,
  });

  setId(response?.id);
  setCookie(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY, locale);
};

export const getUrls = ({
  locales,
  systemConfig,
}: { locales?: LanguageOption[]; systemConfig?: ISystemConfigRes<I18nMessage>[] }) => {
  const localesMap = locales?.map(l => l.value) ?? [];
  const configsByLocale = systemConfig
    ? groupI18nConfigsByLocale(systemConfig)
    : ({} as Record<LanguageCode, ISystemConfigRes<I18nMessage>>);

  return localesMap.reduce(
    (acc, locale) => {
      const config = configsByLocale[locale as LanguageCode];
      if (!config) {
        return acc;
      }
      const currentFile = getCurrentI18nFile(config.files);
      if (currentFile) {
        acc[locale] = currentFile.name;
      }
      return acc;
    },
    {} as Record<LanguageCode, string>
  );
};
