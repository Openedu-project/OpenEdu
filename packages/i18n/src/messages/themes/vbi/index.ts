import { authMessages } from '../auth';
import { vbiHomepage } from './homepage';

export const vbiMessage = {
  vbi: {
    ...vbiHomepage,
    ...authMessages,
  },
};
