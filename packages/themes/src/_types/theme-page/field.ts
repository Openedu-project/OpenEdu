import type { FileType } from '@oe/ui/components/uploader';

export type ThemeFieldValue = string | number | boolean | FileType | undefined;

export interface ThemeFieldConfig {
  [key: string]: ThemeFieldValue | ThemeFieldConfig | ThemeFieldConfig[];
}
