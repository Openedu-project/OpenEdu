'use client';

import dynamic from 'next/dynamic';

export const Selectbox = dynamic(() => import('#components/selectbox').then(mod => mod.Selectbox));
