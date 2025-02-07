'use client';

import dynamic from 'next/dynamic';

export const InputCurrency = dynamic(() => import('#components/input-currency').then(mod => mod.InputCurrency));
