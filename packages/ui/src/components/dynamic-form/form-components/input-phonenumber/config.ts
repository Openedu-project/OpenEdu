import type { FormFieldType } from '../../types';

export const inputPhoneNumberDefaultConfig: FormFieldType = {
  fieldId: 'input-phone-number',
  fieldType: 'inputPhoneNumber',
  name: 'input-phone-number',
  label: 'Input Phone Number',
  placeholder: 'Enter input phone number',
  description: 'This is a description for input phone number',
  infoText: 'This is a text info for input phone number',
  disabled: false,
  value: '',
  checked: false,
  rowIndex: 0,
  required: true,
  min: 1,
  max: 100,
  step: 1,
  locale: 'en',
  hour12: false,
  className: '',
};
