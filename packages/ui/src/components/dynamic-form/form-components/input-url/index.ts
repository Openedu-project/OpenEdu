'use client';

import dynamic from 'next/dynamic';

export const InputURL = dynamic(() => import('#components/input-url').then(mod => mod.InputURL));
