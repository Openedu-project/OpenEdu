import type { IFileResponse } from '@oe/api/types/file';
import type { LanguageStats } from '@oe/api/types/i18n';
import { deepMerge } from '@oe/core/utils/object';
import { DEFAULT_LOCALE, DEFAULT_LOCALES } from '@oe/i18n/constants';
import { type LanguageCode, languages } from '@oe/i18n/languages';
import { messages } from '@oe/i18n/messages';
import type { I18nMessage } from '@oe/i18n/types';
import { create } from 'zustand';
// import { deepMergeWithCleanup } from '../_utils';

export type LanguageOption = {
  value: LanguageCode;
  label: string;
};

export interface TranslationItem {
  id: string;
  key: string;
  locale: LanguageCode;
  translation: string;
  translated: boolean;
  subRows: TranslationSubItem[];
}

export interface TranslationSubItem {
  id: string;
  language: string;
  locale: LanguageCode;
  translation: string | null;
  translated: boolean;
}

interface LanguageState {
  id?: string;
  locales?: LanguageOption[];
  locale?: LanguageCode;
  translations?: TranslationItem[];
  languageStats?: LanguageStats[];
  translationFiles?: IFileResponse[];
  files?: Record<LanguageCode, string>;
}

interface LanguageActions {
  setSelectedLocales: (locales: LanguageOption[]) => void;
  setDefaultLocale: (locale: LanguageCode) => void;
  setId: (id?: string) => void;
  init: (data?: {
    locales?: LanguageOption[];
    locale?: LanguageCode;
    id?: string;
    languageStats?: LanguageStats[];
    files?: Record<LanguageCode, string>;
  }) => void;
  updateTranslations: (translations?: Record<LanguageCode, I18nMessage>) => void;
  updateTableData: (rowIndex: number, columnId: string, value: string, isParent?: boolean) => void;
  setFiles: (files: Record<LanguageCode, string>) => void;
}

const updateTranslationStatus = (value: string | null) => {
  return value !== null && value.trim() !== '';
};

export const updateTranslation = (
  translations: TranslationItem[],
  rowIndex: number,
  columnId: string,
  value: string,
  isParent?: boolean
): TranslationItem[] => {
  return translations.map((item, index) => {
    if (index === rowIndex) {
      if (columnId === 'translation' && isParent) {
        return {
          ...item,
          translation: value,
          translated: updateTranslationStatus(value),
        };
      }
      const langCode = columnId.split('-')[1];
      return {
        ...item,
        subRows: item.subRows.map(subRow =>
          subRow.language === langCode
            ? {
                ...subRow,
                translation: value,
                translated: updateTranslationStatus(value),
              }
            : subRow
        ),
      };
    }
    return item;
  });
};

export const convertMessagesToTableData = (
  translations: Record<LanguageCode, I18nMessage>,
  locales: LanguageCode[]
): TranslationItem[] => {
  const result: TranslationItem[] = [];
  const nonDefaultLocales = locales.filter(l => l !== DEFAULT_LOCALE);
  const defaultMessages = translations[DEFAULT_LOCALE] || {};

  const processEntry = (
    defaultValue: string | I18nMessage,
    translations: Record<string, I18nMessage>,
    fullKey: string
  ) => {
    if (typeof defaultValue === 'object') {
      for (const [k, v] of Object.entries(defaultValue)) {
        const translationValues = Object.fromEntries(
          Object.entries(translations).map(([locale, msgs]) => [
            locale,
            typeof msgs === 'object' && msgs ? (msgs as Record<string, I18nMessage>)[k] : null,
          ])
        ) as Record<string, I18nMessage>;
        processEntry(v as string | Record<string, I18nMessage>, translationValues, fullKey ? `${fullKey}.${k}` : k);
      }
      return;
    }

    // Thêm vào kết quả
    result.push({
      id: fullKey,
      key: fullKey,
      locale: DEFAULT_LOCALE,
      translation: String(defaultValue),
      translated: true,
      subRows: nonDefaultLocales.map(locale => {
        return {
          id: `${fullKey}-${locale}`,
          locale: locale,
          language: languages[locale],
          translation: translations[locale] ? String(translations[locale]) : null, // Sửa chỗ này
          translated: Boolean(translations[locale]),
        };
      }),
    });
  };

  const processMessages = (defaultMessages: I18nMessage) => {
    for (const [key, value] of Object.entries(defaultMessages)) {
      const translationValues = Object.fromEntries(
        locales.map(locale => [locale, translations[locale]?.[key] || null])
      );

      processEntry(value, translationValues as Record<string, I18nMessage>, key);
    }
  };

  processMessages(defaultMessages);
  return result;
};

