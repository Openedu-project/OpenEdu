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
      teachers: [
        {
          name: getThemeTranslation(['introduction', 'aieduExpert', 'teachers.teacher1.name']),
          role: getThemeTranslation(['introduction', 'aieduExpert', 'teachers.teacher1.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduExpert', 'teachers.teacher2.name']),
          role: getThemeTranslation(['introduction', 'aieduExpert', 'teachers.teacher2.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduExpert', 'teachers.teacher3.name']),
          role: getThemeTranslation(['introduction', 'aieduExpert', 'teachers.teacher3.role']),
          image: { mime: 'image/png' },
        },
      ],
      mentors: [
        {
          name: getThemeTranslation(['introduction', 'aieduExpert', 'mentors.mentor1.name']),
          role: getThemeTranslation(['introduction', 'aieduExpert', 'mentors.mentor1.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduExpert', 'mentors.mentor2.name']),
          role: getThemeTranslation(['introduction', 'aieduExpert', 'mentors.mentor2.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduExpert', 'mentors.mentor3.name']),
          role: getThemeTranslation(['introduction', 'aieduExpert', 'mentors.mentor3.role']),
          image: { mime: 'image/png' },
        },
      ],
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
      image: { mime: 'image/png' },
      button: {
        text: getThemeTranslation(['introduction', 'aieduMap', 'button', 'text']),
        link: '/',
      },
    },
    order: 4,
  }),
});
