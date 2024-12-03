import { authMessages } from '../auth';
import { academiaHomepage } from './homepage';

export const AcademiaMessage = {
  academia: {
    ...academiaHomepage,
    ...authMessages,
  },
};
