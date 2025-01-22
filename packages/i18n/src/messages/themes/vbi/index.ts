import { authMessages } from '../auth';
import { vbiAboutUs } from './about-us';
import { vbiHomepage } from './homepage';

export const vbiMessage = {
  vbi: {
    ...vbiHomepage,
    ...authMessages,
    ...vbiAboutUs,
  },
};
