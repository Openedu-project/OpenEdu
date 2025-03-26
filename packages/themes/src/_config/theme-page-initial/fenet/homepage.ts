import { createSection } from '../../../_utils/function';

export const createFenetHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  fenetHero: createSection<'homepage', 'fenetHero'>({
    props: {
      title: getThemeTranslation(['homepage', 'fenetHero', 'title']),
      subtitle: getThemeTranslation(['homepage', 'fenetHero', 'subtitle']),
      banner: { mime: 'image/png' },
      button: {
        text: getThemeTranslation(['homepage', 'fenetHero', 'button', 'text']),
        link: '/',
      },
      partnerTitle: getThemeTranslation(['homepage', 'fenetHero', 'partnerTitle']),
      partners: new Array(6).fill({ mime: 'image/png' }),
    },
    order: 0,
  }),
  fenetService: createSection<'homepage', 'fenetService'>({
    props: {
      subtitle: getThemeTranslation(['homepage', 'fenetService', 'subtitle']),
      title: getThemeTranslation(['homepage', 'fenetService', 'title']),
      service1: {
        title: getThemeTranslation(['homepage', 'fenetService', 'service1.title']),
        description: getThemeTranslation(['homepage', 'fenetService', 'service1.description']),
        textButton: getThemeTranslation(['homepage', 'fenetService', 'service1.textButton']),
        link: '/',
        isHighlighted: false,
      },
      service2: {
        title: getThemeTranslation(['homepage', 'fenetService', 'service2.title']),
        description: getThemeTranslation(['homepage', 'fenetService', 'service2.description']),
        textButton: getThemeTranslation(['homepage', 'fenetService', 'service1.textButton']),
        link: '/',
        isHighlighted: true,
      },
      service3: {
        title: getThemeTranslation(['homepage', 'fenetService', 'service3.title']),
        description: getThemeTranslation(['homepage', 'fenetService', 'service3.description']),
        textButton: getThemeTranslation(['homepage', 'fenetService', 'service1.textButton']),
        link: '/',
        isHighlighted: false,
      },
    },
    order: 1,
  }),
  fenetFeature: createSection<'homepage', 'fenetFeature'>({
    props: {
      subtitle: getThemeTranslation(['homepage', 'fenetFeature', 'subtitle']),
      title: getThemeTranslation(['homepage', 'fenetFeature', 'title']),
      feature1: {
        title: getThemeTranslation(['homepage', 'fenetFeature', 'feature1.title']),
        description: getThemeTranslation(['homepage', 'fenetFeature', 'feature1.description']),
      },
      feature2: {
        title: getThemeTranslation(['homepage', 'fenetFeature', 'feature2.title']),
        description: getThemeTranslation(['homepage', 'fenetFeature', 'feature2.description']),
      },
      feature3: {
        title: getThemeTranslation(['homepage', 'fenetFeature', 'feature3.title']),
        description: getThemeTranslation(['homepage', 'fenetFeature', 'feature3.description']),
      },
      feature4: {
        title: getThemeTranslation(['homepage', 'fenetFeature', 'feature4.title']),
        description: getThemeTranslation(['homepage', 'fenetFeature', 'feature4.description']),
      },
      image: { mime: 'image/png' },
    },
    order: 2,
  }),
  fenetExperience: createSection<'homepage', 'fenetExperience'>({
    props: {
      title: getThemeTranslation(['homepage', 'fenetExperience', 'title']),
      image: { mime: 'image/png' },
    },
    order: 3,
  }),
});
