'use client';

import dynamic from 'next/dynamic';

export const InputPassword = dynamic(() => import('#components/input-password').then(mod => mod.InputPassword));
