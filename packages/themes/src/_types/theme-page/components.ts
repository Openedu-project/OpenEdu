import type { ComponentType } from 'react';
import type { ThemePageKey } from './core';
import type { BaseSectionProps } from './props';
import type { SectionPropsMap } from './props';
import type { SectionsByPage } from './sections';

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
