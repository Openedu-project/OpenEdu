import { createSection } from '../../../_utils/function';

export const createFenetHomepageConfig = (getThemeTranslation: (path: string[]) => string) => ({
  fenetHero: createSection<'homepage', 'fenetHero'>({
    props: {
      title: getThemeTranslation(['homepage', 'fenetHero', 'title']),
      subtitle: getThemeTranslation(['homepage', 'fenetHero', 'subtitle']),
      banner: { mime: 'image/png' },
      button: {
        text: getThemeTranslation(['homepage', 'fenetHero', 'button', 'text']),
        link: '/',
      },
      partnerTitle: getThemeTranslation(['homepage', 'fenetHero', 'partnerTitle']),
      partners: new Array(6).fill({ mime: 'image/png' }),
    },
    order: 0,
  }),
  fenetService: createSection<'homepage', 'fenetService'>({
    props: {
      subtitle: getThemeTranslation(['homepage', 'fenetService', 'subtitle']),
      title: getThemeTranslation(['homepage', 'fenetService', 'title']),
      service1: {
        title: getThemeTranslation(['homepage', 'fenetService', 'service1.title']),
        description: getThemeTranslation(['homepage', 'fenetService', 'service1.description']),
        textButton: getThemeTranslation(['homepage', 'fenetService', 'service1.textButton']),
        link: '/',
        isHighlighted: false,
      },
      service2: {
        title: getThemeTranslation(['homepage', 'fenetService', 'service2.title']),
        description: getThemeTranslation(['homepage', 'fenetService', 'service2.description']),
        textButton: getThemeTranslation(['homepage', 'fenetService', 'service1.textButton']),
        link: '/',
        isHighlighted: true,
      },
      service3: {
        title: getThemeTranslation(['homepage', 'fenetService', 'service3.title']),
        description: getThemeTranslation(['homepage', 'fenetService', 'service3.description']),
        textButton: getThemeTranslation(['homepage', 'fenetService', 'service1.textButton']),
        link: '/',
        isHighlighted: false,
      },
    },
    order: 1,
  }),
  fenetFeature: createSection<'homepage', 'fenetFeature'>({
    props: {
      subtitle: getThemeTranslation(['homepage', 'fenetFeature', 'subtitle']),
      title: getThemeTranslation(['homepage', 'fenetFeature', 'title']),
      feature1: {
        title: getThemeTranslation(['homepage', 'fenetFeature', 'feature1.title']),
        description: getThemeTranslation(['homepage', 'fenetFeature', 'feature1.description']),
      },
      feature2: {
        title: getThemeTranslation(['homepage', 'fenetFeature', 'feature2.title']),
        description: getThemeTranslation(['homepage', 'fenetFeature', 'feature2.description']),
      },
      feature3: {
        title: getThemeTranslation(['homepage', 'fenetFeature', 'feature3.title']),
        description: getThemeTranslation(['homepage', 'fenetFeature', 'feature3.description']),
      },
      feature4: {
        title: getThemeTranslation(['homepage', 'fenetFeature', 'feature4.title']),
        description: getThemeTranslation(['homepage', 'fenetFeature', 'feature4.description']),
      },
      image: { mime: 'image/png' },
    },
    order: 2,
  }),
  fenetExperience: createSection<'homepage', 'fenetExperience'>({
    props: {
      title: getThemeTranslation(['homepage', 'fenetExperience', 'title']),
      image: { mime: 'image/png' },
      button: {
        text: getThemeTranslation(['homepage', 'fenetExperience', 'button', 'text']),
        link: '/',
      },
    },
    order: 3,
  }),
  fenetCustomer: createSection<'homepage', 'fenetCustomer'>({
    props: {
      title: getThemeTranslation(['homepage', 'fenetCustomer', 'title']),
      button: {
        text: getThemeTranslation(['homepage', 'fenetCustomer', 'button', 'text']),
        link: '/',
      },
      customer1: {
        description: getThemeTranslation(['homepage', 'fenetCustomer', 'customer1', 'description']),
        tag: getThemeTranslation(['homepage', 'fenetCustomer', 'customer1', 'tag']),
        image: { mime: 'image/png' },
      },
      customer2: {
        description: getThemeTranslation(['homepage', 'fenetCustomer', 'customer2', 'description']),
        tag: getThemeTranslation(['homepage', 'fenetCustomer', 'customer2', 'tag']),
        image: { mime: 'image/png' },
      },
    },
    order: 4,
  }),
  fenetExpert: createSection<'homepage', 'fenetExpert'>({
    props: {
      title: getThemeTranslation(['homepage', 'fenetExpert', 'title']),
      subtitle: getThemeTranslation(['homepage', 'fenetExpert', 'subtitle']),
      expert1: {
        name: getThemeTranslation(['homepage', 'fenetExpert', 'expert1.name']),
        role: getThemeTranslation(['homepage', 'fenetExpert', 'expert1.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://',
          x: 'https://',
          linkedin: 'https://',
        },
      },
      expert2: {
        name: getThemeTranslation(['homepage', 'fenetExpert', 'expert2.name']),
        role: getThemeTranslation(['homepage', 'fenetExpert', 'expert2.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://',
          x: 'https://',
          linkedin: 'https://',
        },
      },
      expert3: {
        name: getThemeTranslation(['homepage', 'fenetExpert', 'expert3.name']),
        role: getThemeTranslation(['homepage', 'fenetExpert', 'expert3.role']),
        image: { mime: 'image/png' },
        socialLinks: {
          facebook: 'https://www.facebook.com/',
          x: 'https://',
          linkedin: 'https://',
        },
      },
    },
    order: 5,
  }),
  fenetPrice: createSection<'homepage', 'fenetPrice'>({
    props: {
      title: getThemeTranslation(['homepage', 'fenetPrice', 'title']),
      subtitle: getThemeTranslation(['homepage', 'fenetPrice', 'subtitle']),
      price1: {
        price: getThemeTranslation(['homepage', 'fenetPrice', 'price1.price']),
        banner: { mime: 'image/png' },
        link: '/',
        tag: getThemeTranslation(['homepage', 'fenetPrice', 'price1.tag']),
        buttonText: getThemeTranslation(['homepage', 'fenetPrice', 'price1.buttonText']),
        // features: [{ features1: getThemeTranslation(['homepage', 'fenetPrice', 'features.features1']) }],
      },
      price2: {
        price: getThemeTranslation(['homepage', 'fenetPrice', 'price2.price']),
        banner: { mime: 'image/png' },
        link: '/',
        tag: getThemeTranslation(['homepage', 'fenetPrice', 'price2.tag']),
        buttonText: getThemeTranslation(['homepage', 'fenetPrice', 'price2.buttonText']),
      },
      price3: {
        price: getThemeTranslation(['homepage', 'fenetPrice', 'price3.price']),
        banner: { mime: 'image/png' },
        link: '/',
        tag: getThemeTranslation(['homepage', 'fenetPrice', 'price3.tag']),
        buttonText: getThemeTranslation(['homepage', 'fenetPrice', 'price3.buttonText']),
      },
    },
    order: 6,
  }),
  fenetBlog: createSection<'homepage', 'fenetBlog'>({
    props: {
      title: getThemeTranslation(['homepage', 'fenetBlog', 'title']),
      subtitle: getThemeTranslation(['homepage', 'fenetBlog', 'subtitle']),
      blog1: {
        date: getThemeTranslation(['homepage', 'fenetBlog', 'blog1.date']),
        banner: { mime: 'image/png' },
        creator: getThemeTranslation(['homepage', 'fenetBlog', 'blog1.creator']),
        title: getThemeTranslation(['homepage', 'fenetBlog', 'blog1.title']),
      },
      blog2: {
        date: getThemeTranslation(['homepage', 'fenetBlog', 'blog2.date']),
        banner: { mime: 'image/png' },
        creator: getThemeTranslation(['homepage', 'fenetBlog', 'blog2.creator']),
        title: getThemeTranslation(['homepage', 'fenetBlog', 'blog2.title']),
      },
    },
    order: 7,
  }),
});
