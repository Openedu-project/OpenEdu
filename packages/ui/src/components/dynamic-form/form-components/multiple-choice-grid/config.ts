import type { FormFieldType } from '../../types';

export const multipleChoiceGridDefaultConfig: FormFieldType = {
  fieldId: 'multiple-choice-grid',
  fieldType: 'multipleChoiceGrid',
  name: 'multipleChoiceGrid',
  label: 'Multiple Choice Grid',
  placeholder: '...',
  description: 'This is a description for multiple choice grid',
  infoText: 'This is a text info for multiple choice grid',
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
  options: undefined,
  rows: [
    {
      id: 'row1',
      text: 'Row 1',
    },
  ],
  columns: [
    {
      id: 'column1',
      text: 'Column 1',
    },
  ],
};
