// import type { ThemePageKey } from '.';

import type { ThemePageKey } from './core';

/* HOMEPAGE */
type VbiHomepageSection =
  | 'vbiHero'
  | 'vbiAchievements'
  | 'vbiCourses'
  | 'vbiCert'
  | 'vbiFeatures'
  | 'vbiBlogs'
  | 'vbiEvents'
  | 'vbiCreators'
  | 'vbiMap';
type AvailHomepageSection = 'availHero' | 'availFeature' | 'availCourses' | 'availSolution' | 'availEco' | 'availBlogs';
type ScholarHomepageSection =
  | 'scholarHero'
  | 'scholarService'
  | 'scholarAboutUs'
  | 'scholarAchievements'
  | 'scholarTeam'
  | 'scholarProjects'
  | 'scholarTestimonials'
  | 'scholarContact';
type AcademiaHomepageSection = 'theme' | 'hero' | 'features' | 'partners' | 'explores' | 'organizations';
type FenetHomepageSection =
  | 'fenetHero'
  | 'fenetService'
  | 'fenetFeature'
  | 'fenetExperience'
  | 'fenetCustomer'
  | 'fenetExpert'
  | 'fenetPrice'
  | 'fenetBlog';

export type HomeSection =
  | AcademiaHomepageSection
  | ScholarHomepageSection
  | VbiHomepageSection
  | AvailHomepageSection
  | FenetHomepageSection;

/*ABOUT*/
export type AboutSection = 'theme' | 'team' | 'vbiIntro' | 'vbiGoal' | 'vbiCore';

/*AUTH */
export type AuthLayout =
  | 'theme'
  | 'login'
  | 'forgotPassword'
  | 'emailVerify'
  | 'signUp'
  | 'authConfirm'
  | 'header'
  | 'footer';

/*PARTNERS */
export type PartnersSection = 'theme' | 'vbiPartnerList' | 'vbiShowcase' | 'vbiTesti' | 'vbiPartnerFeatures' | 'vbiCta';

/*SECTION */
export type SectionsByPage = {
  homepage: HomeSection;
  'about-us': AboutSection;
  auth: AuthLayout;
  partners: PartnersSection;
};

export type AllSectionKeys = {
  [K in ThemePageKey]: SectionsByPage[K];
}[ThemePageKey];
