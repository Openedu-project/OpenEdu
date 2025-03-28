import { authMessages } from '../auth';
import { fenetHomepage } from './homepage';

export const fenetMessage = {
  fenet: {
    ...fenetHomepage,
    ...authMessages,
  },
};
