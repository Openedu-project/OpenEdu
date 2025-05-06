import type { IFileResponse } from '@oe/api';

export interface ThemeMetadataIcons {
  icon?: IFileResponse;
  shortcut?: IFileResponse;
  apple?: IFileResponse;
}

export type ThemeMetadata = {
  title: string;
  description: string;
  keywords: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  alternates?: {
    canonical?: string;
  };
  icons?: ThemeMetadataIcons;
  verification?: {
    google?: string;
  };
};
