import type { FileType } from '@oe/ui/components/uploader';
import type { ComponentType } from 'react';
import type { PreviewPanelProps } from '../_components/theme-settings/theme-page/theme-preview-panel';
import type {
  AcademiaHomepageExploresProps,
  AcademiaHomepageFeaturesProps,
  AcademiaHomepageHeroProps,
  AcademiaHomepageOrganizationsProps,
  AcademiaHomepagePartnersProps,
} from '../academia';
import type { AcademiaAuthLayoutLoginProps } from '../academia/auth/login';
import type { ScholarHomepageAboutUsProps, ScholarHomepageHeroProps, ScholarHomepageServiceProps } from '../scholar';
import type {
  VbiHomepageAchievementsProps,
  VbiHomepageCertProps,
  VbiHomepageCoursesProps,
  VbiHomepageFeaturesProps,
  VbiHomepageHeroProps,
} from '../vbi';
import type { ThemeMetadata } from './theme-metadata';
// Core Types
export type ThemeName = 'academia' | 'scholar' | 'vbi';
export type ThemePageKey = 'homepage' | 'about-us' | 'auth';

// Section Definitions
export type HomeSection =
  | 'theme'
  | 'hero'
  | 'features'
  | 'partners'
  | 'explores'
  | 'organizations'
  | 'scholarHero'
  | 'scholarService'
  | 'scholarAboutUs'
  | 'vbiHero'
  | 'vbiAchievements'
  | 'vbiCourses'
  | 'vbiCert'
  | 'vbiFeatures'; // Add new page key - HERE
export type AboutSection = 'theme' | 'team';
export type AuthLayout = 'theme' | 'login' | 'forgotPassword' | 'emailVerify' | 'signUp' | 'authConfirm';

export type SectionsByPage = {
  homepage: HomeSection;
  'about-us': AboutSection;
  auth: AuthLayout;
};

export type AllSectionKeys = {
  [K in ThemePageKey]: SectionsByPage[K];
}[ThemePageKey];

// Theme Field Types
export type ThemeFieldValue = string | number | boolean | FileType | undefined;

export interface ThemeFieldConfig {
  [key: string]: ThemeFieldValue | ThemeFieldConfig | ThemeFieldConfig[];
}

// Section Configuration
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

// Page Configuration
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

export interface ThemeCard {
  name: ThemeName;
  thumbnail: string;
}

// Component Props
export interface BaseSectionProps<K extends ThemePageKey> {
  sectionConfig?: PageSectionConfig<K>;
  className?: string;
  [key: string]: unknown | undefined;
}

export interface DynamicProps<K extends ThemePageKey, Props extends {}> extends BaseSectionProps<K> {
  props?: Props;
}

export interface SectionPropsMap<K extends ThemePageKey> {
  default: BaseSectionProps<K>;
  theme: DynamicProps<K, PreviewPanelProps>;
  hero: DynamicProps<K, AcademiaHomepageHeroProps>;
  features: DynamicProps<K, AcademiaHomepageFeaturesProps>;
  team: BaseSectionProps<K>;
  partners: DynamicProps<K, AcademiaHomepagePartnersProps>;
  explores: DynamicProps<K, AcademiaHomepageExploresProps>;
  organizations: DynamicProps<K, AcademiaHomepageOrganizationsProps>;
  login: DynamicProps<K, AcademiaAuthLayoutLoginProps>;
  signUp: DynamicProps<K, AcademiaAuthLayoutLoginProps>;
  forgotPassword: DynamicProps<K, AcademiaAuthLayoutLoginProps>;
  emailVerify: DynamicProps<K, AcademiaAuthLayoutLoginProps>;
  authConfirm: DynamicProps<K, AcademiaAuthLayoutLoginProps>;

  /**SCHOLAR */
  scholarHero: DynamicProps<K, ScholarHomepageHeroProps>;
  scholarService: DynamicProps<K, ScholarHomepageServiceProps>;
  scholarAboutUs: DynamicProps<K, ScholarHomepageAboutUsProps>;

  /* VBI */
  vbiHero: DynamicProps<K, VbiHomepageHeroProps>;
  vbiAchievements: DynamicProps<K, VbiHomepageAchievementsProps>;
  vbiCourses: DynamicProps<K, VbiHomepageCoursesProps>;
  vbiCert: DynamicProps<K, VbiHomepageCertProps>;
  vbiFeatures: DynamicProps<K, VbiHomepageFeaturesProps>;
}

// Component Types
export type SectionProps<
  Page extends ThemePageKey,
  Section extends SectionsByPage[Page],
> = Section extends keyof SectionPropsMap<Page> ? SectionPropsMap<Page>[Section] : BaseSectionProps<Page>;

export type SectionComponent<Page extends ThemePageKey, Section extends SectionsByPage[Page]> = ComponentType<
  SectionProps<Page, Section>
>;

// Page Component Rendering
export type PageSectionTypes<T extends ThemePageKey> = SectionsByPage[T];

export type SectionRender = {
  [key: string]: ComponentType;
  default: ComponentType;
};

export type SectionComponentMap<T extends string> = {
  [key in T | 'theme']?: ComponentType;
};

export type PageRender = {
  [K in ThemePageKey]: {
    [S in SectionsByPage[K]]?: ComponentType<SectionProps<K, S>>;
  } & {
    theme: ComponentType<BaseSectionProps<K>>;
    // metadata?: never;
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
