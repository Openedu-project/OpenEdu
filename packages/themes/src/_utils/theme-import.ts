import dynamic from 'next/dynamic';
import type { ThemeRender } from '../_types';

export const THEMES_RENDER_CLIENT: ThemeRender = {
  academia: {
    homepage: {
      theme: dynamic(() =>
        import('../academia/homepage').then(mod => ({
          default: mod.AcademiaHomepage,
        }))
      ),
      hero: dynamic(() =>
        import('../academia/homepage/hero').then(mod => ({
          default: mod.AcademiaHomepageHero,
        }))
      ),
      features: dynamic(() =>
        import('../academia/homepage/features').then(mod => ({
          default: mod.AcademiaHomepageFeatures,
        }))
      ),
      partners: dynamic(() =>
        import('../academia/homepage/partners').then(mod => ({
          default: mod.AcademiaHomepagePartners,
        }))
      ),
      organizations: dynamic(() =>
        import('../academia/homepage/organizations').then(mod => ({
          default: mod.AcademiaHomepageOrganizations,
        }))
      ),
    },

    auth: {
      theme: undefined,
      header: dynamic(() =>
        import('../auth/header').then(mod => ({
          default: mod.ThemeHeader,
        }))
      ),
      footer: dynamic(() =>
        import('../auth/footer').then(mod => ({
          default: mod.ThemeFooter,
        }))
      ),
      login: dynamic(() =>
        import('../auth/login').then(mod => ({
          default: mod.AuthLayoutLogin,
        }))
      ),
      signUp: dynamic(() =>
        import('../auth/sign-up').then(mod => ({
          default: mod.AuthLayoutSignUp,
        }))
      ),
    },
  },
  scholar: {
    homepage: {
      theme: dynamic(() =>
        import('../scholar/homepage/index').then(mod => ({
          default: mod.ScholarHomepage,
        }))
      ),
      scholarHero: dynamic(() =>
        import('../scholar/homepage/hero/hero').then(mod => ({
          default: mod.ScholarHomepageHero,
        }))
      ),
      scholarService: dynamic(() =>
        import('../scholar/homepage/service/service').then(mod => ({
          default: mod.ScholarHomepageService,
        }))
      ),
      scholarAboutUs: dynamic(() =>
        import('../scholar/homepage/about-us/about-us').then(mod => ({
          default: mod.ScholarHomepageAboutUs,
        }))
      ),
      scholarTeam: dynamic(() =>
        import('../scholar/homepage/team/team').then(mod => ({
          default: mod.ScholarHomepageTeam,
        }))
      ),
      scholarProjects: dynamic(() =>
        import('../scholar/homepage/projects/projects').then(mod => ({
          default: mod.ScholarHomepageProjects,
        }))
      ),
      scholarTestimonials: dynamic(() =>
        import('../scholar/homepage/testimonials/testimonials').then(mod => ({
          default: mod.ScholarHomepageTestimonials,
        }))
      ),
      scholarContact: dynamic(() =>
        import('../scholar/homepage/contact/contact').then(mod => ({
          default: mod.ScholarHomepageContact,
        }))
      ),
    },
    auth: {
      theme: undefined,
      header: dynamic(() =>
        import('../auth/header').then(mod => ({
          default: mod.ThemeHeader,
        }))
      ),
      footer: dynamic(() =>
        import('../auth/footer').then(mod => ({
          default: mod.ThemeFooter,
        }))
      ),
      login: dynamic(() =>
        import('../auth/login').then(mod => ({
          default: mod.AuthLayoutLogin,
        }))
      ),
      signUp: dynamic(() =>
        import('../auth/sign-up').then(mod => ({
          default: mod.AuthLayoutSignUp,
        }))
      ),
      forgotPassword: dynamic(() =>
        import('../auth/forgot-password').then(mod => ({
          default: mod.AuthLayoutForgotPassword,
        }))
      ),
    },
  },
  vbi: {
    homepage: {
      theme: dynamic(() =>
        import('../vbi/homepage/index').then(mod => ({
          default: mod.VbiHomepage,
        }))
      ),
      vbiHero: dynamic(() =>
        import('../vbi/homepage/vbi-hero/vbi-hero-client').then(mod => ({
          default: mod.VbiHomepageHeroClient,
        }))
      ),
      vbiAchievements: dynamic(() =>
        import('../vbi/homepage/vbi-achievements/client').then(mod => ({
          default: mod.VbiHomepageAchievementsClient,
        }))
      ),
      vbiCourses: dynamic(() =>
        import('../vbi/homepage/vbi-courses/client').then(mod => ({
          default: mod.VbiHomepageCoursesClient,
        }))
      ),
      vbiCert: dynamic(() =>
        import('../vbi/homepage/vbi-cert/client').then(mod => ({
          default: mod.VbiHomepageCertClient,
        }))
      ),
      vbiFeatures: dynamic(() =>
        import('../vbi/homepage/vbi-features/client').then(mod => ({
          default: mod.VbiHomepageFeaturesClient,
        }))
      ),
      vbiBlogs: dynamic(() =>
        import('../vbi/homepage/vbi-blogs/vbi-blogs').then(mod => ({
          default: mod.VbiHomepageBlogs,
        }))
      ),
      vbiEvents: dynamic(() =>
        import('../vbi/homepage/vbi-events/client').then(mod => ({
          default: mod.VbiHomepageEventsClient,
        }))
      ),
      vbiCreators: dynamic(() =>
        import('../vbi/homepage/vbi-creators/client').then(mod => ({
          default: mod.VbiHomepageCreatorsClient,
        }))
      ),
      vbiMap: dynamic(() =>
        import('../vbi/homepage/vbi-map/client').then(mod => ({
          default: mod.VbiHomepageMapClient,
        }))
      ),
    },
    'about-us': {
      theme: dynamic(() =>
        import('../vbi/about-us/index').then(mod => ({
          default: mod.VbiAboutUs,
        }))
      ),
      vbiIntro: dynamic(() =>
        import('../vbi/about-us/intro/intro').then(mod => ({
          default: mod.VbiAboutUsIntro,
        }))
      ),
      vbiGoal: dynamic(() =>
        import('../vbi/about-us/goal/goal').then(mod => ({
          default: mod.VbiAboutUsGoal,
        }))
      ),
      vbiCore: dynamic(() =>
        import('../vbi/about-us/core/core').then(mod => ({
          default: mod.VbiAboutUsCore,
        }))
      ),
    },
    partners: {
      theme: dynamic(() =>
        import('../vbi/partners/index').then(mod => ({
          default: mod.VbiPartners,
        }))
      ),
      vbiPartnerList: dynamic(() =>
        import('../vbi/partners/partner-list/index').then(mod => ({
          default: mod.VbiPartnersList,
        }))
      ),
      vbiShowcase: dynamic(() =>
        import('../vbi/partners/showcase/index').then(mod => ({
          default: mod.VbiPartnersShowcase,
        }))
      ),
      vbiTesti: dynamic(() =>
        import('../vbi/partners/testimonials/index').then(mod => ({
          default: mod.VbiPartnersTesti,
        }))
      ),
      vbiPartnerFeatures: dynamic(() =>
        import('../vbi/partners/features/index').then(mod => ({
          default: mod.VbiPartnerFeaturesClient,
        }))
      ),
      vbiCta: dynamic(() =>
        import('../vbi/partners/cta/index').then(mod => ({
          default: mod.VbiPartnersCta,
        }))
      ),
    },
    auth: {
      theme: undefined,
      header: dynamic(() =>
        import('../auth/header').then(mod => ({
          default: mod.ThemeHeader,
        }))
      ),
      footer: dynamic(() =>
        import('../auth/footer').then(mod => ({
          default: mod.ThemeFooter,
        }))
      ),
      login: dynamic(() =>
        import('../auth/login').then(mod => ({
          default: mod.AuthLayoutLogin,
        }))
      ),
      signUp: dynamic(() =>
        import('../auth/sign-up').then(mod => ({
          default: mod.AuthLayoutSignUp,
        }))
      ),
    },
  },
  avail: {
    homepage: {
      theme: dynamic(() =>
        import('../avail/homepage/index').then(mod => ({
          default: mod.AvailHomepage,
        }))
      ),
      availHero: dynamic(() =>
        import('../avail/homepage/avail-hero/avail-hero').then(mod => ({
          default: mod.AvailHomepageHero,
        }))
      ),
      availFeature: dynamic(() =>
        import('../avail/homepage/avail-feature/avail-feature').then(mod => ({
          default: mod.AvailHomepageFeature,
        }))
      ),
      availCourses: dynamic(() =>
        import('../avail/homepage/avail-courses/avail-courses-client').then(mod => ({
          default: mod.AvailHomepageCoursesClient,
        }))
      ),
      availSolution: dynamic(() =>
        import('../avail/homepage/avail-solution/avail-solution').then(mod => ({
          default: mod.AvailHomepageSolution,
        }))
      ),
      availEco: dynamic(() =>
        import('../avail/homepage/avail-eco/avail-eco').then(mod => ({
          default: mod.AvailHomepageEco,
        }))
      ),
      availBlogs: dynamic(() =>
        import('../avail/homepage/avail-blogs/blog-client').then(mod => ({
          default: mod.AvailHomepageBlogsClient,
        }))
      ),
    },
    auth: {
      theme: undefined,
      header: dynamic(() =>
        import('../auth/header').then(mod => ({
          default: mod.ThemeHeader,
        }))
      ),
      footer: dynamic(() =>
        import('../auth/footer').then(mod => ({
          default: mod.ThemeFooter,
        }))
      ),
      login: dynamic(() =>
        import('../auth/login').then(mod => ({
          default: mod.AuthLayoutLogin,
        }))
      ),
      signUp: dynamic(() =>
        import('../auth/sign-up').then(mod => ({
          default: mod.AuthLayoutSignUp,
        }))
      ),
    },
  },
  fenet: {
    homepage: {
      theme: dynamic(() =>
        import('../fenet/homepage/index').then(mod => ({
          default: mod.FenetHomepage,
        }))
      ),
      fenetHero: dynamic(() =>
        import('../fenet/homepage/hero/hero').then(mod => ({
          default: mod.FenetHomepageHero,
        }))
      ),
      fenetService: dynamic(() =>
        import('../fenet/homepage/service/service').then(mod => ({
          default: mod.FenetHomepageService,
        }))
      ),
      fenetFeature: dynamic(() =>
        import('../fenet/homepage/feature/feature').then(mod => ({
          default: mod.FenetHomepageFeature,
        }))
      ),
      fenetExperience: dynamic(() =>
        import('../fenet/homepage/experience/experience').then(mod => ({
          default: mod.FenetHomepageExperience,
        }))
      ),
      fenetCustomer: dynamic(() =>
        import('../fenet/homepage/customer/customer').then(mod => ({
          default: mod.FenetHomepageCustomer,
        }))
      ),
      fenetExpert: dynamic(() =>
        import('../fenet/homepage/expert/expert').then(mod => ({
          default: mod.FenetHomepageExpert,
        }))
      ),
      fenetPrice: dynamic(() =>
        import('../fenet/homepage/price/price').then(mod => ({
          default: mod.FenetHomepagePrice,
        }))
      ),
      fenetBlog: dynamic(() =>
        import('../fenet/homepage/blog/blog').then(mod => ({
          default: mod.FenetHomepageBlog,
        }))
      ),
    },
    auth: {
      theme: undefined,
      header: dynamic(() =>
        import('../auth/header').then(mod => ({
          default: mod.ThemeHeader,
        }))
      ),
      footer: dynamic(() =>
        import('../auth/footer').then(mod => ({
          default: mod.ThemeFooter,
        }))
      ),
      login: dynamic(() =>
        import('../auth/login').then(mod => ({
          default: mod.AuthLayoutLogin,
        }))
      ),
      signUp: dynamic(() =>
        import('../auth/sign-up').then(mod => ({
          default: mod.AuthLayoutSignUp,
        }))
      ),
    },
  },
  // Theme step 26 : add section at render_client that supports the preview feature
  aiedu: {
    homepage: {
      theme: dynamic(() =>
        import('../aiedu/homepage/index').then(mod => ({
          default: mod.AieduHomepage,
        }))
      ),
      aieduHero: dynamic(() =>
        import('../aiedu/homepage/aiedu-hero/aiedu-hero').then(mod => ({
          default: mod.AieduHomepageHero,
        }))
      ),
      aieduFeatures: dynamic(() =>
        import('../aiedu/homepage/aiedu-features/features').then(mod => ({ default: mod.AieduHomepageFeatures }))
      ),
      // aieduExpert: dynamic(() =>
      //   import('../aiedu/homepage/aiedu-expert/expert').then(mod => ({ default: mod.AieduHomepageExpert }))
      // ),
      aieduTeacher: dynamic(() =>
        import('../aiedu/homepage/aiedu-teacher/teacher').then(mod => ({ default: mod.AieduHomepageTeacher }))
      ),
      aieduMentor: dynamic(() =>
        import('../aiedu/homepage/aiedu-mentor/mentor').then(mod => ({ default: mod.AieduHomepageMentor }))
      ),
      aieduDashboard: dynamic(() =>
        import('../aiedu/homepage/aiedu-dashboard/dashboard-client').then(mod => ({
          default: mod.AieduHomepageDashboardClient,
        }))
      ),
      aieduBlog: dynamic(() =>
        import('../aiedu/homepage/aiedu-blog/aiedu-blog-client').then(mod => ({ default: mod.AieduHomepageBlogClient }))
      ),
      aieduCert: dynamic(() =>
        import('../aiedu/homepage/aiedu-cert/cert').then(mod => ({ default: mod.AieduHomepageCert }))
      ),
      aieduGuide: dynamic(() =>
        import('../aiedu/homepage/aiedu-guide/guide').then(mod => ({ default: mod.AieduHomepageGuide }))
      ),
      aieduSponsors: dynamic(() =>
        import('../aiedu/homepage/aiedu-sponsors/sponsors').then(mod => ({ default: mod.AieduHomepageSponsors }))
      ),
      aieduGallery: dynamic(() =>
        import('../aiedu/homepage/aiedu-gallery/gallery').then(mod => ({ default: mod.AieduHomepageGallery }))
      ),
    },
    introduction: {
      theme: dynamic(() =>
        import('../aiedu/introduction/index').then(mod => ({
          default: mod.AieduIntroductionPage,
        }))
      ),
      aieduGoal: dynamic(() =>
        import('../aiedu/introduction/aiedu-goal/goal').then(mod => ({
          default: mod.AieduIntroductionGoal,
        }))
      ),
      aieduVisionMission: dynamic(() =>
        import('../aiedu/introduction/aiedu-vision-mission/vision-mission').then(mod => ({
          default: mod.AieduIntroductionVisionMission,
        }))
      ),
      aieduFeatures: dynamic(() =>
        import('../aiedu/introduction/aiedu-features/features').then(mod => ({
          default: mod.AieduIntroductionFeatures,
        }))
      ),
      // aieduExpert: dynamic(() =>
      //   import('../aiedu/introduction/aiedu-expert/expert').then(mod => ({ default: mod.AieduIntroductionExpert }))
      // ),
      aieduTeacher: dynamic(() =>
        import('../aiedu/introduction/aiedu-teacher/teacher').then(mod => ({ default: mod.AieduIntroductionTeacher }))
      ),
      aieduMentor: dynamic(() =>
        import('../aiedu/introduction/aiedu-mentor/mentor').then(mod => ({ default: mod.AieduIntroductionMentor }))
      ),
      aieduMap: dynamic(() =>
        import('../aiedu/introduction/aiedu-map/map').then(mod => ({ default: mod.AieduIntroductionMap }))
      ),
      aieduTrend: dynamic(() =>
        import('../aiedu/introduction/aiedu-trend/trend').then(mod => ({ default: mod.AieduIntroductionTrend }))
      ),
      aieduBenefit: dynamic(() =>
        import('../aiedu/introduction/aiedu-benefit/benefit').then(mod => ({ default: mod.AieduIntroductionBenefit }))
      ),
    },
    auth: {
      theme: undefined,
      header: dynamic(() =>
        import('../auth/header').then(mod => ({
          default: mod.ThemeHeader,
        }))
      ),
      footer: dynamic(() =>
        import('../auth/footer').then(mod => ({
          default: mod.ThemeFooter,
        }))
      ),
      login: dynamic(() =>
        import('../auth/login').then(mod => ({
          default: mod.AuthLayoutLogin,
        }))
      ),
      signUp: dynamic(() =>
        import('../auth/sign-up').then(mod => ({
          default: mod.AuthLayoutSignUp,
        }))
      ),
    },
    ranking: {
      theme: dynamic(() =>
        import('../aiedu/ranking/index').then(mod => ({
          default: mod.AieduRankingPage,
        }))
      ),

      aieduDashboard: dynamic(() =>
        import('../aiedu/ranking/aiedu-dashboard/dashboard-client').then(mod => ({
          default: mod.AieduRankingDashboardClient,
        }))
      ),
    },
  },
} as const;
