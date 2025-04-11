import { defaultThemeSystemConfig } from './_config/initial';
import { initialThemeGlobal } from './_config/theme-global-initial';
import { getMetadata } from './_config/theme-metadata';
import type { ThemeRender } from './_types/theme-page';
// import { fonts } from './fonts';

// Academia theme
import {
  AcademiaAboutUs,
  AcademiaHomePage,
  AcademiaHomepageExplores,
  AcademiaHomepageFeatures,
  AcademiaHomepageHero,
  AcademiaHomepageOrganizations,
  AcademiaHomepagePartners,
} from './academia';

// Auth components
import {
  AuthLayout,
  AuthLayoutForgotPassword,
  AuthLayoutLogin,
  AuthLayoutSignUp,
  ThemeFooter,
  ThemeHeader,
} from './auth';

// Avail theme
import {
  AvailHomepage,
  AvailHomepageBlogsClient,
  AvailHomepageBlogsServer,
  AvailHomepageCoursesClient,
  AvailHomepageCoursesServer,
  AvailHomepageEco,
  AvailHomepageFeature,
  AvailHomepageHero,
  AvailHomepageSolution,
} from './avail';

// Fenet theme
import {
  FenetHomepage,
  FenetHomepageBlog,
  FenetHomepageCustomer,
  FenetHomepageExperience,
  FenetHomepageExpert,
  FenetHomepageFeature,
  FenetHomepageHero,
  FenetHomepagePrice,
  FenetHomepageService,
} from './fenet';

// Scholar theme
import {
  ScholarHomepage,
  ScholarHomepageAboutUs,
  ScholarHomepageAchievements,
  ScholarHomepageContact,
  ScholarHomepageHero,
  ScholarHomepageProjects,
  ScholarHomepageService,
  ScholarHomepageTeam,
  ScholarHomepageTestimonials,
} from './scholar';

// VBI theme
import {
  VbiAboutUs,
  VbiAboutUsCore,
  VbiAboutUsGoal,
  VbiAboutUsIntro,
  VbiHomepage,
  VbiHomepageAchievementsClient,
  VbiHomepageAchievementsServer,
  VbiHomepageBlogsServer,
  VbiHomepageCertClient,
  VbiHomepageCertServer,
  VbiHomepageCoursesClient,
  VbiHomepageCoursesServer,
  VbiHomepageCreatorsClient,
  VbiHomepageCreatorsServer,
  VbiHomepageEventsClient,
  VbiHomepageEventsServer,
  VbiHomepageFeaturesClient,
  VbiHomepageFeaturesServer,
  VbiHomepageHeroClient,
  VbiHomepageHeroServer,
  VbiHomepageMapClient,
  VbiHomepageMapServer,
  VbiPartnerFeaturesClient,
  VbiPartners,
  VbiPartnersCta,
  VbiPartnersList,
  VbiPartnersShowcase,
  VbiPartnersTesti,
} from './vbi';

const auth = {
  theme: AuthLayout,
  header: ThemeHeader,
  footer: ThemeFooter,
  login: AuthLayoutLogin,
  signUp: AuthLayoutSignUp,
  forgotPassword: AuthLayoutForgotPassword,
};
export const THEMES: ThemeRender = {
  academia: {
    homepage: {
      theme: AcademiaHomePage,
      hero: AcademiaHomepageHero,
      features: AcademiaHomepageFeatures,
      partners: AcademiaHomepagePartners,
      explores: AcademiaHomepageExplores,
      organizations: AcademiaHomepageOrganizations,
    },
    'about-us': {
      theme: AcademiaAboutUs,
    },
    auth,
  },
  scholar: {
    homepage: {
      theme: ScholarHomepage,
      scholarHero: ScholarHomepageHero,
      scholarService: ScholarHomepageService,
      scholarAboutUs: ScholarHomepageAboutUs,
      scholarAchievements: ScholarHomepageAchievements,
      scholarTeam: ScholarHomepageTeam,
      scholarProjects: ScholarHomepageProjects,
      scholarTestimonials: ScholarHomepageTestimonials,
      scholarContact: ScholarHomepageContact,
    },
    auth,
  },
  vbi: {
    homepage: {
      theme: VbiHomepage,
      vbiHero: VbiHomepageHeroClient,
      vbiAchievements: VbiHomepageAchievementsClient,
      vbiCourses: VbiHomepageCoursesClient,
      vbiCert: VbiHomepageCertClient,
      vbiFeatures: VbiHomepageFeaturesClient,
      // vbiBlogs: VbiHomepageBlogsClient,
      vbiEvents: VbiHomepageEventsClient,
      vbiCreators: VbiHomepageCreatorsClient,
      vbiMap: VbiHomepageMapClient,
    },
    'about-us': {
      theme: VbiAboutUs,
      vbiIntro: VbiAboutUsIntro,
      vbiGoal: VbiAboutUsGoal,
      vbiCore: VbiAboutUsCore,
    },
    partners: {
      theme: VbiPartners,
      vbiPartnerList: VbiPartnersList,
      vbiShowcase: VbiPartnersShowcase,
      vbiTesti: VbiPartnersTesti,
      vbiPartnerFeatures: VbiPartnerFeaturesClient,
      vbiCta: VbiPartnersCta,
    },
    auth,
  },
  avail: {
    homepage: {
      theme: AvailHomepage,
      availHero: AvailHomepageHero,
      availFeature: AvailHomepageFeature,
      availCourses: AvailHomepageCoursesClient,
      availSolution: AvailHomepageSolution,
      availEco: AvailHomepageEco,
      availBlogs: AvailHomepageBlogsClient,
    },
    auth,
  },
  fenet: {
    homepage: {
      theme: FenetHomepage,
      fenetHero: FenetHomepageHero,
      fenetService: FenetHomepageService,
      fenetFeature: FenetHomepageFeature,
      fenetExperience: FenetHomepageExperience,
      fenetCustomer: FenetHomepageCustomer,
      fenetExpert: FenetHomepageExpert,
      fenetPrice: FenetHomepagePrice,
      fenetBlog: FenetHomepageBlog,
    },
    auth,
  },
} as const;

