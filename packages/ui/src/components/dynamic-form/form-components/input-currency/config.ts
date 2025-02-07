import type { FormFieldType } from '../../types';

export const inputCurrencyDefaultConfig: FormFieldType = {
  fieldId: 'input-currency',
  fieldType: 'inputCurrency',
  name: 'input-currency',
  label: 'Input Currency',
  placeholder: 'Enter input currency',
  description: 'This is a description for input currency',
  infoText: 'This is a text info for input currency',
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
