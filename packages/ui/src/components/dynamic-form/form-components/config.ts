import type { FormComponent, FormFieldType } from '../types';
import { checkboxDefaultConfig } from './checkbox/config';
import { dateTimePickerDefaultConfig } from './date-time-picker/config';
import { emailDefaultConfig } from './email/config';
import { headingConfig } from './heading/config';
import { formImageDefaultConfig } from './image/config';
import { inputCurrencyDefaultConfig } from './input-currency/config';
import { inputNumberDefaultConfig } from './input-number/config';
import { inputPasswordDefaultConfig } from './input-password/config';
import { inputPhoneNumberDefaultConfig } from './input-phonenumber/config';
// import { inputUrlDefaultConfig } from './input-url/config';
import { inputDefaultConfig } from './input/config';
import { multipleSelectionDefaultConfig } from './multiple-selection/config';
import { paragraphConfig } from './paragraph/config';
import { selectboxDefaultConfig } from './selectbox/config';
import { spaceConfig } from './space/config';
import { submitButtonDefaultConfig } from './submit-button/config';
import { textareaDefaultConfig } from './textarea/config';

export const config: Partial<Record<FormComponent, FormFieldType>> = {
  heading: headingConfig,
  paragraph: paragraphConfig,
  space: spaceConfig,
  input: inputDefaultConfig,
  textarea: textareaDefaultConfig,
  inputNumber: inputNumberDefaultConfig,
  email: emailDefaultConfig,
  inputCurrency: inputCurrencyDefaultConfig,
  inputPhoneNumber: inputPhoneNumberDefaultConfig,
  inputPassword: inputPasswordDefaultConfig,
  // inputUrl: inputUrlDefaultConfig,
  datetimePicker: dateTimePickerDefaultConfig,
  checkbox: checkboxDefaultConfig,
  selectbox: selectboxDefaultConfig,
  multipleSelection: multipleSelectionDefaultConfig,
  image: formImageDefaultConfig,
  submitButton: submitButtonDefaultConfig,
};
