import type { ComponentType } from 'react';
import type { BaseSectionProps, SectionPropsMap, SectionsByPage, ThemePageKey } from '.';

export type SectionProps<
  Page extends ThemePageKey,
  Section extends SectionsByPage[Page],
> = Section extends keyof SectionPropsMap<Page> ? SectionPropsMap<Page>[Section] : BaseSectionProps<Page>;

export type SectionComponent<Page extends ThemePageKey, Section extends SectionsByPage[Page]> = ComponentType<
  SectionProps<Page, Section>
>;

export type PageSectionTypes<T extends ThemePageKey> = SectionsByPage[T];

export type SectionRender = {
  [key: string]: ComponentType;
  default: ComponentType;
};

export type SectionComponentMap<T extends string> = {
  [key in T | 'theme']?: ComponentType;
};
