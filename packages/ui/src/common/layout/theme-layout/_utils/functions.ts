import type {
  AllGroupSidebarKeys,
  AllSidebarKeys,
  ThemeConfigKey,
  ThemeName,
  ThemeParams,
} from '@oe/themes/types/index';

export function parseThemePath(pathname: string): ThemeParams {
  // Remove leading and trailing slashes
  const cleanPath = pathname.replace(/^\/|\/$/g, '');

  // Split the path into segments
  const segments = cleanPath.split('/');

  // Find the index of 'themes' to ensure we're parsing from the correct position
  const themesIndex = segments.findIndex(segment => segment === 'themes');

  // Return empty object if we don't find 'themes' in the path
  if (themesIndex === -1) {
    return {};
  }

  return {
    themeName: segments[themesIndex + 1] as ThemeName,
    themeConfig: segments[themesIndex + 2] as ThemeConfigKey,
    groupSettingKey: segments[themesIndex + 3] as AllGroupSidebarKeys | AllSidebarKeys,
    itemSettingKey: segments[themesIndex + 4] as AllSidebarKeys,
  };
}
