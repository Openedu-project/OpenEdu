import type { SectionProps, SectionsByPage, ThemeFieldConfig, ThemePageKey } from '.';
import type { ThemeMetadata } from '../theme-metadata';
export interface BaseSectionConfig<K extends ThemePageKey, S extends SectionsByPage[K]> {
  enable?: boolean;
  content?: ThemeFieldConfig | ThemeFieldConfig[];
  style?: ThemeFieldConfig | ThemeFieldConfig[];
  props?: SectionProps<K, S>;
  order: number;
}

export interface PageSectionConfig<K extends ThemePageKey> extends BaseSectionConfig<ThemePageKey, SectionsByPage[K]> {
  [key: string | 'enable' | 'content' | 'style' | 'props']:
    | ThemeFieldConfig
    | ThemeFieldConfig[]
    | boolean
    | undefined
    | number
    | SectionProps<ThemePageKey, SectionsByPage[K]>;
}

export type PageSectionConfigs<K extends ThemePageKey> = {
  [S in SectionsByPage[K] | 'theme']?: PageSectionConfig<K>;
};

export interface PageConfig<K extends ThemePageKey> {
  label: string;
  config: PageSectionConfigs<K> | undefined;
  metadata: ThemeMetadata | undefined;
}

export type PagesConfig<K extends ThemePageKey> = {
  [T in ThemePageKey]: PageConfig<K>;
};
