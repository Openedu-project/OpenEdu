import { DEFAULT_LOCALE, DEFAULT_LOCALES } from '@oe/i18n/constants';
import { type LanguageCode, languages } from '@oe/i18n/languages';
import { messages } from '@oe/i18n/messages';
import { create } from 'zustand';

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

export interface LanguageStats {
  language: string;
  locale: LanguageCode;
  translated: number;
  untranslated: number;
  total: number;
}

interface LanguageState {
  id?: string;
  locales: LanguageOption[];
  locale: LanguageCode;
  translations: TranslationItem[];
  languageStats: LanguageStats[];
}

interface LanguageActions {
  setSelectedLocales: (locales: LanguageOption[]) => void;
  setDefaultLocale: (locale: LanguageCode) => void;
  setId: (id?: string) => void;
  reset: (data?: { locales?: LanguageOption[]; locale?: LanguageCode; id?: string }) => void;
  updateTranslations: () => void;
  updateTableData: (rowIndex: number, columnId: string, value: string, isParent?: boolean) => void;
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

const convertMessagesToTableData = (
  messages: Record<string, string | Record<string, unknown>>,
  locales: LanguageCode[],
  parentKey = ''
): TranslationItem[] => {
  const result: TranslationItem[] = [];
  const nonDefaultLocales = locales.filter(l => l !== DEFAULT_LOCALE);

  const processEntry = (value: string | Record<string, unknown>, fullKey: string) => {
    if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        processEntry(v as string | Record<string, unknown>, fullKey ? `${fullKey}.${k}` : k);
      }
      return;
    }

    result.push({
      id: fullKey,
      key: fullKey,
      locale: DEFAULT_LOCALE,
      translation: String(value),
      translated: true,
      subRows: nonDefaultLocales.map(locale => ({
        id: `${fullKey}-${locale}`,
        locale: locale,
        language: languages[locale],
        translation: null,
        translated: false,
      })),
    });
  };

  for (const [key, value] of Object.entries(messages)) {
    processEntry(value, parentKey ? `${parentKey}.${key}` : key);
  }

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
  locales: defaultLocales,
  locale: DEFAULT_LOCALE,
  translations: [],
  languageStats: [],

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

  reset: data => {
    set({
      locales: data?.locales || defaultLocales,
      locale: data?.locale || DEFAULT_LOCALE,
      id: data?.id,
    });
    get().updateTranslations();
  },

  updateTableData: (rowIndex: number, columnId: string, value: string, isParent?: boolean) => {
    set(state => ({
      translations: updateTranslation(state.translations, rowIndex, columnId, value, isParent),
    }));
    get().updateTranslations();
  },

  updateTranslations: () => {
    const localeList = get().locales.map(l => l.value);
    const currentTranslations = get().translations;
    if (currentTranslations.length === 0) {
      const translations = convertMessagesToTableData(messages, localeList);
      set({
        translations,
        languageStats: calculateLanguageStats(translations, localeList),
      });
    } else {
      set({
        languageStats: calculateLanguageStats(currentTranslations, localeList),
      });
    }
  },
}));
