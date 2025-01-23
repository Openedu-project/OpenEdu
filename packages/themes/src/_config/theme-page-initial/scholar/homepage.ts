import { createSection } from '../../../_utils/function';

export const createScholarHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  scholarHero: createSection<'homepage', 'scholarHero'>({
    props: {
      title: getThemeTranslation(['homepage', 'scholarHero', 'title']),
      subTitle: getThemeTranslation(['homepage', 'scholarHero', 'subTitle']),
      bannerMain: { mime: 'image/png' },
      bannerTop: { mime: 'image/png' },
      bannerBottom: { mime: 'image/png' },
      partners: new Array(6).fill({ mime: 'image/png' }),
    },
    order: 0,
  }),
  scholarService: createSection<'homepage', 'scholarService'>({
    props: {
      titleSection: getThemeTranslation(['homepage', 'scholarService', 'titleSection']),
      titleMain: getThemeTranslation(['homepage', 'scholarService', 'titleMain']),
      titleSub: getThemeTranslation(['homepage', 'scholarService', 'titleSub']),
      services: {
        service1: {
          title: getThemeTranslation(['homepage', 'scholarService', 'services.service1.title']),
          description: getThemeTranslation(['homepage', 'scholarService', 'services.service1.description']),
          isHighlighted: false,
        },
        service2: {
          title: getThemeTranslation(['homepage', 'scholarService', 'services.service2.title']),
          description: getThemeTranslation(['homepage', 'scholarService', 'services.service2.description']),
          isHighlighted: true,
        },
        service3: {
          title: getThemeTranslation(['homepage', 'scholarService', 'services.service3.title']),
          description: getThemeTranslation(['homepage', 'scholarService', 'services.service3.description']),
          isHighlighted: false,
        },
        service4: {
          title: getThemeTranslation(['homepage', 'scholarService', 'services.service4.title']),
          description: getThemeTranslation(['homepage', 'scholarService', 'services.service4.description']),
          isHighlighted: false,
        },
      },
    },
    order: 1,
  }),
  scholarAboutUs: createSection<'homepage', 'scholarService'>({
    props: {
      titleSection: getThemeTranslation(['homepage', 'scholarAboutUs', 'titleSection']),
      titleMain: getThemeTranslation(['homepage', 'scholarAboutUs', 'titleMain']),
      titleSub: getThemeTranslation(['homepage', 'scholarAboutUs', 'titleSub']),
      image: { mime: 'image/png' },
      features: {
        feature1: {
          title: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature1.title']),
          description: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature1.description']),
        },
        feature2: {
          title: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature2.title']),
          description: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature2.description']),
        },
        feature3: {
          title: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature3.title']),
          description: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature3.description']),
        },
      },
      stats: {
        stat1: {
          label: getThemeTranslation(['homepage', 'scholarAboutUs', 'stats.stat1.label']),
          value: 728,
        },
        stat2: {
          label: getThemeTranslation(['homepage', 'scholarAboutUs', 'stats.stat2.label']),
          value: 12000,
        },
        stat3: {
          label: getThemeTranslation(['homepage', 'scholarAboutUs', 'stats.stat3.label']),
          value: 5896,
        },
        stat4: {
          label: getThemeTranslation(['homepage', 'scholarAboutUs', 'stats.stat4.label']),
          value: 890000,
        },
      },
    },
    order: 2,
  }),
});
