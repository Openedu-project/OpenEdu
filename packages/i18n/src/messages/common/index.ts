import { authMessages } from './auth';
import { errorMessages } from './errors';
import { generalMessages } from './general';
import { toastMessages } from './toast';

export const commonMessages = {
  ...generalMessages,
  ...errorMessages,
  ...toastMessages,
  ...authMessages,
};
