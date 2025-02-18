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
            href: '/blog',
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
    },
  },
};
