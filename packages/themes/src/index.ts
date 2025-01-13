import { defaultThemeSystemConfig } from './_config/initial';
import { getMetadata } from './_config/theme-metadata';
import type { ThemeRender } from './_types/theme-page';
import {
  AcademiaAboutUs,
  AcademiaAuthLayout,
  AcademiaHomePage,
  AcademiaHomepageExplores,
  AcademiaHomepageFeatures,
  AcademiaHomepageHero,
  AcademiaHomepageOrganizations,
  AcademiaHomepagePartners,
} from './academia';

import { ScholarHomepageAboutUs, ScholarHomepageHero, ScholarHomepageService } from './scholar';

import { updateGlobalTheme } from './_components/theme-settings/theme-global/_utils';
import { initialThemeGlobal } from './_config/theme-global-initial';
import AcademiaForgotPassword from './academia/auth/forgot-password';
import AcademiaLogin from './academia/auth/login';
import AcademiaAuthLayoutSignUp from './academia/auth/sign-up';
import { fonts } from './fonts';
import { ScholarAboutUs, ScholarHomePage } from './scholar';
import { VbiHomepage, VbiHomepageAchievements, VbiHomepageHero, VbiHomepagePartners } from './vbi/index';

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
    auth: {
      theme: AcademiaAuthLayout,
      login: AcademiaLogin,
      signUp: AcademiaAuthLayoutSignUp,
      forgotPassword: AcademiaForgotPassword,
      // emailVerify: AcademiaEmailVerify,
      // authConfirm: AcademiaAuthConfirm,
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
      theme: AcademiaAuthLayout,
      login: AcademiaLogin,
      // signUp: AcademiaAuthLayoutSignUp,
    },
  },
  vbi: {
    homepage: {
      theme: VbiHomepage,
      vbiHero: VbiHomepageHero,
      vbiPartners: VbiHomepagePartners,
      vbiAchievements: VbiHomepageAchievements,
    },
    'about-us': {
      theme: ScholarAboutUs,
    },
    auth: {
      theme: AcademiaAuthLayout,
      login: AcademiaLogin,
      // signUp: AcademiaAuthLayoutSignUp,
    },
  },
} as const;

export { fonts, defaultThemeSystemConfig, getMetadata, initialThemeGlobal, updateGlobalTheme };
