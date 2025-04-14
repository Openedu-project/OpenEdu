'use client';

import dynamic from 'next/dynamic';

export const FormImage = dynamic(() => import('./image').then(mod => mod.FormImage));
