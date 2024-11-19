import type { Formats, TranslationValues } from 'next-intl';

export type TFunction = (key: string, values?: TranslationValues, formats?: Partial<Formats>) => string;
export interface I18nMessage {
  [key: string]: I18nMessage | string;
}
