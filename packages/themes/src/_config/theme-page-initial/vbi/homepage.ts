import { createSection } from '../../../_utils/function';

export const createVbiHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  vbiHero: createSection<'homepage', 'vbiHero'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiHero', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiHero', 'titleSub']),
      button: {
        text: getThemeTranslation(['homepage', 'vbiHero', 'button', 'text']),
        link: getThemeTranslation(['homepage', 'vbiHero', 'button', 'link']),
      },
      banner: {
        image: { mime: 'image/png' },
        bannerContent1: {
          label: getThemeTranslation(['homepage', 'vbiHero', 'banner', 'bannerContent1', 'label']),
          value: 20000,
        },
        bannerContent2: {
          label: getThemeTranslation(['homepage', 'vbiHero', 'banner', 'bannerContent2', 'label']),
          value: 30000,
        },
        bannerContent3: {
          label: getThemeTranslation(['homepage', 'vbiHero', 'banner', 'bannerContent3', 'label']),
          value: 46000,
        },
      },
      partners: new Array(9).fill({ mime: 'image/png' }),
    },
    order: 0,
  }),
  vbiAchievements: createSection<'homepage', 'vbiAchievements'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiAchievements', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiAchievements', 'titleSub']),
      button: {
        text: getThemeTranslation(['homepage', 'vbiAchievements', 'button', 'text']),
        link: getThemeTranslation(['homepage', 'vbiAchievements', 'button', 'link']),
      },
      achievements: {
        achievement1: {
          title: getThemeTranslation(['homepage', 'vbiAchievements', 'achievements', 'achievement1', 'title']),
          description: getThemeTranslation([
            'homepage',
            'vbiAchievements',
            'achievements',
            'achievement1',
            'description',
          ]),
          stats: {
            stat1: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement1',
                'stats',
                'stat1',
                'label',
              ]),
              value: 20000,
            },
            stat2: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement1',
                'stats',
                'stat2',
                'label',
              ]),
              value: 10000,
            },
            stat3: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement1',
                'stats',
                'stat3',
                'label',
              ]),
              value: 20000,
            },
          },
          image: { mime: 'image/png' },
        },
        achievement2: {
          title: getThemeTranslation(['homepage', 'vbiAchievements', 'achievements', 'achievement2', 'title']),
          description: getThemeTranslation([
            'homepage',
            'vbiAchievements',
            'achievements',
            'achievement2',
            'description',
          ]),
          stats: {
            stat1: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement2',
                'stats',
                'stat2',
                'label',
              ]),
              value: 20000,
            },
            stat2: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement1',
                'stats',
                'stat2',
                'label',
              ]),
              value: 2000,
            },
            stat3: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement2',
                'stats',
                'stat3',
                'label',
              ]),
              value: 6000,
            },
          },
          image: { mime: 'image/png' },
        },
        achievement3: {
          title: getThemeTranslation(['homepage', 'vbiAchievements', 'achievements', 'achievement3', 'title']),
          description: getThemeTranslation([
            'homepage',
            'vbiAchievements',
            'achievements',
            'achievement3',
            'description',
          ]),
          stats: {
            stat1: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement3',
                'stats',
                'stat1',
                'label',
              ]),
              value: 25000,
            },
            stat2: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement3',
                'stats',
                'stat2',
                'label',
              ]),
              value: 2000000,
            },
            stat3: {
              label: getThemeTranslation([
                'homepage',
                'vbiAchievements',
                'achievements',
                'achievement3',
                'stats',
                'stat3',
                'label',
              ]),
              value: 200,
            },
          },
          image: { mime: 'image/png' },
        },
      },
    },
    order: 1,
  }),
  vbiCourses: createSection<'homepage', 'vbiCourses'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiCourses', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiCourses', 'titleSub']),
      button: {
        text: getThemeTranslation(['homepage', 'vbiCourses', 'button', 'text']),
        link: getThemeTranslation(['homepage', 'vbiCourses', 'button', 'link']),
      },
    },
    order: 2,
  }),
  vbiCert: createSection<'homepage', 'vbiCert'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiCert', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiCert', 'titleSub']),
      button: {
        text: getThemeTranslation(['homepage', 'vbiCert', 'button', 'text']),
        link: getThemeTranslation(['homepage', 'vbiCert', 'button', 'link']),
      },
      image: { mime: 'image/png' },
    },
    order: 3,
  }),
  vbiFeatures: createSection<'homepage', 'vbiFeatures'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiFeatures', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiFeatures', 'titleSub']),
      features: {
        feature1: {
          title: getThemeTranslation(['homepage', 'vbiFeatures', 'features', 'feature1', 'title']),
          description: getThemeTranslation(['homepage', 'vbiFeatures', 'features', 'feature1', 'description']),
        },
        feature2: {
          title: getThemeTranslation(['homepage', 'vbiFeatures', 'features', 'feature2', 'title']),
          description: getThemeTranslation(['homepage', 'vbiFeatures', 'features', 'feature2', 'description']),
        },
        feature3: {
          title: getThemeTranslation(['homepage', 'vbiFeatures', 'features', 'feature3', 'title']),
          description: getThemeTranslation(['homepage', 'vbiFeatures', 'features', 'feature3', 'description']),
        },
        feature4: {
          title: getThemeTranslation(['homepage', 'vbiFeatures', 'features', 'feature4', 'title']),
          description: getThemeTranslation(['homepage', 'vbiFeatures', 'features', 'feature4', 'description']),
        },
      },
    },
    order: 4,
  }),
  vbiBlogs: createSection<'homepage', 'vbiBlogs'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiBlogs', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiBlogs', 'titleSub']),
      button: {
        text: getThemeTranslation(['homepage', 'vbiBlogs', 'button', 'text']),
        link: getThemeTranslation(['homepage', 'vbiBlogs', 'button', 'link']),
      },
    },
    order: 5,
  }),
  vbiEvents: createSection<'homepage', 'vbiEvents'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiEvents', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiEvents', 'titleSub']),
      button: {
        text: getThemeTranslation(['homepage', 'vbiEvents', 'button', 'text']),
        link: getThemeTranslation(['homepage', 'vbiEvents', 'button', 'link']),
      },
      events: {
        event1: {
          title: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event1', 'title']),
          description: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event1', 'description']),
          stats: {
            stat1: {
              label: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event1', 'stats', 'stat1', 'label']),
              value: 100,
            },
            stat2: {
              label: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event1', 'stats', 'stat2', 'label']),
              value: 20,
            },
            stat3: {
              label: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event1', 'stats', 'stat3', 'label']),
              value: 120,
            },
          },
          image: { mime: 'image/png' },
        },
        event2: {
          title: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event2', 'title']),
          description: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event2', 'description']),
          stats: {
            stat1: {
              label: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event2', 'stats', 'stat2', 'label']),
              value: 1000,
            },
            stat2: {
              label: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event1', 'stats', 'stat2', 'label']),
              value: 50,
            },
            stat3: {
              label: getThemeTranslation(['homepage', 'vbiEvents', 'events', 'event2', 'stats', 'stat3', 'label']),
              value: 10,
            },
          },
          image: { mime: 'image/png' },
        },
      },
    },
    order: 6,
  }),
  vbiCreators: createSection<'homepage', 'vbiCreators'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiCreators', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiCreators', 'titleSub']),
      creators: {
        creator1: {
          name: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator1', 'name']),
          role: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator1', 'role']),
          story: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator1', 'story']),
          avatar: { mime: 'image/png' },
        },
        creator2: {
          name: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator2', 'name']),
          role: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator2', 'role']),
          story: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator2', 'story']),
          avatar: { mime: 'image/png' },
        },
        creator3: {
          name: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator3', 'name']),
          role: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator3', 'role']),
          story: getThemeTranslation(['homepage', 'vbiCreators', 'creators', 'creator3', 'story']),
          avatar: { mime: 'image/png' },
        },
      },
    },
    order: 7,
  }),
  vbiMap: createSection<'homepage', 'vbiMap'>({
    props: {
      title: getThemeTranslation(['homepage', 'vbiMap', 'title']),
      titleSub: getThemeTranslation(['homepage', 'vbiMap', 'titleSub']),
      button: {
        text: getThemeTranslation(['homepage', 'vbiMap', 'button', 'text']),
        link: getThemeTranslation(['homepage', 'vbiMap', 'button', 'link']),
      },
    },
    order: 8,
  }),
});
