import type { ThemePageKey } from '.';

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
  | 'scholarAchievements'
  | 'vbiHero'
  | 'vbiAchievements'
  | 'vbiCourses'
  | 'vbiCert'
  | 'vbiFeatures'
  | 'vbiBlogs'
  | 'vbiEvents'
  | 'vbiCreators'
  | 'vbiMap'
  | 'availHero'
  | 'availFeature'
  | 'availCourses'
  | 'availSolution'
  | 'availEco'
  | 'availBlogs';

export type AboutSection = 'theme' | 'team' | 'vbiIntro' | 'vbiGoal' | 'vbiCore';
export type AuthLayout =
  | 'theme'
  | 'login'
  | 'forgotPassword'
  | 'emailVerify'
  | 'signUp'
  | 'authConfirm'
  | 'header'
  | 'footer';
export type PartnersSection = 'theme' | 'vbiPartnerList' | 'vbiShowcase' | 'vbiTesti' | 'vbiPartnerFeatures' | 'vbiCta';
export type SectionsByPage = {
  homepage: HomeSection;
  'about-us': AboutSection;
  auth: AuthLayout;
  partners: PartnersSection;
};

export type AllSectionKeys = {
  [K in ThemePageKey]: SectionsByPage[K];
}[ThemePageKey];
