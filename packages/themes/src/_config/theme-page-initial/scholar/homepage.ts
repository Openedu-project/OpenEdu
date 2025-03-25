import { createSection } from '../../../_utils/function';

export const createScholarHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  scholarHero: createSection<'homepage', 'scholarHero'>({
    props: {
      title: getThemeTranslation(['homepage', 'scholarHero', 'title']),
      subTitle: getThemeTranslation(['homepage', 'scholarHero', 'subTitle']),
      bannerMain: { mime: 'image/png' },
      bannerTop: { mime: 'image/png' },
      bannerBottom: { mime: 'image/png' },
      partners: new Array(6).fill({ mime: 'image/png' }),
    },
    order: 0,
  }),
  scholarService: createSection<'homepage', 'scholarService'>({
    props: {
      titleSection: getThemeTranslation(['homepage', 'scholarService', 'titleSection']),
      titleMain: getThemeTranslation(['homepage', 'scholarService', 'titleMain']),
      titleSub: getThemeTranslation(['homepage', 'scholarService', 'titleSub']),
      services: {
        service1: {
          title: getThemeTranslation(['homepage', 'scholarService', 'services.service1.title']),
          description: getThemeTranslation(['homepage', 'scholarService', 'services.service1.description']),
          isHighlighted: false,
        },
        service2: {
          title: getThemeTranslation(['homepage', 'scholarService', 'services.service2.title']),
          description: getThemeTranslation(['homepage', 'scholarService', 'services.service2.description']),
          isHighlighted: true,
        },
        service3: {
          title: getThemeTranslation(['homepage', 'scholarService', 'services.service3.title']),
          description: getThemeTranslation(['homepage', 'scholarService', 'services.service3.description']),
          isHighlighted: false,
        },
        service4: {
          title: getThemeTranslation(['homepage', 'scholarService', 'services.service4.title']),
          description: getThemeTranslation(['homepage', 'scholarService', 'services.service4.description']),
          isHighlighted: false,
        },
      },
    },
    order: 1,
  }),
  scholarAboutUs: createSection<'homepage', 'scholarAboutUs'>({
    props: {
      titleSection: getThemeTranslation(['homepage', 'scholarAboutUs', 'titleSection']),
      titleMain: getThemeTranslation(['homepage', 'scholarAboutUs', 'titleMain']),
      titleSub: getThemeTranslation(['homepage', 'scholarAboutUs', 'titleSub']),
      image: { mime: 'image/png' },
      features: {
        feature1: {
          title: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature1.title']),
          description: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature1.description']),
        },
        feature2: {
          title: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature2.title']),
          description: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature2.description']),
        },
        feature3: {
          title: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature3.title']),
          description: getThemeTranslation(['homepage', 'scholarAboutUs', 'features.feature3.description']),
        },
      },
      stats: {
        stat1: {
          label: getThemeTranslation(['homepage', 'scholarAboutUs', 'stats.stat1.label']),
          value: 728,
        },
        stat2: {
          label: getThemeTranslation(['homepage', 'scholarAboutUs', 'stats.stat2.label']),
          value: 12000,
        },
        stat3: {
          label: getThemeTranslation(['homepage', 'scholarAboutUs', 'stats.stat3.label']),
          value: 5896,
        },
        stat4: {
          label: getThemeTranslation(['homepage', 'scholarAboutUs', 'stats.stat4.label']),
          value: 890000,
        },
      },
    },
    order: 2,
  }),
  scholarAchievements: createSection<'homepage', 'scholarAchievements'>({
    props: {
      title: getThemeTranslation(['homepage', 'scholarAchievements', 'title']),
      subtitle: getThemeTranslation(['homepage', 'scholarAchievements', 'subtitle']),
      description: getThemeTranslation(['homepage', 'scholarAchievements', 'description']),
      image: { mime: 'image/png' },
      achievements: {
        stat1: {
          percentage: 90,
          description: getThemeTranslation(['homepage', 'scholarAchievements', 'achievements.stat1.description']),
        },
        stat2: {
          percentage: 85,
          description: getThemeTranslation(['homepage', 'scholarAchievements', 'achievements.stat2.description']),
        },
        stat3: {
          percentage: 90,
          description: getThemeTranslation(['homepage', 'scholarAchievements', 'achievements.stat3.description']),
        },
        stat4: {
          percentage: 90,
          description: getThemeTranslation(['homepage', 'scholarAchievements', 'achievements.stat4.description']),
        },
      },
    },
    order: 3,
  }),
  scholarTeam: createSection<'homepage', 'scholarTeam'>({
    props: {
      title: getThemeTranslation(['homepage', 'scholarTeam', 'title']),
      subtitle: getThemeTranslation(['homepage', 'scholarTeam', 'subtitle']),
      description: getThemeTranslation(['homepage', 'scholarTeam', 'description']),
      expert1: {
        name: getThemeTranslation(['homepage', 'scholarTeam', 'experts.expert1.name']),
        role: getThemeTranslation(['homepage', 'scholarTeam', 'experts.expert1.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://',
          x: 'https://',
          linkedin: 'https://',
        },
      },
      expert2: {
        name: getThemeTranslation(['homepage', 'scholarTeam', 'experts.expert2.name']),
        role: getThemeTranslation(['homepage', 'scholarTeam', 'experts.expert2.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://',
          x: 'https://',
          linkedin: 'https://',
        },
      },
      expert3: {
        name: getThemeTranslation(['homepage', 'scholarTeam', 'experts.expert3.name']),
        role: getThemeTranslation(['homepage', 'scholarTeam', 'experts.expert3.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://www.facebook.com/',
          x: 'https://',
          linkedin: 'https://',
        },
      },
    },
    order: 4,
  }),
  scholarProjects: createSection<'homepage', 'scholarProjects'>({
    props: {
      title: getThemeTranslation(['homepage', 'scholarProjects', 'title']),
      subtitle: getThemeTranslation(['homepage', 'scholarProjects', 'subtitle']),
      description: getThemeTranslation(['homepage', 'scholarProjects', 'description']),
      button: {
        text: getThemeTranslation(['homepage', 'scholarProjects', 'button', 'text']),
        link: '/',
      },
      banner1: { mime: 'image/png' },
      banner2: { mime: 'image/png' },
      banner3: { mime: 'image/png' },
      banner4: { mime: 'image/png' },
    },
    order: 5,
  }),
  scholarTestimonials: createSection<'homepage', 'scholarTestimonials'>({
    props: {
      title: getThemeTranslation(['homepage', 'scholarTestimonials', 'title']),
      subtitle: getThemeTranslation(['homepage', 'scholarTestimonials', 'subtitle']),
      description: getThemeTranslation(['homepage', 'scholarTestimonials', 'description']),
      testimonial1: {
        quote: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial1', 'quote']),
        rating: 5,
        avatar: { mime: 'image/png' },
        name: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial1', 'name']),
        position: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial1', 'position']),
      },
      testimonial2: {
        quote: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial2', 'quote']),
        rating: 5,
        avatar: { mime: 'image/png' },
        name: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial2', 'name']),
        position: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial2', 'position']),
      },
      testimonial3: {
        quote: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial3', 'quote']),
        rating: 5,
        avatar: { mime: 'image/png' },
        name: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial3', 'name']),
        position: getThemeTranslation(['homepage', 'scholarTestimonials', 'testimonial3', 'position']),
      },
    },
    order: 6,
  }),
});
