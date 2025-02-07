import type { IFileResponse } from '@oe/api/types/file';

export interface ThemeMetadataIcons {
  icon?: IFileResponse;
  shortcut?: IFileResponse;
  apple?: IFileResponse;
}

export type ThemeMetadata = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  icons?: ThemeMetadataIcons;
};
