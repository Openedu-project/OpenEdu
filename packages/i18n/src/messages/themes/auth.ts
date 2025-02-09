import { authMessages as authCommon } from '../common/auth';
export const authMessages = {
  auth: {
    ...authCommon.auth,
    header: {
      sidebarItems: {
        'sidebarItems-0': {
          id: 'blog',
          href: '/blog',
          label: 'Blog',
        },
        'sidebarItems-1': {
          id: 'courses',
          href: '/courses',
          label: 'Courses',
        },
      },
    },
    footer: {
      description:
        "A dynamic platform for learns, instructors, organizations to engage and share knowledge. We aim to add value to our learner's journey.",
      navigationItems: {
        registration: {
          label: 'Registration',
          items: {
            'items-0': {
              label: 'Become Educator',
            },
            'items-1': {
              label: 'Become Writer',
            },
            'items-2': {
              label: 'Become Organization',
            },
          },
        },
        terms: {
          label: 'Terms & Condition',
          items: {
            'items-0': {
              label: 'Openedu T&C',
            },
            'items-1': {
              label: 'Openedu FAQ',
            },
          },
        },
        social: {
          label: 'Social',
          items: {
            'items-0': {
              label: 'Facebook',
            },
            'items-1': {
              label: 'Telegram',
            },
            'items-2': {
              label: 'Facebook',
            },
          },
        },
      },
    },
  },
};
