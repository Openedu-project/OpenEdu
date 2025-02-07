'use client';

import dynamic from 'next/dynamic';

export const Checkbox = dynamic(() => import('#shadcn/checkbox').then(mod => mod.Checkbox));
