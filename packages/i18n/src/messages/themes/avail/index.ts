import { authMessages } from '../auth';
import { availHomepage } from './homepage';

export const availMessage = {
  avail: {
    ...availHomepage,
    ...authMessages,
  },
};
