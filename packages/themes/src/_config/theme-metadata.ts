import type { IFileResponse } from '@oe/api/types/file';
import type { ThemePageKey } from '../_types';
import type { ThemeSystem } from '../_types/theme-system-config';
export const defaultMetadata = {
  title: 'Openedu',
  description: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  canonical: '',
  robotsIndex: true,
  robotsFollow: true,
  icons: {
    icon: undefined,
    shortcut: undefined,
    apple: undefined,
  },
};

export const getMetadata = (themeSystem?: ThemeSystem, pageKey?: ThemePageKey) => {
  const activeTheme = themeSystem?.availableThemes?.[themeSystem?.activedTheme];
  const metadata = pageKey ? activeTheme?.pages?.[pageKey]?.metadata : activeTheme?.metadata;

  if (!metadata) {
    return defaultMetadata;
  }

  const formatIcon = (icon?: IFileResponse) => {
    if (!icon?.url) {
      return undefined;
    }

    return [
      {
        url: icon.url,
        type: icon.mime ?? 'image/png',
      },
    ];
  };

  const { title, description, keywords, ogTitle, ogDescription, ogImage, robotsIndex, robotsFollow, canonical, icons } =
    metadata;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    robots: {
      index: robotsIndex,
      follow: robotsFollow,
    },
    alternates: {
      canonical,
    },
    icons: {
      icon: formatIcon(icons?.icon),
      shortcut: formatIcon(icons?.shortcut),
      apple: formatIcon(icons?.apple),
    },
  };
};
