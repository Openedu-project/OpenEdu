import { authMessages } from '../auth';
import { aieduHomepage } from './homepage';
// Theme step 19 (optional): add translate
export const aieduMessage = {
  //Theme step 19.1 Syntax ${themeName}: translate
  aiedu: {
    ...aieduHomepage,
    auth: {
      ...authMessages.auth,
      footer: {
        description: 'The essential base layer for modern blockchains.',
        navigationItems: {
          registration: {
            label: 'Information',
            items: {
              'items-0': {
                label: 'Avail Unlock',
              },
              'items-1': {
                label: 'Blog',
              },
            },
          },
          terms: {
            label: 'Partners',
            items: {
              'items-0': {
                label: 'Avail Project',
              },
            },
          },
          social: {
            label: 'Policy & Support',
            items: {
              'items-0': {
                label: 'Telegram',
              },
              'items-1': {
                label: 'X',
              },
            },
          },
        },
      },
    },
  },
};
