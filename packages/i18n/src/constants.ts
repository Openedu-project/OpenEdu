import { languages } from './languages';
import type { LanguageCode } from './languages';

export const DEFAULT_LOCALE = 'en' as LanguageCode;
export const DEFAULT_LOCALES = Object.keys(languages) as LanguageCode[];
