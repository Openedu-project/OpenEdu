import { authMessages } from '../auth';
import { academiaHomepage } from './homepage';

export const academiaMessage = {
  academia: {
    ...academiaHomepage,
    ...authMessages,
  },
};
