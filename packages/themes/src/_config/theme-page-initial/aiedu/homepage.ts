import { createSection } from '../../../_utils/function';

//Theme step 8: add the initial value to config file with syntax
// ${sectionKey}:  createSection<${page}, ${sectionKey}>({ props: , order})
export const createAiEduHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  aieduHero: createSection<'homepage', 'aieduHero'>({
    // Theme step 9: add the props
    props: {
      title: getThemeTranslation(['homepage', 'aieduHero', 'title']),
      description: getThemeTranslation(['homepage', 'aieduHero', 'description']),
      button: {
        text: getThemeTranslation(['homepage', 'aieduHero', 'button', 'text']),
        link: '/',
      },
      banner: { mime: 'image/png' },
      partners: new Array(6).fill({ mime: 'image/png' }),
    },
    // Theme step 10: add the order
    order: 0,
  }),
  aieduExpert: createSection<'homepage', 'aieduExpert'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduExpert', 'title']),
      description: getThemeTranslation(['homepage', 'aieduExpert', 'description']),
      expert1: {
        name: getThemeTranslation(['homepage', 'aieduExpert', 'expert1.name']),
        role: getThemeTranslation(['homepage', 'aieduExpert', 'expert1.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://',
          x: 'https://',
          linkedin: 'https://',
        },
      },
      expert2: {
        name: getThemeTranslation(['homepage', 'aieduExpert', 'expert2.name']),
        role: getThemeTranslation(['homepage', 'aieduExpert', 'expert2.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://',
          x: 'https://',
          linkedin: 'https://',
        },
      },
      expert3: {
        name: getThemeTranslation(['homepage', 'aieduExpert', 'expert3.name']),
        role: getThemeTranslation(['homepage', 'aieduExpert', 'expert3.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://www.facebook.com/',
          x: 'https://',
          linkedin: 'https://',
        },
      },
    },
    order: 1,
  }),
  aieduFeatures: createSection<'homepage', 'aieduFeatures'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduFeatures', 'title']),
      images: { mime: 'image/png' },
      button: {
        text: getThemeTranslation(['homepage', 'aieduFeatures', 'button', 'text']),
        link: '/',
      },
      partners: new Array(6).fill({ mime: 'image/png' }),
      modules: new Array(5).map(index =>
        getThemeTranslation(['homepage', 'aieduFeatures', 'modules', `module${index + 1}`])
      ),
      benefits: new Array(4).map(index =>
        getThemeTranslation(['homepage', 'aieduFeatures', 'benefit', `benefit${index + 1}`])
      ),
    },
    order: 2,
  }),
  aieduDashboard: createSection<'homepage', 'aieduDashboard'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduDashboard', 'title']),
      totalStats: {
        registrations: 10000000,
        certificates: 5000000,
      },
      button: {
        text: getThemeTranslation(['homepage', 'aieduDashboard', 'button', 'text']),
        link: '/',
      },
      topCities: {
        silver: {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'topCities', 'silver', 'name']),
          registrations: 1000000,
          certificates: 600000,
        },
        gold: {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'topCities', 'gold', 'name']),
          registrations: 1500000,
          certificates: 800000,
        },
        bronze: {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'topCities', 'bronze', 'name']),
          registrations: 800000,
          certificates: 500000,
        },
      },
      otherCities: [
        {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'otherCities', 'city3', 'name']),
          registrations: 800000,
          certificates: 300000,
        },
        {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'otherCities', 'city4', 'name']),
          registrations: 800000,
          certificates: 300000,
        },
        {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'otherCities', 'city5', 'name']),
          registrations: 800000,
          certificates: 300000,
        },
        {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'otherCities', 'city6', 'name']),
          registrations: 800000,
          certificates: 300000,
        },
        {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'otherCities', 'city7', 'name']),
          registrations: 800000,
          certificates: 300000,
        },
        {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'otherCities', 'city8', 'name']),
          registrations: 800000,
          certificates: 300000,
        },
        {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'otherCities', 'city9', 'name']),
          registrations: 800000,
          certificates: 300000,
        },
        {
          name: getThemeTranslation(['homepage', 'aieduDashboard', 'otherCities', 'city10', 'name']),
          registrations: 800000,
          certificates: 300000,
        },
      ],
    },
    order: 3,
  }),
  aieduBlog: createSection<'homepage', 'aieduBlog'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduBlog', 'title']),
      button: {
        text: getThemeTranslation(['homepage', 'aieduBlog', 'button', 'text']),
        link: '/',
      },
    },
    order: 4,
  }),
  aieduCert: createSection<'homepage', 'aieduCert'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduCert', 'title']),
      button: {
        text: getThemeTranslation(['homepage', 'aieduCert', 'button', 'text']),
        link: '/',
      },
      banner: { mime: 'image/png' },
      coursePanel: {
        title: getThemeTranslation(['homepage', 'aieduCert', 'coursePanel', 'title']),
        requirements: [
          getThemeTranslation(['homepage', 'aieduCert', 'coursePanel', 'requirements', 'requirement1']),
          getThemeTranslation(['homepage', 'aieduCert', 'coursePanel', 'requirements', 'requirement2']),
          getThemeTranslation(['homepage', 'aieduCert', 'coursePanel', 'requirements', 'requirement3']),
        ],
      },
    },
    order: 5,
  }),
  aieduGuide: createSection<'homepage', 'aieduGuide'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduGuide', 'title']),
      image: { mime: 'image/png' },
      steps: [
        getThemeTranslation(['homepage', 'aieduGuide', 'steps', 'step1']),
        getThemeTranslation(['homepage', 'aieduGuide', 'steps', 'step2']),
        getThemeTranslation(['homepage', 'aieduGuide', 'steps', 'step3']),
      ],
    },
    order: 6,
  }),
  aieduSponsors: createSection<'homepage', 'aieduSponsors'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduSponsors', 'title']),
      sponsorImages: new Array(16).fill({ mime: 'image/png' }),
      mediaImages: new Array(16).fill({ mime: 'image/png' }),
      sponsorLabel: getThemeTranslation(['homepage', 'aieduSponsors', 'sponsorLabel']),
      mediaLabel: getThemeTranslation(['homepage', 'aieduSponsors', 'mediaLabel']),
    },
    order: 7,
  }),
  aieduGallery: createSection<'homepage', 'aieduGallery'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduGallery', 'title']),
      image: { mime: 'image/png' },
    },
    order: 8,
  }),
});
