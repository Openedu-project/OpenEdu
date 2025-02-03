import type { AllGroupSidebarKeys, AllSidebarKeys, ThemeName } from '.';

export type ThemeConfigKey = 'pages' | 'globals' | 'components' | 'metadata';

export type ThemeParams = {
  themeName?: ThemeName;
  themeConfig?: ThemeConfigKey;
  groupSettingKey?: AllGroupSidebarKeys | AllSidebarKeys;
  itemSettingKey?: AllSidebarKeys;
};
