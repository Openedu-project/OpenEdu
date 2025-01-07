import { dateTimePickerMessages } from './date-time-picker';
import { dialogMessages } from './dialog';
import { formValidationMessages } from './form-validation';
import { richTextMessages } from './rich-text';
import { tableMessages } from './table';
import { uploaderMessages } from './uploader';

export const componentMessages = {
  ...formValidationMessages,
  ...richTextMessages,
  ...tableMessages,
  ...uploaderMessages,
  ...dateTimePickerMessages,
  ...dialogMessages,
};
