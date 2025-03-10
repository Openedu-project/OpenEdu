import type { FileType } from '@oe/ui/components/uploader';

export interface ThemeInfo {
  name: string;
  description?: string;
  thumbnail?: FileType;
  creator?: string;
}
