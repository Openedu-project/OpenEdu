import { createSection } from '../../../_utils/function';

export const createVbiPartnersConfig = (getThemeTranslation: (path: string[]) => string) => ({
  vbiPartnerList: createSection<'partners', 'vbiPartnerList'>({
    props: {
      title: getThemeTranslation(['partners', 'vbiPartnerList', 'title']),
      titleSub: getThemeTranslation(['partners', 'vbiPartnerList', 'titleSub']),
      labelFoundation: getThemeTranslation(['partners', 'vbiPartnerList', 'labelFoundation']),
      labelEntrepreneur: getThemeTranslation(['partners', 'vbiPartnerList', 'labelEntrepreneur']),
      labelUniversity: getThemeTranslation(['partners', 'vbiPartnerList', 'labelUniversity']),
      foundation: [
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'foundation', 'foundation-0', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'foundation', 'foundation-1', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'foundation', 'foundation-2', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'foundation', 'foundation-3', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'foundation', 'foundation-4', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'foundation', 'foundation-5', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'foundation', 'foundation-6', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'foundation', 'foundation-7', 'content']),
        },
      ],
      entrepreneur: [
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'entrepreneur', 'entrepreneur-0', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'entrepreneur', 'entrepreneur-1', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'entrepreneur', 'entrepreneur-2', 'content']),
        },
      ],
      university: [
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'university', 'university-0', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'university', 'university-1', 'content']),
        },
        {
          logo: { mime: 'image/png' },
          content: getThemeTranslation(['partners', 'vbiPartnerList', 'university', 'university-2', 'content']),
        },
      ],
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
              value: 100,
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
              value: 120,
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
              value: 20,
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
              value: 700,
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
              value: 30,
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
              value: 300,
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
              value: 500,
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
              value: 30,
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
              value: 150,
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
