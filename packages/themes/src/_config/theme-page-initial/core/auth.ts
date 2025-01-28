import { createSection } from '../../../_utils/function';

export const createAuthLayoutConfig = (getThemeTranslation: (path: string[]) => string) => ({
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
  header: createSection<'auth', 'header'>({
    props: {
      logo: { mime: 'image/png' },
      sidebarItems: [
        {
          id: 'id-about',
          label: 'About us',
          href: '/about-us',
          isHighlight: false,
        },
        { id: 'id-contact', label: 'Contact', href: '/contact-us', isHighlight: false },
      ],
    },
    order: 5,
  }),
});
