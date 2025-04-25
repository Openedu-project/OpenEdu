'use client';

import dynamic from 'next/dynamic';

export const Checkbox = dynamic(() => import('#shadcn/radio-group').then(mod => mod.RadioGroup));
