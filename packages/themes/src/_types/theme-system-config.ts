import type { ThemeGlobal } from './theme-global';
import type { ThemeInfo } from './theme-info';
import type { ThemeMetadata } from './theme-metadata';
import type { PagesConfig, ThemeName, ThemePageKey } from './theme-page';

export type ThemeDefinition = {
  pages?: PagesConfig<ThemePageKey>;
  metadata?: ThemeMetadata;
  components?: never;
  globals?: ThemeGlobal;
  info?: ThemeInfo;
};

export type ThemeCollection = {
  [Name in ThemeName]?: ThemeDefinition;
};

export interface ThemeSystem {
  activedTheme?: ThemeName;
  availableThemes: ThemeCollection;
}
