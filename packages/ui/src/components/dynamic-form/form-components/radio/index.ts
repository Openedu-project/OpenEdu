'use client';

import dynamic from 'next/dynamic';

export const Radio = dynamic(() => import('#components/radio').then(mod => mod.Radio));
