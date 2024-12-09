import type { FormFieldType } from '../../types';

export const emailDefaultConfig: FormFieldType = {
  fieldType: 'email',
  name: 'email',
  label: 'Email',
  placeholder: 'Enter email',
  description: 'This is an email description',
  infoText: 'This is a text info',
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
