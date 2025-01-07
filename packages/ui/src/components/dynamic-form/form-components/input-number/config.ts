import type { FormFieldType } from '../../types';

export const inputNumberDefaultConfig: FormFieldType = {
  fieldId: 'input-number',
  fieldType: 'inputNumber',
  name: 'input-number',
  label: 'Number Input',
  placeholder: 'Enter a number',
  description: 'This is a description',
  infoText: 'This is a text information for number input',
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
