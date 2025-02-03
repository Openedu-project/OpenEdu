import { createSection } from '../../../_utils/function';

export const createVbiAboutUsConfig = (getThemeTranslation: (path: string[]) => string) => ({
  vbiIntro: createSection<'about-us', 'vbiIntro'>({
    props: {
      name: getThemeTranslation(['about-us', 'vbiIntro', 'name']),
      slogan: getThemeTranslation(['about-us', 'vbiIntro', 'slogan']),
      image: { mime: 'image/png' },
    },
    order: 0,
  }),
  vbiGoal: createSection<'about-us', 'vbiGoal'>({
    props: {
      title: getThemeTranslation(['about-us', 'vbiGoal', 'title']),
      titleSub: getThemeTranslation(['about-us', 'vbiGoal', 'titleSub']),
      mission: {
        title: getThemeTranslation(['about-us', 'vbiGoal', 'mission', 'title']),
        content: getThemeTranslation(['about-us', 'vbiGoal', 'mission', 'content']),
      },
      vision: {
        title: getThemeTranslation(['about-us', 'vbiGoal', 'vision', 'title']),
        content: getThemeTranslation(['about-us', 'vbiGoal', 'vision', 'content']),
      },
    },
    order: 1,
  }),
});
