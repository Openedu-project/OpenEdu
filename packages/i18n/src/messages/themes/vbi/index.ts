import { authMessages } from '../auth';
import { vbiAboutUs } from './about-us';
import { vbiHomepage } from './homepage';
import { vbiPartners } from './partners';

export const vbiMessage = {
  vbi: {
    ...vbiHomepage,
    ...authMessages,
    ...vbiAboutUs,
    ...vbiPartners,
  },
};
