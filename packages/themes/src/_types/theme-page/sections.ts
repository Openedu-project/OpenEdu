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
// Theme step 2: create the section key with syntax: `${themeName}${sectionName}
type AieduHomepageSection =
  | 'theme'
  | 'aieduHero'
  | 'aieduFeatures'
  | 'aieduExpert'
  | 'aieduDashboard'
  | 'aieduBlog'
  | 'aieduCert'
  | 'aieduGuide'
  | 'aieduSponsors'
  | 'aieduGallery';

// Theme step 3 (optionals): if the type is new, add to the all HomeSection
export type HomeSection =
  | AcademiaHomepageSection
  | ScholarHomepageSection
  | VbiHomepageSection
  | AvailHomepageSection
  | FenetHomepageSection
  | AieduHomepageSection;

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

// INTRODUCTION
export type IntroduceSection =
  | 'theme'
  | 'aieduGoal'
  | 'aieduVisionMission'
  | 'aieduExpert'
  | 'aieduFeatures'
  | 'aieduMap'
  | 'aieduTrend'
  | 'aieduBenefit';

// RANKING
export type RankingSection = 'theme' | 'aieduDashboard';
// SCHEDULE
export type ScheduleSection = 'theme';

/*SECTION */
export type SectionsByPage = {
  homepage: HomeSection;
  'about-us': AboutSection;
  auth: AuthLayout;
  partners: PartnersSection;
  introduction: IntroduceSection;
  ranking: RankingSection;
  schedule: ScheduleSection;
};

export type AllSectionKeys = {
  [K in ThemePageKey]: SectionsByPage[K];
}[ThemePageKey];
