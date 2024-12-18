import { dateTimePickerMessages } from './date-time-picker';
import { formValidationMessages } from './form-validation';
import { blogFormMessages } from './blog-form';
import { categorySelectionMessages } from './category-selection';
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
  ...categorySelectionMessages,
};
