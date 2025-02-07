import type { FormFieldType } from '../../types';

export const inputPasswordDefaultConfig: FormFieldType = {
  fieldId: 'input-password',
  fieldType: 'inputPassword',
  name: 'input-password',
  label: 'Input Password',
  placeholder: 'Enter input password',
  description: 'This is a description for input password',
  infoText: 'This is a text info for input password',
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
