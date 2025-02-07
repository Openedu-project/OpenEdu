import type { AllGroupSidebarKeys, AllSidebarKeys, ThemeName } from '.';

export type ThemeConfigKey = 'pages' | 'globals' | 'components' | 'metadata' | 'features';
// Featured-contents's data was saved at API /api/featured-contents (not system-config)

export type ThemeParams = {
  themeName?: ThemeName;
  themeConfig?: ThemeConfigKey;
  groupSettingKey?: AllGroupSidebarKeys | AllSidebarKeys;
  itemSettingKey?: AllSidebarKeys;
};
