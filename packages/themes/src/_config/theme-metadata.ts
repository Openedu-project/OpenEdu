import type { ThemeMetadata, ThemePageKey } from '../_types';
import type { ThemeSystem } from '../_types/theme-system-config';
export const defaultMetadata: ThemeMetadata = {
  title: 'Openedu',
  description: '',
  keywords: '',
  openGraph: {
    title: '',
    description: '',
    images: undefined,
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '',
  },
  icons: {
    icon: undefined,
    shortcut: undefined,
    apple: undefined,
  },
};

// if not provide the pageKey data, return the metadata of system
export const getMetadata = (themeSystem?: ThemeSystem, pageKey?: ThemePageKey): ThemeMetadata => {
  const activeTheme = themeSystem?.availableThemes?.[themeSystem?.activedTheme];
  const metadata = pageKey ? activeTheme?.pages?.[pageKey]?.metadata : activeTheme?.metadata;

  if (!metadata) {
    return defaultMetadata;
  }

  // const formatIcon = (icon?: IFileResponse) => {
  //   if (!icon?.url) {
  //     return undefined;
  //   }

  //   return [
  //     {
  //       // ...icon,
  //       url: icon.url,
  //       type: icon.mime ?? 'image/png',
  //     },
  //   ];
  // };

  // const { title, description, keywords, ogTitle, ogDescription, ogImage, robotsIndex, robotsFollow, canonical, icons } =
  //   metadata;

  return metadata;
};
