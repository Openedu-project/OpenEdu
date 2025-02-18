import type { ThemePageKey } from '.';
import type { PreviewPanelProps } from '../../_components/theme-settings/theme-page/theme-preview-panel';
import type {
  AcademiaHomepageExploresProps,
  AcademiaHomepageFeaturesProps,
  AcademiaHomepageHeroProps,
  AcademiaHomepageOrganizationsProps,
  AcademiaHomepagePartnersProps,
} from '../../academia';
import type { ThemeFooterProps } from '../../auth/footer';
import type { ThemeHeaderProps } from '../../auth/header';
import type { AuthLayoutLoginProps } from '../../auth/login';
import type { ScholarHomepageAboutUsProps, ScholarHomepageHeroProps, ScholarHomepageServiceProps } from '../../scholar';
import type {
  VbiAboutUsCoreProps,
  VbiAboutUsGoalProps,
  VbiAboutUsIntroProps,
  VbiHomepageAchievementsProps,
  VbiHomepageBlogsProps,
  VbiHomepageCertProps,
  VbiHomepageCoursesProps,
  VbiHomepageCreatorsProps,
  VbiHomepageEventsProps,
  VbiHomepageFeaturesProps,
  VbiHomepageHeroProps,
  VbiHomepageMapProps,
} from '../../vbi/type';

import type {
  AvailHomepageBlogsProps,
  AvailHomepageCoursesProps,
  AvailHomepageEcoProps,
  AvailHomepageFeatureProps,
  AvailHomepageHeroProps,
  AvailHomepageSolutionProps,
} from '../../avail/type';
import type { PageSectionConfig } from './config';
export interface BaseSectionProps<K extends ThemePageKey> {
  sectionConfig?: PageSectionConfig<K>;
  className?: string;
  t?: (key: string) => string;
  [key: string]: unknown | undefined;
}

export interface DynamicProps<K extends ThemePageKey, Props extends {}> extends BaseSectionProps<K> {
  props?: Props;
}

export interface SectionPropsMap<K extends ThemePageKey> {
  default: BaseSectionProps<K>;
  theme: DynamicProps<K, PreviewPanelProps>;
  // Academia
  hero: DynamicProps<K, AcademiaHomepageHeroProps>;
  features: DynamicProps<K, AcademiaHomepageFeaturesProps>;
  team: BaseSectionProps<K>;
  partners: DynamicProps<K, AcademiaHomepagePartnersProps>;
  explores: DynamicProps<K, AcademiaHomepageExploresProps>;
  organizations: DynamicProps<K, AcademiaHomepageOrganizationsProps>;

  // Auth
  login: DynamicProps<K, AuthLayoutLoginProps>;
  signUp: DynamicProps<K, AuthLayoutLoginProps>;
  forgotPassword: DynamicProps<K, AuthLayoutLoginProps>;
  emailVerify: DynamicProps<K, AuthLayoutLoginProps>;
  authConfirm: DynamicProps<K, AuthLayoutLoginProps>;
  header: DynamicProps<K, ThemeHeaderProps>;
  footer: DynamicProps<K, ThemeFooterProps>;

  // Scholar
  scholarHero: DynamicProps<K, ScholarHomepageHeroProps>;
  scholarService: DynamicProps<K, ScholarHomepageServiceProps>;
  scholarAboutUs: DynamicProps<K, ScholarHomepageAboutUsProps>;

  // VBI
  vbiHero: DynamicProps<K, VbiHomepageHeroProps>;
  vbiAchievements: DynamicProps<K, VbiHomepageAchievementsProps>;
  vbiCourses: DynamicProps<K, VbiHomepageCoursesProps>;
  vbiCert: DynamicProps<K, VbiHomepageCertProps>;
  vbiFeatures: DynamicProps<K, VbiHomepageFeaturesProps>;
  vbiBlogs: DynamicProps<K, VbiHomepageBlogsProps>;
  vbiEvents: DynamicProps<K, VbiHomepageEventsProps>;
  vbiCreators: DynamicProps<K, VbiHomepageCreatorsProps>;
  vbiMap: DynamicProps<K, VbiHomepageMapProps>;
  vbiIntro: DynamicProps<K, VbiAboutUsIntroProps>;
  vbiGoal: DynamicProps<K, VbiAboutUsGoalProps>;
  vbiCore: DynamicProps<K, VbiAboutUsCoreProps>;

  // Avail
  availHero: DynamicProps<K, AvailHomepageHeroProps>;
  availFeature: DynamicProps<K, AvailHomepageFeatureProps>;
  availCourses: DynamicProps<K, AvailHomepageCoursesProps>;
  availSolution: DynamicProps<K, AvailHomepageSolutionProps>;
  availEco: DynamicProps<K, AvailHomepageEcoProps>;
  availBlogs: DynamicProps<K, AvailHomepageBlogsProps>;
}
