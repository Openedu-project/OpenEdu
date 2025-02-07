'use client';

import dynamic from 'next/dynamic';

export const DateTimePicker = dynamic(() => import('#components/date-time-picker').then(mod => mod.DateTimePicker));
