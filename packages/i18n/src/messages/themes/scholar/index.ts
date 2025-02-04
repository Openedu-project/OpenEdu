import { authMessages } from '../auth';
import { scholarHomepage } from './homepage';

export const scholarMessage = {
  scholar: {
    ...scholarHomepage,
    ...authMessages,
  },
};
