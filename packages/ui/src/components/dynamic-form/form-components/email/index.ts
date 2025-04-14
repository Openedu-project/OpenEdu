'use client';

import dynamic from 'next/dynamic';

export const EmailInput = dynamic(() => import('./email-input').then(mod => mod.EmailInput));
