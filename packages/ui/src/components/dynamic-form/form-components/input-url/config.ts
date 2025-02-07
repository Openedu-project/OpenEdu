import type { FormFieldType } from '../../types';

export const inputUrlDefaultConfig: FormFieldType = {
  fieldId: 'input-url',
  fieldType: 'inputUrl',
  name: 'input-url',
  label: 'Input URL',
  placeholder: 'Enter input url',
  description: 'This is a description for input url',
  infoText: 'This is a text info for input url',
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
