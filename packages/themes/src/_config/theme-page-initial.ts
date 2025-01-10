import type { PagesConfig, ThemeName, ThemePageKey } from '../_types/theme-page';
import { createSection } from '../_utils/function';

type TranslationPath = string[];

const createTranslationGetter = (t: (key: string) => string, themeName: ThemeName | string) => {
  return (path: TranslationPath) => {
    return t([themeName, ...path].join('.'));
  };
};

const defaultMetadataAtPage = {
  title: '',
  description: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  canonical: '',
  robotsIndex: true,
  robotsFollow: true,
};

export const createThemePageConfig = (t: (key: string) => string): Record<ThemeName, PagesConfig<ThemePageKey>> => {
  const academiaT = createTranslationGetter(t, 'academia');
  const scholarT = createTranslationGetter(t, 'scholar');

  const createHomepageConfig = (getThemeTranslation: typeof academiaT) => ({
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

  const createScholarHomepageConfig = (getThemeTranslation: typeof scholarT) => ({
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
    scholarAboutUs: createSection<'homepage', 'scholarService'>({
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
  });

  const createAuthLayoutConfig = (getThemeTranslation: typeof academiaT) => ({
    login: createSection<'auth', 'login'>({
      props: {
        title: getThemeTranslation(['auth', 'login', 'title']),
        banner: { mime: 'image/png' },
        slogan: getThemeTranslation(['auth', 'login', 'slogan']),
      },
      order: 0,
    }),
    signUp: createSection<'auth', 'signUp'>({
      props: {
        title: getThemeTranslation(['auth', 'signup', 'title']),
        seperate: getThemeTranslation(['auth', 'signup', 'seperate']),
        banner: { mime: 'image/png' },
        slogan: getThemeTranslation(['auth', 'signup', 'slogan']),
      },
      order: 1,
    }),
    forgotPassword: createSection<'auth', 'forgotPassword'>({
      props: {
        title: getThemeTranslation(['auth', 'forgotPassword', 'title']),
        banner: { mime: 'image/png' },
        slogan: getThemeTranslation(['auth', 'forgotPassword', 'slogan']),
      },
      order: 2,
    }),
    emailVerify: createSection<'auth', 'emailVerify'>({
      props: {
        banner: { mime: 'image/png' },
        slogan: getThemeTranslation(['auth', 'emailVerify', 'slogan']),
      },
      order: 3,
    }),
    authConfirm: createSection<'auth', 'authConfirm'>({
      props: {
        title: getThemeTranslation(['auth', 'authConfirm', 'title']),
        banner: { mime: 'image/png' },
        slogan: getThemeTranslation(['auth', 'authConfirm', 'slogan']),
      },
      order: 4,
    }),
  });

  return {
    academia: {
      homepage: {
        label: t('labels.homepage'),
        config: createHomepageConfig(academiaT),
        metadata: {
          title: 'Homepage',
          description: '',
          keywords: '',
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          canonical: '',
          robotsIndex: true,
          robotsFollow: true,
        },
      },
      'about-us': {
        label: t('labels.aboutus'),
        config: undefined,
        metadata: {
          title: 'About us',
          description: '',
          keywords: '',
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          canonical: '',
          robotsIndex: true,
          robotsFollow: true,
        },
      },
      auth: {
        label: t('labels.authLayout'),
        config: createAuthLayoutConfig(academiaT),
        metadata: undefined,
      },
    },
    scholar: {
      homepage: {
        label: t('labels.homepage'),
        config: createScholarHomepageConfig(scholarT),
        metadata: defaultMetadataAtPage,
      },
      'about-us': {
        label: t('labels.aboutus'),
        config: undefined,
        metadata: defaultMetadataAtPage,
      },
      auth: {
        label: t('labels.authLayout'),
        config: createAuthLayoutConfig(academiaT),
        metadata: undefined,
      },
    },
  };
};
