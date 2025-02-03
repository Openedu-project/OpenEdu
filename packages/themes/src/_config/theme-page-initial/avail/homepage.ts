import { createSection } from '../../../_utils/function';

export const createAvailHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  availHero: createSection<'homepage', 'availHero'>({
    props: {
      title: getThemeTranslation(['homepage', 'availHero', 'title']),
      subTitle: getThemeTranslation(['homepage', 'availHero', 'titleSub']),
      banner: { mime: 'image/png' },
    },
    order: 0,
  }),
  availFeature: createSection<'homepage', 'availFeature'>({
    props: {
      title: getThemeTranslation(['homepage', 'availFeature', 'title']),
      subTitle: getThemeTranslation(['homepage', 'availFeature', 'titleSub']),
      features: {
        da: {
          image: { mime: 'image/png' },
          textImg: { mime: 'image/png' },
          description: getThemeTranslation(['homepage', 'availFeature', 'features', 'da', 'description']),
        },
        nexus: {
          image: { mime: 'image/png' },
          textImg: { mime: 'image/png' },
          description: getThemeTranslation(['homepage', 'availFeature', 'features', 'nexus', 'description']),
        },
        fusion: {
          image: { mime: 'image/png' },
          textImg: { mime: 'image/png' },
          description: getThemeTranslation(['homepage', 'availFeature', 'features', 'fusion', 'description']),
        },
      },
    },
    order: 1,
  }),
  availCourses: createSection<'homepage', 'availCourses'>({
    props: {
      title: getThemeTranslation(['homepage', 'availCourses', 'title']),
      button: {
        text: getThemeTranslation(['homepage', 'availCourses', 'button', 'text']),
        link: '/',
      },
    },
    order: 2,
  }),
});
