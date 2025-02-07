import type { FormFieldType } from '../../types';

export const textareaDefaultConfig: FormFieldType = {
  fieldId: 'textarea',
  fieldType: 'textarea',
  name: 'textarea',
  label: 'Textarea',
  placeholder: 'Enter textarea',
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
