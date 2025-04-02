'use client';

import dynamic from 'next/dynamic';

export const CheckboxGrid = dynamic(() => import('#components/checkbox-grid').then(mod => mod.CheckboxGrid));
