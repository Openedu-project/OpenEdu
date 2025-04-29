import type { FormFieldType } from '../../types';

export const radioDefaultConfig: FormFieldType = {
  fieldId: 'radio',
  fieldType: 'radio',
  name: 'radio',
  label: 'Radio',
  placeholder: 'Enter Radio',
  description: 'This is a radio description',
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
  border: false,
  options: [
    {
      id: 'option1',
      value: 'value-1',
      label: 'Label 1',
    },
  ],
  otherOption: false,
};