export const THEMES_SERVER: ThemeRender = {
  academia: {
    homepage: {
      theme: AcademiaHomePage,
      hero: AcademiaHomepageHero,
      features: AcademiaHomepageFeatures,
      partners: AcademiaHomepagePartners,
      explores: AcademiaHomepageExplores,
      organizations: AcademiaHomepageOrganizations,
    },
    'about-us': {
      theme: AcademiaAboutUs,
    },
    auth: {
      theme: AuthLayout,
    },
  },
  scholar: {
    homepage: {
      theme: ScholarHomepage,
      scholarHero: ScholarHomepageHero,
      scholarService: ScholarHomepageService,
      scholarAboutUs: ScholarHomepageAboutUs,
      scholarAchievements: ScholarHomepageAchievements,
      scholarTeam: ScholarHomepageTeam,
      scholarProjects: ScholarHomepageProjects,
      scholarTestimonials: ScholarHomepageTestimonials,
      scholarContact: ScholarHomepageContact,
    },
    auth: {
      theme: AuthLayout,
    },
  },
  vbi: {
    homepage: {
      theme: VbiHomepage,
      vbiHero: VbiHomepageHeroServer,
      vbiAchievements: VbiHomepageAchievementsServer,
      vbiCourses: VbiHomepageCoursesServer,
      vbiCert: VbiHomepageCertServer,
      vbiFeatures: VbiHomepageFeaturesServer,
      vbiBlogs: VbiHomepageBlogsServer,
      vbiEvents: VbiHomepageEventsServer,
      vbiCreators: VbiHomepageCreatorsServer,
      vbiMap: VbiHomepageMapServer,
    },
    'about-us': {
      theme: VbiAboutUs,
      vbiIntro: VbiAboutUsIntro,
      vbiGoal: VbiAboutUsGoal,
      vbiCore: VbiAboutUsCore,
    },
    partners: {
      theme: VbiPartners,
      vbiPartnerList: VbiPartnersList,
      vbiShowcase: VbiPartnersShowcase,
      vbiTesti: VbiPartnersTesti,
      // vbiPartnerFeatures: VbiPartnerFeaturesServer,
      vbiCta: VbiPartnersCta,
    },
    auth: {
      theme: AuthLayout,
    },
  },
  avail: {
    homepage: {
      theme: AvailHomepage,
      availHero: AvailHomepageHero,
      availFeature: AvailHomepageFeature,
      availCourses: AvailHomepageCoursesServer,
      availSolution: AvailHomepageSolution,
      availEco: AvailHomepageEco,
      availBlogs: AvailHomepageBlogsServer,
    },
    auth,
  },
  fenet: {
    homepage: {
      theme: FenetHomepage,
      fenetHero: FenetHomepageHero,
      fenetService: FenetHomepageService,
      fenetFeature: FenetHomepageFeature,
      fenetExperience: FenetHomepageExperience,
      fenetCustomer: FenetHomepageCustomer,
      fenetExpert: FenetHomepageExpert,
      fenetPrice: FenetHomepagePrice,
      fenetBlog: FenetHomepageBlog,
    },
    auth,
  },
} as const;

export { defaultThemeSystemConfig, getMetadata, initialThemeGlobal };
export * from './_components/theme-settings';
export * from './academia';
export * from './auth';
export * from './avail';
export * from './fenet';
export * from './layout';
export * from './scholar';
export * from './vbi';
export * from './_common';
export * from './_types';
export * from './_components/theme-list';
export * from './_components/web/theme-web-page';
