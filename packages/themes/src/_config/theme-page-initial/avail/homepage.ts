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
  availSolution: createSection<'homepage', 'availSolution'>({
    props: {
      banner: { mime: 'image/png' },
      solutions: {
        'solutions-0': {
          name: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-0', 'name']),
          description: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-0', 'description']),
          icon: { mime: 'image/png' },
        },
        'solutions-1': {
          name: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-1', 'name']),
          description: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-1', 'description']),
          icon: { mime: 'image/png' },
        },
        'solutions-2': {
          name: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-2', 'name']),
          description: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-2', 'description']),
          icon: { mime: 'image/png' },
        },
        'solutions-3': {
          name: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-3', 'name']),
          description: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-3', 'description']),
          icon: { mime: 'image/png' },
        },
        'solutions-4': {
          name: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-4', 'name']),
          description: getThemeTranslation(['homepage', 'availSolution', 'solutions', 'solutions-4', 'description']),
          icon: { mime: 'image/png' },
        },
      },
      carouselTitle: getThemeTranslation(['homepage', 'availSolution', 'carouselTitle']),
      button: {
        text: getThemeTranslation(['homepage', 'availSolution', 'button', 'text']),
        link: '/',
      },
      carousels: new Array(5).fill({ mime: 'image/png' }),
    },
    order: 3,
  }),
  availEco: createSection<'homepage', 'availEco'>({
    props: {
      title: getThemeTranslation(['homepage', 'availEco', 'title']),
      section1: {
        title: getThemeTranslation(['homepage', 'availEco', 'section1', 'title']),
        partners: new Array(48).fill({ mime: 'image/png' }),
      },
      section2: {
        title: getThemeTranslation(['homepage', 'availEco', 'section2', 'title']),
        partners: new Array(13).fill({ mime: 'image/png' }),
      },
    },
    order: 4,
  }),
  availBlogs: createSection<'homepage', 'availBlogs'>({
    props: {
      title: getThemeTranslation(['homepage', 'availBlogs', 'title']),
      button: {
        text: getThemeTranslation(['homepage', 'availBlogs', 'button', 'text']),
        link: '/',
      },
    },
    order: 5,
  }),
});
