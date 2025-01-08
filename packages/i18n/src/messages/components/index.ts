import { blogFormMessages } from './blog-form';
import { dateTimePickerMessages } from './date-time-picker';
import { dialogMessages } from './dialog';
import { formValidationMessages } from './form-validation';
import { loginRequiredMessages } from './login-required-modal';
import { paymentButtonMessages } from './payment-button';
import { richTextMessages } from './rich-text';
import { tableMessages } from './table';
import { uploaderMessages } from './uploader';

export const componentMessages = {
  ...formValidationMessages,
  ...richTextMessages,
  ...tableMessages,
  ...uploaderMessages,
  ...dateTimePickerMessages,
  ...blogFormMessages,
  ...dialogMessages,
  ...blogFormMessages,
  ...dialogMessages,
  ...loginRequiredMessages,
  ...paymentButtonMessages,
};
