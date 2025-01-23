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
  | 'vbiHero'
  | 'vbiAchievements'
  | 'vbiCourses'
  | 'vbiCert'
  | 'vbiFeatures'
  | 'vbiBlogs'
  | 'vbiEvents'
  | 'vbiCreators'
  | 'vbiMap';

export type AboutSection = 'theme' | 'team' | 'vbiIntro' | 'vbiGoal';
export type AuthLayout = 'theme' | 'login' | 'forgotPassword' | 'emailVerify' | 'signUp' | 'authConfirm' | 'header';
export type PartnersSection = 'theme' | 'vbiPartnerList' | 'vbiShowcase';
export type SectionsByPage = {
  homepage: HomeSection;
  'about-us': AboutSection;
  auth: AuthLayout;
  partners: PartnersSection;
};

export type AllSectionKeys = {
  [K in ThemePageKey]: SectionsByPage[K];
}[ThemePageKey];
