import type { LanguageCode } from '@oe/i18n';

export interface LanguageStats {
  language: string;
  locale: LanguageCode;
  translated: number;
  untranslated: number;
  total: number;
}

export interface I18nConfig {
  locales: LanguageCode[];
  locale: LanguageCode;
  stats?: LanguageStats[];
  files?: Record<LanguageCode, string>;
}
