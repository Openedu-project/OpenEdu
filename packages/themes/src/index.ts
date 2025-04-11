import { defaultThemeSystemConfig } from './_config/initial';
import { initialThemeGlobal } from './_config/theme-global-initial';
import { getMetadata } from './_config/theme-metadata';

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

export { defaultThemeSystemConfig, getMetadata, initialThemeGlobal, updateGlobalTheme };
