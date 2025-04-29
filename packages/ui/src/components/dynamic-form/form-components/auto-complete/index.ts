'use client';

import dynamic from 'next/dynamic';

export const AutoComplete = dynamic(() => import('./dynamic-auto-complete').then(mod => mod.DynamicAutoComplete));
