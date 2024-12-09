import type { FormFieldType } from '../../types';

export const inputDefaultConfig: FormFieldType = {
  fieldType: 'input',
  name: 'input',
  label: 'Input',
  placeholder: 'Enter input',
  description: 'This is a description',
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
