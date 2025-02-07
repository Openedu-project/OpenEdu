'use client';

import dynamic from 'next/dynamic';

export const SubmitButton = dynamic(() => import('./submit-button').then(mod => mod.SubmitButton));
