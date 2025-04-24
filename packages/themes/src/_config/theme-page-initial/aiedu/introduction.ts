import { createSection } from '../../../_utils/function';

export const createAiEduIntroductionConfig = (getThemeTranslation: (path: string[]) => string) => ({
  aieduGoal: createSection<'introduction', 'aieduGoal'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduGoal', 'title']),
      description: getThemeTranslation(['introduction', 'aieduGoal', 'description']),
      image: { mime: 'image/png' },
    },
    order: 0,
  }),
  aieduVisionMission: createSection<'introduction', 'aieduVisionMission'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduVisionMission', 'title']),
      vision: {
        title: getThemeTranslation(['introduction', 'aieduVisionMission', 'vision.title']),
        content: getThemeTranslation(['introduction', 'aieduVisionMission', 'vision.content']),
      },
      mission: {
        title: getThemeTranslation(['introduction', 'aieduVisionMission', 'mission.title']),
        content: getThemeTranslation(['introduction', 'aieduVisionMission', 'mission.content']),
      },
    },
    order: 1,
  }),
  aieduExpert: createSection<'introduction', 'aieduExpert'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduExpert', 'title']),
      description: getThemeTranslation(['introduction', 'aieduExpert', 'description']),
      expert1: {
        name: getThemeTranslation(['introduction', 'aieduExpert', 'expert1.name']),
        role: getThemeTranslation(['introduction', 'aieduExpert', 'expert1.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://',
          x: 'https://',
          linkedin: 'https://',
        },
      },
      expert2: {
        name: getThemeTranslation(['introduction', 'aieduExpert', 'expert2.name']),
        role: getThemeTranslation(['introduction', 'aieduExpert', 'expert2.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://',
          x: 'https://',
          linkedin: 'https://',
        },
      },
      expert3: {
        name: getThemeTranslation(['introduction', 'aieduExpert', 'expert3.name']),
        role: getThemeTranslation(['introduction', 'aieduExpert', 'expert3.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://www.facebook.com/',
          x: 'https://',
          linkedin: 'https://',
        },
      },
    },
    order: 2,
  }),
  aieduFeatures: createSection<'introduction', 'aieduFeatures'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduFeatures', 'title']),
      images: { mime: 'image/png' },
      button: {
        text: getThemeTranslation(['introduction', 'aieduFeatures', 'button', 'text']),
        link: '/',
      },
      partners: new Array(6).fill({ mime: 'image/png' }),
      modules: new Array(5).map(index =>
        getThemeTranslation(['introduction', 'aieduFeatures', 'modules', `module${index + 1}`])
      ),
      benefits: new Array(4).map(index =>
        getThemeTranslation(['introduction', 'aieduFeatures', 'benefit', `benefit${index + 1}`])
      ),
    },
    order: 3,
  }),
  aieduMap: createSection<'introduction', 'aieduMap'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduMap', 'title']),
      description: getThemeTranslation(['introduction', 'aieduMap', 'description']),
      images: { mime: 'image/png' },
      button: {
        text: getThemeTranslation(['introduction', 'aieduMap', 'button', 'text']),
        link: '/',
      },
    },
    order: 4,
  }),
});
