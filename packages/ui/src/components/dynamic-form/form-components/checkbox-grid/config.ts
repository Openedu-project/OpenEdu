import type { FormFieldType } from '../../types';

export const checkboxGridDefaultConfig: FormFieldType = {
  fieldId: 'checkbox-grid',
  fieldType: 'checkboxGrid',
  name: 'checkboxGrid',
  label: 'Checkbox Grid',
  placeholder: 'Checkbox grid...',
  description: 'This is a description for checkbox grid',
  infoText: 'This is a text info for checkbox grid',
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
