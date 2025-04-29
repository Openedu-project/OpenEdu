import type { FormFieldType } from '../../types';

export const autoCompleteDefaultConfig: FormFieldType = {
  fieldId: 'autoComplete',
  fieldType: 'autoComplete',
  name: 'autoComplete',
  label: 'Auto Complete',
  placeholder: 'Auto Complete',
  description: 'This is a description for auto complete',
  infoText: 'This is a text info for auto complete',
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
  showSearch: true,
  options: [
    {
      id: 'option1',
      value: 'value-1',
      label: 'Label 1',
    },
  ],
};
