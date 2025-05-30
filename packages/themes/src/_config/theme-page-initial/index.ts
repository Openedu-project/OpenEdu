import type { PagesConfig, ThemeName, ThemePageKey } from '../../_types/theme-page/index';
import { createAcademiaConfig } from './academia';
import { createAvailConfig } from './avail';
import { createScholarConfig } from './scholar';
import { createVbiConfig } from './vbi';

const createTranslationGetter = (t: (key: string) => string, themeName: ThemeName | string) => {
  return (path: string[]) => {
    return t([themeName, ...path].join('.'));
  };
};

export const createThemePageConfig = (t: (key: string) => string): Record<ThemeName, PagesConfig<ThemePageKey>> => {
  const academiaT = createTranslationGetter(t, 'academia');
  const scholarT = createTranslationGetter(t, 'scholar');
  const vbiT = createTranslationGetter(t, 'vbi');
  const availT = createTranslationGetter(t, 'avail');

  return {
    academia: createAcademiaConfig(t, academiaT),
    scholar: createScholarConfig(t, scholarT),
    vbi: createVbiConfig(t, vbiT),
    avail: createAvailConfig(t, availT),
  };
};
