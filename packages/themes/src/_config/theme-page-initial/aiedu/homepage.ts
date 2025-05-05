import { createSection } from '../../../_utils/function';

//Theme step 8: add the initial value to config file with syntax
// ${sectionKey}:  createSection<${page}, ${sectionKey}>({ props: , order})
export const createAiEduHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  aieduHero: createSection<'homepage', 'aieduHero'>({
    // Theme step 9: add the props
    props: {
      title: getThemeTranslation(['homepage', 'aieduHero', 'title']),
      description: getThemeTranslation(['homepage', 'aieduHero', 'description']),
      button: {
        text: getThemeTranslation(['homepage', 'aieduHero', 'button', 'text']),
        link: '/',
      },
      banner: { mime: 'image/png' },
      partners: new Array(6).fill({ mime: 'image/png' }),
    },
    // Theme step 10: add the order
    order: 0,
  }),
  aieduExpert: createSection<'homepage', 'aieduExpert'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduExpert', 'title']),
      teachers: [
        {
          name: getThemeTranslation(['homepage', 'aieduExpert', 'teachers.teacher1.name']),
          role: getThemeTranslation(['homepage', 'aieduExpert', 'teachers.teacher1.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['homepage', 'aieduExpert', 'teachers.teacher2.name']),
          role: getThemeTranslation(['homepage', 'aieduExpert', 'teachers.teacher2.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['homepage', 'aieduExpert', 'teachers.teacher3.name']),
          role: getThemeTranslation(['homepage', 'aieduExpert', 'teachers.teacher3.role']),
          image: { mime: 'image/png' },
        },
      ],
      mentors: [
        {
          name: getThemeTranslation(['homepage', 'aieduExpert', 'mentors.mentor1.name']),
          role: getThemeTranslation(['homepage', 'aieduExpert', 'mentors.mentor1.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['homepage', 'aieduExpert', 'mentors.mentor2.name']),
          role: getThemeTranslation(['homepage', 'aieduExpert', 'mentors.mentor2.role']),
          image: { mime: 'image/png' },
        },
        {
          name: getThemeTranslation(['homepage', 'aieduExpert', 'mentors.mentor3.name']),
          role: getThemeTranslation(['homepage', 'aieduExpert', 'mentors.mentor3.role']),
          image: { mime: 'image/png' },
        },
      ],
    },
    order: 1,
  }),
  aieduFeatures: createSection<'homepage', 'aieduFeatures'>({
    props: {
      mainCourse: {
        title: getThemeTranslation(['homepage', 'aieduFeatures', 'mainCourse', 'title']),
        button: {
          text: getThemeTranslation(['homepage', 'aieduFeatures', 'mainCourse', 'button', 'text']),
          link: '/',
        },
        images: { mime: 'image/png' },
        benefits: new Array(4).map(index =>
          getThemeTranslation(['homepage', 'aieduFeatures', 'mainCourse', 'benefits', `benefit${index + 1}`])
        ),
      },
      subCourse: {
        title: getThemeTranslation(['homepage', 'aieduFeatures', 'subCourse', 'title']),
        button: {
          text: getThemeTranslation(['homepage', 'aieduFeatures', 'subCourse', 'button', 'text']),
          link: '/',
        },
        images: { mime: 'image/png' },
        benefits: [
          getThemeTranslation(['homepage', 'aieduFeatures', 'subCourse', 'benefits', 'benefit1']),
          getThemeTranslation(['homepage', 'aieduFeatures', 'subCourse', 'benefits', 'benefit2']),
          getThemeTranslation(['homepage', 'aieduFeatures', 'subCourse', 'benefits', 'benefit3']),
          getThemeTranslation(['homepage', 'aieduFeatures', 'subCourse', 'benefits', 'benefit4']),
        ],
      },
    },
    order: 2,
  }),
  aieduDashboard: createSection<'homepage', 'aieduDashboard'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduDashboard', 'title']),
      button: {
        text: getThemeTranslation(['homepage', 'aieduDashboard', 'button', 'text']),
        link: '/',
      },
    },
    order: 3,
  }),
  aieduBlog: createSection<'homepage', 'aieduBlog'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduBlog', 'title']),
      button: {
        text: getThemeTranslation(['homepage', 'aieduBlog', 'button', 'text']),
        link: '/',
      },
    },
    order: 4,
  }),
  aieduCert: createSection<'homepage', 'aieduCert'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduCert', 'title']),
      button: {
        text: getThemeTranslation(['homepage', 'aieduCert', 'button', 'text']),
        link: '/',
      },
      banner: { mime: 'image/png' },
      coursePanel: {
        title: getThemeTranslation(['homepage', 'aieduCert', 'coursePanel', 'title']),
        requirements: [
          getThemeTranslation(['homepage', 'aieduCert', 'coursePanel', 'requirements', 'requirement1']),
          getThemeTranslation(['homepage', 'aieduCert', 'coursePanel', 'requirements', 'requirement2']),
          getThemeTranslation(['homepage', 'aieduCert', 'coursePanel', 'requirements', 'requirement3']),
        ],
      },
    },
    order: 5,
  }),
  aieduGuide: createSection<'homepage', 'aieduGuide'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduGuide', 'title']),
      image: { mime: 'image/png' },
      steps: [
        getThemeTranslation(['homepage', 'aieduGuide', 'steps', 'step1']),
        getThemeTranslation(['homepage', 'aieduGuide', 'steps', 'step2']),
        getThemeTranslation(['homepage', 'aieduGuide', 'steps', 'step3']),
      ],
    },
    order: 6,
  }),
  aieduSponsors: createSection<'homepage', 'aieduSponsors'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduSponsors', 'title']),
      sponsorImages: new Array(16).fill({ mime: 'image/png' }),
      mediaImages: new Array(16).fill({ mime: 'image/png' }),
      sponsorLabel: getThemeTranslation(['homepage', 'aieduSponsors', 'sponsorLabel']),
      mediaLabel: getThemeTranslation(['homepage', 'aieduSponsors', 'mediaLabel']),
    },
    order: 7,
  }),
  aieduGallery: createSection<'homepage', 'aieduGallery'>({
    props: {
      title: getThemeTranslation(['homepage', 'aieduGallery', 'title']),
      image1: { mime: 'image/png' },
      image2: { mime: 'image/png' },
      image3: { mime: 'image/png' },
      image4: { mime: 'image/png' },
      image5: { mime: 'image/png' },
      image6: { mime: 'image/png' },
      image7: { mime: 'image/png' },
      image8: { mime: 'image/png' },
    },
    order: 8,
  }),
});
