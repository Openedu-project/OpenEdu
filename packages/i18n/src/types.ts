import type { Formats, TranslationValues } from 'next-intl';

export type TFunction = (key: string, values?: TranslationValues, formats?: Partial<Formats>) => string;
