import type { ComponentType } from 'react';
import type { BaseSectionProps, SectionComponent, SectionProps, SectionsByPage, ThemeName, ThemePageKey } from '.';

export type PageRender = {
  [K in ThemePageKey]?: {
    [S in SectionsByPage[K]]?: ComponentType<SectionProps<K, S>>;
  } & {
    theme: ComponentType<BaseSectionProps<K>>;
  };
};

export type ThemeRender = {
  [K in ThemeName]: PageRender;
};

export type PageComponents<Page extends ThemePageKey> = {
  [Section in SectionsByPage[Page]]: SectionComponent<Page, Section>;
};

export type ComponentsByTheme = {
  [Page in ThemePageKey]: PageComponents<Page>;
};
