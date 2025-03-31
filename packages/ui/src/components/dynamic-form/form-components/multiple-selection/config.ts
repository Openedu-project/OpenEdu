import type { FormFieldType } from '../../types';

export const multipleSelectionDefaultConfig: FormFieldType = {
  fieldId: 'multiple-selection',
  fieldType: 'multipleSelection',
  name: 'multipleSelection',
  label: 'Multiple Selection',
  placeholder: 'Multiple Selection...',
  description: 'This is a description for multiple selection',
  infoText: 'This is a text info for multiple selection',
  disabled: false,
  value: undefined,
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
