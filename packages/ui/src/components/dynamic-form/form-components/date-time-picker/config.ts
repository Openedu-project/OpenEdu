import type { FormFieldType } from '../../types';

export const dateTimePickerDefaultConfig: FormFieldType = {
  fieldId: 'datetime-picker',
  fieldType: 'datetimePicker',
  name: 'dateTime-picker',
  label: 'Date Time Picker',
  placeholder: 'Pick a date and time',
  description: 'This is a description for date time picker',
  infoText: 'This is a text info for date time picker',
  disabled: false,
  value: '',
  checked: false,
  rowIndex: 0,
  required: true,
  locale: 'en',
  hour12: false,
  className: '',
};
