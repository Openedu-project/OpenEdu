import { createSection } from '../../../_utils/function';

export const createVbiPartnersConfig = (getThemeTranslation: (path: string[]) => string) => ({
  vbiPartnerList: createSection<'partners', 'vbiPartnerList'>({
    props: {
      title: getThemeTranslation(['partners', 'vbiPartnerList', 'title']),
      titleSub: getThemeTranslation(['partners', 'vbiPartnerList', 'titleSub']),
    },
    order: 0,
  }),
  vbiShowcase: createSection<'partners', 'vbiShowcase'>({
    props: {
      title: getThemeTranslation(['partners', 'vbiShowcase', 'title']),
      titleSub: getThemeTranslation(['partners', 'vbiShowcase', 'titleSub']),
      projects: {
        project1: {
          title: getThemeTranslation(['partners', 'vbiShowcase', 'projects', 'project1', 'title']),
          description: getThemeTranslation(['partners', 'vbiShowcase', 'projects', 'project1', 'description']),
          image: { mime: 'image/png' },
          stats: {
            stat1: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project1',
                'stats',
                'stat1',
                'label',
              ]),
              value: 2100,
            },
            stat2: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project1',
                'stats',
                'stat2',
                'label',
              ]),
              value: 2100,
            },
            stat3: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project1',
                'stats',
                'stat3',
                'label',
              ]),
              value: 2100,
            },
          },
        },
        project2: {
          title: getThemeTranslation(['partners', 'vbiShowcase', 'projects', 'project2', 'title']),
          description: getThemeTranslation(['partners', 'vbiShowcase', 'projects', 'project2', 'description']),
          image: { mime: 'image/png' },
          stats: {
            stat1: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project2',
                'stats',
                'stat1',
                'label',
              ]),
              value: 2100,
            },
            stat2: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project2',
                'stats',
                'stat2',
                'label',
              ]),
              value: 2100,
            },
            stat3: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project2',
                'stats',
                'stat3',
                'label',
              ]),
              value: 2100,
            },
          },
        },
        project3: {
          title: getThemeTranslation(['partners', 'vbiShowcase', 'projects', 'project3', 'title']),
          description: getThemeTranslation(['partners', 'vbiShowcase', 'projects', 'project3', 'description']),
          image: { mime: 'image/png' },
          stats: {
            stat1: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project3',
                'stats',
                'stat1',
                'label',
              ]),
              value: 2100,
            },
            stat2: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project3',
                'stats',
                'stat2',
                'label',
              ]),
              value: 2100,
            },
            stat3: {
              label: getThemeTranslation([
                'partners',
                'vbiShowcase',
                'projects',
                'project3',
                'stats',
                'stat3',
                'label',
              ]),
              value: 2100,
            },
          },
        },
      },
    },
    order: 1,
  }),
  vbiTesti: createSection<'partners', 'vbiTesti'>({
    props: {
      title: getThemeTranslation(['partners', 'vbiTesti', 'title']),
      titleSub: getThemeTranslation(['partners', 'vbiTesti', 'titleSub']),
      button: {
        text: getThemeTranslation(['partners', 'vbiTesti', 'button', 'text']),
        link: '/',
      },
      partners: {
        partner1: {
          content: getThemeTranslation(['partners', 'vbiTesti', 'partners', 'partner1', 'content']),
          authorName: getThemeTranslation(['partners', 'vbiTesti', 'partners', 'partner1', 'authorName']),
          authorRole: getThemeTranslation(['partners', 'vbiTesti', 'partners', 'partner1', 'authorRole']),
          logo: { mime: 'image/png' },
          author: { mime: 'image/png' },
        },
        partner2: {
          content: getThemeTranslation(['partners', 'vbiTesti', 'partners', 'partner2', 'content']),
          authorName: getThemeTranslation(['partners', 'vbiTesti', 'partners', 'partner2', 'authorName']),
          authorRole: getThemeTranslation(['partners', 'vbiTesti', 'partners', 'partner2', 'authorRole']),
          logo: { mime: 'image/png' },
          author: { mime: 'image/png' },
        },
      },
    },
    order: 2,
  }),
  vbiPartnerFeatures: createSection<'partners', 'vbiPartnerFeatures'>({
    props: {
      title: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'title']),
      titleSub: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'titleSub']),
      features: {
        feature1: {
          title: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'features', 'feature1', 'title']),
          description: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'features', 'feature1', 'description']),
        },
        feature2: {
          title: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'features', 'feature2', 'title']),
          description: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'features', 'feature2', 'description']),
        },
        feature3: {
          title: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'features', 'feature3', 'title']),
          description: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'features', 'feature3', 'description']),
        },
        feature4: {
          title: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'features', 'feature4', 'title']),
          description: getThemeTranslation(['partners', 'vbiPartnerFeatures', 'features', 'feature4', 'description']),
        },
      },
    },
    order: 3,
  }),
  vbiCta: createSection<'partners', 'vbiCta'>({
    props: {
      title: getThemeTranslation(['partners', 'vbiCta', 'title']),
      titleSub: getThemeTranslation(['partners', 'vbiCta', 'titleSub']),
    },
    order: 4,
  }),
});