const calculateLanguageStats = (translations: TranslationItem[], locales: LanguageCode[]): LanguageStats[] => {
  const stats = new Map<LanguageCode, LanguageStats>();

  stats.set(DEFAULT_LOCALE, {
    language: languages[DEFAULT_LOCALE],
    locale: DEFAULT_LOCALE,
    translated: translations.length,
    untranslated: 0,
    total: translations.length,
  });

  for (const locale of locales.filter(l => l !== DEFAULT_LOCALE)) {
    stats.set(locale, {
      language: languages[locale],
      locale: locale,
      translated: 0,
      untranslated: 0,
      total: 0,
    });
  }

  for (const item of translations) {
    for (const subRow of item.subRows) {
      const langStats = stats.get(subRow.locale);
      if (langStats) {
        langStats.total++;
        if (subRow.translated) {
          langStats.translated++;
        } else {
          langStats.untranslated++;
        }
      }
    }
  }

  return Array.from(stats.values());
};

const defaultLocales = DEFAULT_LOCALES.map(locale => ({ value: locale, label: languages[locale] }));

export const useLanguageStore = create<LanguageState & LanguageActions>()((set, get) => ({
  id: undefined,
  locales: undefined,
  locale: DEFAULT_LOCALE,
  translations: undefined,
  languageStats: undefined,

  setSelectedLocales: locales => {
    set(state => ({
      locales: locales || defaultLocales,
      locale: locales?.find(l => l.value === state.locale)?.value || locales?.[0]?.value,
    }));
    get().updateTranslations();
  },

  setDefaultLocale: locale => {
    set({ locale });
    get().updateTranslations();
  },

  setId: id => set({ id }),

  setFiles: (files: Record<LanguageCode, string>) => set({ files }),

  init: data => {
    set({
      locales: data?.locales || defaultLocales,
      locale: data?.locale || DEFAULT_LOCALE,
      id: data?.id,
      languageStats: data?.languageStats,
      files: data?.files,
    });
    get().updateTranslations();
  },

  updateTableData: (rowIndex: number, columnId: string, value: string, isParent?: boolean) => {
    set(state => ({
      translations: updateTranslation(state.translations ?? [], rowIndex, columnId, value, isParent),
    }));
    get().updateTranslations();
  },

  updateTranslations: (translations?: Record<LanguageCode, I18nMessage>) => {
    const localeList = get().locales?.map(l => l.value) ?? [];
    const currentTranslations = get().translations;

    let newTranslations = currentTranslations;

    if (!newTranslations) {
      newTranslations = convertMessagesToTableData(
        { [DEFAULT_LOCALE]: messages } as Record<LanguageCode, I18nMessage>,
        localeList
      );
    } else if (translations) {
      const mergedTranslations = Object.fromEntries(
        Object.entries(translations).map(([locale, msgs]) => [locale, deepMerge(messages, msgs)])
      ) as Record<LanguageCode, I18nMessage>;

      // console.log("messages",messages)
      // console.log("translations",translations)

      // console.log("mergedTranslations",mergedTranslations)
      newTranslations = convertMessagesToTableData(mergedTranslations, localeList);
    }

    // console.log("newTranslations", newTranslations);
    set({
      translations: newTranslations,
      languageStats: calculateLanguageStats(newTranslations, localeList),
    });
  },
}));
