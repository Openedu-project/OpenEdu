import type { AllGroupSidebarKeys } from './sidebar';
import type { AllSidebarKeys } from './sidebar';
import type { ThemeName } from './theme-page';

export type ThemeConfigKey = 'pages' | 'globals' | 'components' | 'metadata' | 'features';
// Featured-contents's data was saved at API /api/featured-contents (not system-config)

export type ThemeParams = {
  themeName?: ThemeName;
  themeConfig?: ThemeConfigKey;
  groupSettingKey?: AllGroupSidebarKeys | AllSidebarKeys;
  itemSettingKey?: AllSidebarKeys;
};
