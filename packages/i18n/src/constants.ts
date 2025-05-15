import { type LanguageCode, languages } from './languages';

export const DEFAULT_LOCALE = 'en' as const;
// export const DEFAULT_LOCALES = ['en', 'vi'];
export const DEFAULT_LOCALES = Object.keys(languages) as LanguageCode[];
