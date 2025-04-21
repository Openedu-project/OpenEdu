import { createSection } from '../../../_utils/function';

//Theme step 8: add the initial value to config file with syntax
// ${sectionKey}:  createSection<${page}, ${sectionKey}>({ props: , order})
export const createAiEduHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  aieduHero: createSection<'homepage', 'aieduHero'>({
    // Theme step 9: add the props
    props: {
      title: getThemeTranslation(['homepage', 'aieduHero', 'title']),
      subTitle: getThemeTranslation(['homepage', 'aieduHero', 'titleSub']),
      banner: { mime: 'image/png' },
    },
    // Theme step 10: add the order
    order: 0,
  }),
});
