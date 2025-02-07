import { createSection } from '../../../_utils/function';

export const createAcademiaHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  hero: createSection<'homepage', 'hero'>({
    props: {
      title: getThemeTranslation(['homepage', 'hero', 'title']),
      description: getThemeTranslation(['homepage', 'hero', 'description']),
      button: {
        text: getThemeTranslation(['homepage', 'hero', 'button', 'text']),
      },
    },
    order: 0,
  }),
  features: createSection<'homepage', 'features'>({
    props: {
      title: getThemeTranslation(['homepage', 'features', 'title']),
      description: getThemeTranslation(['homepage', 'features', 'description']),
    },
    order: 1,
  }),
  partners: createSection<'homepage', 'partners'>({
    props: {
      title: getThemeTranslation(['homepage', 'partners', 'title']),
      partners: new Array(9).fill({ mime: 'image/png' }),
    },
    order: 2,
  }),
  explores: createSection<'homepage', 'explores'>({
    props: {
      title: getThemeTranslation(['homepage', 'explores', 'title']),
      description: getThemeTranslation(['homepage', 'explores', 'description']),
      btnText: getThemeTranslation(['homepage', 'explores', 'btnText']),
    },
    order: 3,
  }),
  organizations: createSection<'homepage', 'organizations'>({
    props: {
      title: getThemeTranslation(['homepage', 'organizations', 'title']),
      orgs: new Array(8).fill({ name: '', logo: { mime: 'image/png' }, url: '' }),
    },
    order: 4,
  }),
});
