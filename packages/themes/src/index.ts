import { defaultThemeSystemConfig } from './_config/initial';
import { getMetadata } from './_config/theme-metadata';
import type { ThemeRender } from './_types/theme-page';
import {
  AcademiaAboutUs,
  AcademiaHomePage,
  AcademiaHomepageExplores,
  AcademiaHomepageFeatures,
  AcademiaHomepageHero,
  AcademiaHomepageOrganizations,
  AcademiaHomepagePartners,
} from './academia';
import {
  AuthLayout,
  AuthLayoutForgotPassword,
  AuthLayoutLogin,
  AuthLayoutSignUp,
  ThemeFooter,
  ThemeHeader,
} from './auth/type';

import { updateGlobalTheme } from './_components/theme-settings/theme-global/_utils';
import { initialThemeGlobal } from './_config/theme-global-initial';
import { AvailHomepageBlogsClient, AvailHomepageBlogsServer } from './avail/homepage/avail-blogs';
import { AvailHomepageCoursesClient, AvailHomepageCoursesServer } from './avail/homepage/avail-courses';
import { AvailHomepageEco } from './avail/homepage/avail-eco';
import { AvailHomepageFeature } from './avail/homepage/avail-feature';
import { AvailHomepageHero } from './avail/homepage/avail-hero';
import { AvailHomepageSolution } from './avail/homepage/avail-solution';
import AvailHomepage from './avail/homepage/index';

import { fonts } from './fonts';
import { ScholarHomepageAboutUs, ScholarHomepageHero, ScholarHomepageService } from './scholar';
import { ScholarAboutUs, ScholarHomePage } from './scholar';
import { VbiAboutUsGoal } from './vbi/about-us/goal';
import VbiAboutUs from './vbi/about-us/index';
import { VbiAboutUsIntro } from './vbi/about-us/intro';
import VbiHomepage from './vbi/homepage/index';
import { VbiHomepageAchievementsClient, VbiHomepageAchievementsServer } from './vbi/homepage/vbi-achievements';
import { VbiHomepageBlogsClient, VbiHomepageBlogsServer } from './vbi/homepage/vbi-blogs';
import { VbiHomepageCertClient, VbiHomepageCertServer } from './vbi/homepage/vbi-cert';
import { VbiHomepageCoursesClient, VbiHomepageCoursesServer } from './vbi/homepage/vbi-courses';
import { VbiHomepageCreatorsClient, VbiHomepageCreatorsServer } from './vbi/homepage/vbi-creators';
import { VbiHomepageEventsClient, VbiHomepageEventsServer } from './vbi/homepage/vbi-events';
import { VbiHomepageFeaturesClient, VbiHomepageFeaturesServer } from './vbi/homepage/vbi-features';
import { VbiHomepageHeroClient, VbiHomepageHeroServer } from './vbi/homepage/vbi-hero/index';
import { VbiHomepageMapClient, VbiHomepageMapServer } from './vbi/homepage/vbi-map';
import VbiPartners from './vbi/partners/index';
import { VbiPartnersList } from './vbi/partners/partner-list';
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
      theme: ScholarHomePage,
      scholarHero: ScholarHomepageHero,
      scholarService: ScholarHomepageService,
      scholarAboutUs: ScholarHomepageAboutUs,
    },
    'about-us': {
      theme: ScholarAboutUs,
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
      vbiBlogs: VbiHomepageBlogsClient,
      vbiEvents: VbiHomepageEventsClient,
      vbiCreators: VbiHomepageCreatorsClient,
      vbiMap: VbiHomepageMapClient,
    },
    'about-us': {
      theme: VbiAboutUs,
      vbiIntro: VbiAboutUsIntro,
      vbiGoal: VbiAboutUsGoal,
    },
    partners: {
      theme: VbiPartners,
      vbiPartnerList: VbiPartnersList,
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
      theme: ScholarHomePage,
      scholarHero: ScholarHomepageHero,
      scholarService: ScholarHomepageService,
      scholarAboutUs: ScholarHomepageAboutUs,
    },
    'about-us': {
      theme: ScholarAboutUs,
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
    },
    partners: {
      theme: VbiPartners,
      vbiPartnerList: VbiPartnersList,
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
} as const;

export { fonts, defaultThemeSystemConfig, getMetadata, initialThemeGlobal, updateGlobalTheme };
