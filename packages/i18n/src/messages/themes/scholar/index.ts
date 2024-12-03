import { academiaHomepage } from '../academia/homepage';
import { authMessages } from '../auth';

export const ScholarMessage = {
  scholar: {
    ...academiaHomepage,
    ...authMessages,
  },
};
