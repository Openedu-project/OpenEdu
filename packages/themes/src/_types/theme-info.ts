import type { FileType } from '@oe/ui';

export interface ThemeInfo {
  name: string;
  description?: string;
  thumbnail?: FileType;
  creator?: string;
}
