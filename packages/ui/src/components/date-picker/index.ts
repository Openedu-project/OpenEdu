import dynamic from 'next/dynamic';

import type { DatePickerType } from './date-picker';
export type { IDate } from './date-picker';

export const DatePicker = dynamic(() => import('./date-picker').then(mod => mod.DatePicker)) as DatePickerType;
