'use client';

import dynamic from 'next/dynamic';

export const Input = dynamic(() => import('#shadcn/input').then(mod => mod.Input));
