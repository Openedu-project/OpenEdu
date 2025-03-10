import type { ThemeName } from '../_types';
import type { ThemeCollection, ThemeSystem } from '../_types/theme-system-config';
import { initialThemeGlobal } from './theme-global-initial';
import { themeInfo } from './theme-info';
import { getMetadata } from './theme-metadata';
import { createThemePageConfig } from './theme-page-initial/index';

export const defaultThemeSystemConfig = (t: (key: string) => string): ThemeSystem => {
  return {
    activedTheme: undefined,
    availableThemes: {
      academia: {
        pages: createThemePageConfig(t).academia,
        metadata: getMetadata(),
        globals: initialThemeGlobal,
        components: undefined,
        info: themeInfo(t).academia,
      },
      scholar: {
        pages: createThemePageConfig(t).scholar,
        metadata: getMetadata(),
        globals: initialThemeGlobal,
        components: undefined,
        info: themeInfo(t).scholar,
      },
      vbi: {
        pages: createThemePageConfig(t).vbi,
        metadata: getMetadata(),
        globals: initialThemeGlobal,
        components: undefined,
        info: themeInfo(t).vbi,
      },
      avail: {
        pages: createThemePageConfig(t).avail,
        metadata: getMetadata(),
        globals: initialThemeGlobal,
        components: undefined,
        info: themeInfo(t).avail,
      },
    },
  };
};

export const themeSystemListNames = (t: (key: string) => string): ThemeName[] => {
  return Object.keys(defaultThemeSystemConfig(t)?.availableThemes) as ThemeName[];
};
export const themeSystemListCollections = (t: (key: string) => string): ThemeCollection => {
  return defaultThemeSystemConfig(t)?.availableThemes;
};
