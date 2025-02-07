'use client';

import dynamic from 'next/dynamic';

export const InputNumber = dynamic(() => import('#components/input-number').then(mod => mod.InputNumber));
