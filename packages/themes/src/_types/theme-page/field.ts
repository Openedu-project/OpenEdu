import type { FileType } from '@oe/ui';

export type ThemeFieldValue = string | number | boolean | FileType | undefined;

export interface ThemeFieldConfig {
  [key: string]: ThemeFieldValue | ThemeFieldConfig | ThemeFieldConfig[];
}
