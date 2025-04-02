'use client';

import dynamic from 'next/dynamic';

export const MultipleSelection = dynamic(() =>
  import('#components/multiple-selection').then(mod => mod.MultipleSelection)
);
