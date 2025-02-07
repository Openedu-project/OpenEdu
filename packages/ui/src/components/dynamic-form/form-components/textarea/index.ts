'use client';

import dynamic from 'next/dynamic';

export const Textarea = dynamic(() => import('#shadcn/textarea').then(mod => mod.Textarea));
