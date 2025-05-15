import { createSection } from '../../../_utils/function';

export const createAiEduIntroductionConfig = (getThemeTranslation: (path: string[]) => string) => ({
  aieduGoal: createSection<'introduction', 'aieduGoal'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduGoal', 'title']),
      subTitle: getThemeTranslation(['introduction', 'aieduGoal', 'subTitle']),
      description: getThemeTranslation(['introduction', 'aieduGoal', 'description']),
      image: { mime: 'image/png' },
    },
    order: 0,
  }),
  aieduTrend: createSection<'introduction', 'aieduTrend'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduTrend', 'title']),
      feature1: {
        color: 'secondary',
        title: getThemeTranslation(['introduction', 'aieduTrend', 'feature1', 'title']),
        highlight: getThemeTranslation(['introduction', 'aieduTrend', 'feature1', 'highlight']),
        desc: getThemeTranslation(['introduction', 'aieduTrend', 'feature1', 'desc']),
      },
      feature2: {
        color: 'warning',
        title: getThemeTranslation(['introduction', 'aieduTrend', 'feature2', 'title']),
        highlight: getThemeTranslation(['introduction', 'aieduTrend', 'feature2', 'highlight']),
        desc: getThemeTranslation(['introduction', 'aieduTrend', 'feature2', 'desc']),
      },
      feature3: {
        color: 'info',
        title: getThemeTranslation(['introduction', 'aieduTrend', 'feature3', 'title']),
        highlight: getThemeTranslation(['introduction', 'aieduTrend', 'feature3', 'highlight']),
        desc: getThemeTranslation(['introduction', 'aieduTrend', 'feature3', 'desc']),
      },
    },
    order: 1,
  }),
  aieduBenefit: createSection<'introduction', 'aieduBenefit'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduBenefit', 'title']),
      benefit1: {
        percentage: 46,
        description: getThemeTranslation(['introduction', 'aieduBenefit', 'benefit1', 'description']),
      },
      benefit2: {
        percentage: 68,
        description: getThemeTranslation(['introduction', 'aieduBenefit', 'benefit2', 'description']),
      },
      benefit3: {
        percentage: 66,
        description: getThemeTranslation(['introduction', 'aieduBenefit', 'benefit3', 'description']),
      },
      benefit4: {
        percentage: 92,
        description: getThemeTranslation(['introduction', 'aieduBenefit', 'benefit4', 'description']),
      },
    },
    order: 2,
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
    order: 3,
  }),
  aieduTeacher: createSection<'introduction', 'aieduTeacher'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduTeacher', 'title']),
      teachers: [
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher1.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher1.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher2.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher2.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher3.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher3.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher4.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher4.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher5.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher5.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher6.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher6.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher7.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher7.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher8.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher8.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher9.name']),
          role: getThemeTranslation(['introduction', 'aieduTeacher', 'teachers.teacher9.role']),
          image: { mime: 'image/png' },
        },
      ],
    },
    order: 4,
  }),
  aieduMentor: createSection<'introduction', 'aieduMentor'>({
    props: {
      title: getThemeTranslation(['introduction', 'aieduMentor', 'title']),
      mentors: [
        {
          name: getThemeTranslation(['introduction', 'aieduMentor', 'mentors.mentor1.name']),
          role: getThemeTranslation(['introduction', 'aieduMentor', 'mentors.mentor1.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduMentor', 'mentors.mentor2.name']),
          role: getThemeTranslation(['introduction', 'aieduMentor', 'mentors.mentor2.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['introduction', 'aieduMentor', 'mentors.mentor3.name']),
          role: getThemeTranslation(['introduction', 'aieduMentor', 'mentors.mentor3.role']),
          image: { mime: 'image/png' },
        },
      ],
    },
    order: 5,
  }),
  aieduFeatures: createSection<'introduction', 'aieduFeatures'>({
    props: {
      mainCourse: {
        title: getThemeTranslation(['introduction', 'aieduFeatures', 'mainCourse', 'title']),
        button: {
          text: getThemeTranslation(['introduction', 'aieduFeatures', 'mainCourse', 'button', 'text']),
          link: '/',
        },
        image: { mime: 'image/png' },
        benefits: [
          getThemeTranslation(['introduction', 'aieduFeatures', 'mainCourse', 'benefits', 'benefit1']),
          getThemeTranslation(['introduction', 'aieduFeatures', 'mainCourse', 'benefits', 'benefit2']),
          getThemeTranslation(['introduction', 'aieduFeatures', 'mainCourse', 'benefits', 'benefit3']),
          getThemeTranslation(['introduction', 'aieduFeatures', 'mainCourse', 'benefits', 'benefit4']),
        ],
      },
      subCourse: {
        title: getThemeTranslation(['introduction', 'aieduFeatures', 'subCourse', 'title']),
        button: {
          text: getThemeTranslation(['introduction', 'aieduFeatures', 'subCourse', 'button', 'text']),
          link: '/',
        },
        image: { mime: 'image/png' },
        benefits: [
          getThemeTranslation(['introduction', 'aieduFeatures', 'subCourse', 'benefits', 'benefit1']),
          getThemeTranslation(['introduction', 'aieduFeatures', 'subCourse', 'benefits', 'benefit2']),
          getThemeTranslation(['introduction', 'aieduFeatures', 'subCourse', 'benefits', 'benefit3']),
          getThemeTranslation(['introduction', 'aieduFeatures', 'subCourse', 'benefits', 'benefit4']),
        ],
      },
    },
    order: 6,
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
    order: 7,
  }),
});
