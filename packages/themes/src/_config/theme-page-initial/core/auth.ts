import { createSection } from '../../../_utils/function';

export const createAuthLayoutConfig = (getThemeTranslation: (path: string[]) => string) => ({
  login: createSection<'auth', 'login'>({
    props: {
      title: getThemeTranslation(['auth', 'login', 'title']),
      seperate: getThemeTranslation(['auth', 'login', 'seperate']),
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
  footer: createSection<'auth', 'footer'>({
    props: {
      logo: { mime: 'image/png' },
      description: getThemeTranslation(['auth', 'footer', 'description']),
      navigationItems: {
        registration: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'registration', 'label']),
          colSpan: 3,
          items: [
            {
              href: '/become-creator',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-0',
                'label',
              ]),
            },
            {
              href: '/become-writer',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-1',
                'label',
              ]),
            },
            {
              href: '/organization',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-2',
                'label',
              ]),
            },
          ],
        },
        terms: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'label']),
          colSpan: 3,
          items: [
            {
              href: '/terms',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-0', 'label']),
            },
            {
              href: '/faq',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-1', 'label']),
            },
          ],
        },
        social: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'label']),
          colSpan: 2,
          items: [
            {
              href: 'https://discord.com/invite/hWq4TXEDxW',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-0', 'label']),
            },
            {
              href: 'https://t.me/+z2s3BWk8jZhkNzY1',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-1', 'label']),
            },
            {
              href: 'https://www.facebook.com/openedu101',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-2', 'label']),
            },
          ],
        },
      },
      className: 'bg-primary',
      variant: 'org',
    },
    order: 6,
  }),
});

export const createAvailAuthLayoutConfig = (getThemeTranslation: (path: string[]) => string) => ({
  login: createSection<'auth', 'login'>({
    props: {
      title: getThemeTranslation(['auth', 'login', 'title']),
      seperate: getThemeTranslation(['auth', 'login', 'seperate']),
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
          id: 'courses',
          label: 'Courses',
          href: '/courses',
          isHighlight: false,
        },
        { id: 'blog', label: 'Blog', href: '/blog', isHighlight: false },
      ],
    },
    order: 5,
  }),
  footer: createSection<'auth', 'footer'>({
    props: {
      logo: { mime: 'image/png' },
      description: getThemeTranslation(['auth', 'footer', 'description']),
      navigationItems: {
        registration: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'registration', 'label']),
          colSpan: 3,
          items: [
            {
              href: '/courses/course-avail-36779',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-0',
                'label',
              ]),
            },
            {
              href: '/blog',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-1',
                'label',
              ]),
            },
          ],
        },
        terms: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'label']),
          colSpan: 3,
          items: [
            {
              href: 'https://www.availproject.org/',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-0', 'label']),
            },
          ],
        },
        social: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'label']),
          colSpan: 2,
          items: [
            {
              href: 'https://t.me/avail_vietnam',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-0', 'label']),
            },
            {
              href: 'https://x.com/avail_vietnam',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-1', 'label']),
            },
          ],
        },
      },
      className: 'bg-primary',
      variant: 'org',
    },
    order: 6,
  }),
});

export const createVbiAuthLayoutConfig = (getThemeTranslation: (path: string[]) => string) => ({
  login: createSection<'auth', 'login'>({
    props: {
      title: getThemeTranslation(['auth', 'login', 'title']),
      seperate: getThemeTranslation(['auth', 'login', 'seperate']),
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
          id: 'courses',
          label: 'Courses',
          href: '/courses',
          isHighlight: false,
        },
        { id: 'blog', label: 'Blog', href: '/blog', isHighlight: false },
        { id: 'partners', label: 'Partners', href: '/partners', isHighlight: false },
        { id: 'aboutus', label: 'About Us', href: '/about-us', isHighlight: false },
      ],
    },
    order: 5,
  }),
  footer: createSection<'auth', 'footer'>({
    props: {
      logo: { mime: 'image/png' },
      description: getThemeTranslation(['auth', 'footer', 'description']),
      navigationItems: {
        registration: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'registration', 'label']),
          colSpan: 3,
          items: [
            {
              href: '/about-us',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-0',
                'label',
              ]),
            },
            {
              href: '/partners',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-1',
                'label',
              ]),
            },
          ],
        },
        terms: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'label']),
          colSpan: 3,
          items: [
            {
              href: '/terms',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-0', 'label']),
            },
            {
              href: '/faq',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-1', 'label']),
            },
          ],
        },
        social: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'label']),
          colSpan: 2,
          items: [
            {
              href: 'https://www.facebook.com/VBIAcademy',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-0', 'label']),
            },
            {
              href: 'https://x.com/vbi_academy',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-1', 'label']),
            },
            {
              href: 'https://www.linkedin.com/company/vbi-academy',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-1', 'label']),
            },
            {
              href: 'https://www.youtube.com/@VBIAcademy',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-1', 'label']),
            },
          ],
        },
      },
      className: 'bg-primary',
      variant: 'org',
    },
    order: 6,
  }),
});

export const createAieduAuthLayoutConfig = (getThemeTranslation: (path: string[]) => string) => ({
  login: createSection<'auth', 'login'>({
    props: {
      title: getThemeTranslation(['auth', 'login', 'title']),
      seperate: getThemeTranslation(['auth', 'login', 'seperate']),
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
          id: 'introduction',
          label: 'Giới thiệu',
          href: '/introduction',
          isHighlight: false,
        },
        {
          id: 'ranking',
          label: 'Bảng xếp hạng',
          href: '/ranking',
          isHighlight: false,
        },
        {
          id: 'courses',
          label: 'Khoá học AI',
          href: '/courses',
          isHighlight: false,
        },
        { id: 'blog', label: 'Tin tức', href: '/blog', isHighlight: false },
        { id: 'schedule', label: 'Lịch trình', href: '/schedule', isHighlight: false },
      ],
    },
    order: 5,
  }),
  footer: createSection<'auth', 'footer'>({
    props: {
      logo: { mime: 'image/png' },
      description: getThemeTranslation(['auth', 'footer', 'description']),
      navigationItems: {
        registration: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'registration', 'label']),
          colSpan: 3,
          items: [
            {
              href: '/introduction',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-0',
                'label',
              ]),
            },
            {
              href: '/ranking',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-1',
                'label',
              ]),
            },
            {
              href: '/courses',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-2',
                'label',
              ]),
            },
            {
              href: '/schedule',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-3',
                'label',
              ]),
            },
            {
              href: '/blog',
              label: getThemeTranslation([
                'auth',
                'footer',
                'navigationItems',
                'registration',
                'items',
                'items-4',
                'label',
              ]),
            },
          ],
        },
        terms: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'label']),
          colSpan: 3,
          items: [
            {
              href: '/',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-0', 'label']),
            },
            {
              href: '/',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-1', 'label']),
            },
            {
              href: '/',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-2', 'label']),
            },
            {
              href: '/',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'terms', 'items', 'items-3', 'label']),
            },
          ],
        },
        social: {
          label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'label']),
          colSpan: 3,
          items: [
            {
              href: '/terms',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-0', 'label']),
            },
            {
              href: '/faq',
              label: getThemeTranslation(['auth', 'footer', 'navigationItems', 'social', 'items', 'items-1', 'label']),
            },
          ],
        },
      },
      className: 'bg-primary',
      variant: 'org',
    },
    order: 6,
  }),
});
