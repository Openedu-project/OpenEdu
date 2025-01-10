import { authMessages } from '../auth';
import { scholarHomepage } from './homepage';

export const ScholarMessage = {
  scholar: {
    ...scholarHomepage,
    ...authMessages,
  },
};
