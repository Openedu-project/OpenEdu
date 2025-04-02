'use client';

import dynamic from 'next/dynamic';

export const MultipleChoiceGrid = dynamic(() =>
  import('#components/multiple-choice-grid').then(mod => mod.MultipleChoiceGrid)
);
