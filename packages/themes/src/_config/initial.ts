import type { ThemeSystem } from '../_types/theme-system-config';
import { createThemePageConfig } from './theme-page-initial/index';

export const defaultThemeSystemConfig = (t: (key: string) => string): ThemeSystem => {
  return {
    activedTheme: 'vbi',
    availableThemes: {
      academia: {
        pages: createThemePageConfig(t).academia,
        metadata: undefined,
        globals: undefined,
        components: undefined,
      },
      scholar: {
        pages: createThemePageConfig(t).scholar,
        metadata: undefined,
        components: undefined,
        globals: undefined,
      },
      vbi: {
        pages: createThemePageConfig(t).vbi,
        metadata: undefined,
        globals: undefined,
        components: undefined,
      },
      avail: {
        pages: createThemePageConfig(t).avail,
        metadata: undefined,
        globals: undefined,
        components: undefined,
      },
    },
  };
};
