import type { FormFieldType } from '../../types';

export const selectboxDefaultConfig: FormFieldType = {
  fieldType: 'selectbox',
  name: 'selectbox',
  label: 'Selectbox',
  placeholder: 'Selectbox',
  description: 'This is a description for selectbox',
  infoText: 'This is a text info for selectbox',
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
  options: [
    {
      id: 'option1',
      value: 'value-1',
      label: 'Label 1',
    },
  ],
};
