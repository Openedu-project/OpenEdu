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
        config: undefined,
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
