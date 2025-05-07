import { authMessages } from '../auth';
import { vbiAboutUs } from './about-us';
import { vbiHomepage } from './homepage';
import { vbiPartners } from './partners';

export const vbiMessage = {
  vbi: {
    ...vbiHomepage,
    ...vbiAboutUs,
    ...vbiPartners,
    auth: {
      ...authMessages.auth,
      header: {
        sidebarItems: {
          'sidebarItems-0': {
            id: 'courses',
            href: '/courses',
            label: 'Courses',
          },
          'sidebarItems-1': {
            id: 'blog',
            href: '/news-feed',
            label: 'Blog',
          },
          'sidebarItems-2': {
            id: 'partners',
            href: '/partners',
            label: 'Partners',
          },
          'sidebarItems-3': {
            id: 'aboutus',
            href: '/about-us',
            label: 'About Us',
          },
        },
      },
      footer: {
        description:
          'The largest Blockchain and Web3 training academy in Vietnam, specializing in providing comprehensive technology training solutions and connecting the developer community with businesses, from strategic consulting to planning and execution.',
        navigationItems: {
          registration: {
            label: 'Information',
            items: {
              'items-0': {
                label: 'About Us',
              },
              'items-1': {
                label: 'Partners',
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
                label: 'X',
              },
              'items-2': {
                label: 'LinkedIn',
              },
              'items-3': {
                label: 'Youtube',
              },
            },
          },
        },
      },
    },
  },
};
