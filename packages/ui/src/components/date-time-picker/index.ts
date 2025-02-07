import dynamic from 'next/dynamic';
import type { DateTimePickerType } from './date-time-picker';

export type { DateTimePickerType } from './date-time-picker';

export const DateTimePicker = dynamic(() =>
  import('./date-time-picker').then(mod => mod.DateTimePicker)
) as DateTimePickerType;
