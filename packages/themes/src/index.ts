import { defaultThemeSystemConfig } from './_config/initial';
import { initialThemeGlobal } from './_config/theme-global-initial';
import { getMetadata } from './_config/theme-metadata';
import { ThemeWebPage } from './_components/web/theme-web-page';
import { ThemeSettingGlobal } from './_components/theme-settings/theme-global/theme-setting-global';
import { updateGlobalTheme } from './_components/theme-settings/theme-global/_utils';

// Fenet theme
export {
  FenetHomepage,
  FenetHomepageBlog,
  FenetHomepageCustomer,
  FenetHomepageExperience,
  FenetHomepageExpert,
  FenetHomepageFeature,
  FenetHomepageHero,
  FenetHomepagePrice,
  FenetHomepageService,
} from './fenet';

export { defaultThemeSystemConfig, getMetadata, initialThemeGlobal, updateGlobalTheme, ThemeWebPage, ThemeSettingGlobal };
export * from './_types';
export * from './_components/theme-list';
export * from './_common';
export * from './_components/theme-settings';