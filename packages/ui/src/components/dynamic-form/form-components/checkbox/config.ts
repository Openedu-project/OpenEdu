import type { FormFieldType } from '../../types';

export const checkboxDefaultConfig: FormFieldType = {
  fieldType: 'checkbox',
  name: 'checkbox',
  label: 'Checkbox',
  placeholder: 'Enter checkbox',
  description: 'This is a checkbox description',
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
  border: true,
};
