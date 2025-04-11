import dynamic from 'next/dynamic';
import type { ThemeRender } from '../_types';

export const THEMES_RENDER_CLIENT: ThemeRender = {
  academia: {
    homepage: {
      theme: dynamic(() => import('@oe/themes/academia/homepage/index')),
      hero: dynamic(() => import('@oe/themes/academia/homepage/hero')),
      features: dynamic(() => import('@oe/themes/academia/homepage/features')),
      partners: dynamic(() => import('@oe/themes/academia/homepage/partners')),
      explores: dynamic(() => import('@oe/themes/academia/homepage/explores')),
      organizations: dynamic(() => import('@oe/themes/academia/homepage/organizations')),
    },

    auth: {
      theme: undefined,
      header: dynamic(() => import('@oe/themes/auth/header')),
      footer: dynamic(() => import('@oe/themes/auth/footer')),
      login: dynamic(() => import('@oe/themes/auth/login')),
      signUp: dynamic(() => import('@oe/themes/auth/sign-up')),
      forgotPassword: dynamic(() => import('@oe/themes/auth/forgot-password')),
    },
  },
  scholar: {
    homepage: {
      theme: dynamic(() => import('@oe/themes/scholar/homepage/index')),
      scholarHero: dynamic(() => import('@oe/themes/scholar/homepage/hero/hero')),
      scholarService: dynamic(() => import('@oe/themes/scholar/homepage/service/service')),
      scholarAboutUs: dynamic(() => import('@oe/themes/scholar/homepage/about-us/about-us')),
      scholarAchievements: dynamic(() => import('@oe/themes/scholar/homepage/achievements/achievements')),
      scholarTeam: dynamic(() => import('@oe/themes/scholar/homepage/team/team')),
      scholarProjects: dynamic(() => import('@oe/themes/scholar/homepage/projects/projects')),
      scholarTestimonials: dynamic(() => import('@oe/themes/scholar/homepage/testimonials/testimonials')),
      scholarContact: dynamic(() => import('@oe/themes/scholar/homepage/contact/contact')),
    },
    auth: {
      theme: undefined,
      header: dynamic(() => import('@oe/themes/auth/header')),
      footer: dynamic(() => import('@oe/themes/auth/footer')),
      login: dynamic(() => import('@oe/themes/auth/login')),
      signUp: dynamic(() => import('@oe/themes/auth/sign-up')),
      forgotPassword: dynamic(() => import('@oe/themes/auth/forgot-password')),
    },
  },
  vbi: {
    homepage: {
      theme: dynamic(() => import('@oe/themes/vbi/homepage/index')),
      vbiHero: dynamic(() => import('@oe/themes/vbi/homepage/vbi-hero/vbi-hero-client')),
      vbiAchievements: dynamic(() => import('@oe/themes/vbi/homepage/vbi-achievements/client')),
      vbiCourses: dynamic(() => import('@oe/themes/vbi/homepage/vbi-courses/client')),
      vbiCert: dynamic(() => import('@oe/themes/vbi/homepage/vbi-cert/client')),
      vbiFeatures: dynamic(() => import('@oe/themes/vbi/homepage/vbi-features/client')),
      vbiBlogs: dynamic(() => import('@oe/themes/vbi/homepage/vbi-blogs/vbi-blogs')),
      vbiEvents: dynamic(() => import('@oe/themes/vbi/homepage/vbi-events/client')),
      vbiCreators: dynamic(() => import('@oe/themes/vbi/homepage/vbi-creators/client')),
      vbiMap: dynamic(() => import('@oe/themes/vbi/homepage/vbi-map/client')),
    },
    'about-us': {
      theme: dynamic(() => import('@oe/themes/vbi/about-us/index')),
      vbiIntro: dynamic(() => import('@oe/themes/vbi/about-us/intro/intro')),
      vbiGoal: dynamic(() => import('@oe/themes/vbi/about-us/goal/goal')),
      vbiCore: dynamic(() => import('@oe/themes/vbi/about-us/core/core')),
    },
    partners: {
      theme: dynamic(() => import('@oe/themes/vbi/partners/index')),
      vbiPartnerList: dynamic(() =>
        import('@oe/themes/vbi/partners/partner-list/index').then(mod => ({
          default: mod.VbiPartnersList,
        }))
      ),
      vbiShowcase: dynamic(() =>
        import('@oe/themes/vbi/partners/showcase/index').then(mod => ({
          default: mod.VbiPartnersShowcase,
        }))
      ),
      vbiTesti: dynamic(() =>
        import('@oe/themes/vbi/partners/testimonials/index').then(mod => ({
          default: mod.VbiPartnersTesti,
        }))
      ),
      vbiPartnerFeatures: dynamic(() =>
        import('@oe/themes/vbi/partners/features/index').then(mod => ({
          default: mod.VbiPartnerFeaturesClient,
        }))
      ),
      vbiCta: dynamic(() =>
        import('@oe/themes/vbi/partners/cta/index').then(mod => ({
          default: mod.VbiPartnersCta,
        }))
      ),
    },
    auth: {
      theme: undefined,
      header: dynamic(() => import('@oe/themes/auth/header')),
      footer: dynamic(() => import('@oe/themes/auth/footer')),
      login: dynamic(() => import('@oe/themes/auth/login')),
      signUp: dynamic(() => import('@oe/themes/auth/sign-up')),
      forgotPassword: dynamic(() => import('@oe/themes/auth/forgot-password')),
    },
  },
  avail: {
    homepage: {
      theme: dynamic(() => import('@oe/themes/avail/homepage/index')),
      availHero: dynamic(() => import('@oe/themes/avail/homepage/avail-hero/avail-hero')),
      availFeature: dynamic(() => import('@oe/themes/avail/homepage/avail-feature/avail-feature')),
      availCourses: dynamic(() => import('@oe/themes/avail/homepage/avail-courses/avail-courses-client')),
      availSolution: dynamic(() => import('@oe/themes/avail/homepage/avail-solution/avail-solution')),
      availEco: dynamic(() => import('@oe/themes/avail/homepage/avail-eco/avail-eco')),
      availBlogs: dynamic(() => import('@oe/themes/avail/homepage/avail-blogs/blog-client')),
    },
    auth: {
      theme: undefined,
      header: dynamic(() => import('@oe/themes/auth/header')),
      footer: dynamic(() => import('@oe/themes/auth/footer')),
      login: dynamic(() => import('@oe/themes/auth/login')),
      signUp: dynamic(() => import('@oe/themes/auth/sign-up')),
      forgotPassword: dynamic(() => import('@oe/themes/auth/forgot-password')),
    },
  },
  fenet: {
    homepage: {
      theme: dynamic(() => import('@oe/themes/fenet/homepage/index')),
      fenetHero: dynamic(() => import('@oe/themes/fenet/homepage/hero/hero')),
      fenetService: dynamic(() => import('@oe/themes/fenet/homepage/service/service')),
      fenetFeature: dynamic(() => import('@oe/themes/fenet/homepage/feature/feature')),
      fenetExperience: dynamic(() => import('@oe/themes/fenet/homepage/experience/experience')),
      fenetCustomer: dynamic(() => import('@oe/themes/fenet/homepage/customer/customer')),
      fenetExpert: dynamic(() => import('@oe/themes/fenet/homepage/expert/expert')),
      fenetPrice: dynamic(() => import('@oe/themes/fenet/homepage/price/price')),
      fenetBlog: dynamic(() => import('@oe/themes/fenet/homepage/blog/blog')),
    },
    auth: {
      theme: undefined,
      header: dynamic(() => import('@oe/themes/auth/header')),
      footer: dynamic(() => import('@oe/themes/auth/footer')),
      login: dynamic(() => import('@oe/themes/auth/login')),
      signUp: dynamic(() => import('@oe/themes/auth/sign-up')),
      forgotPassword: dynamic(() => import('@oe/themes/auth/forgot-password')),
    },
  },
} as const;
