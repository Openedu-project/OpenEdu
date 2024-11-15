import dynamic from 'next/dynamic';
export type * from './types';

export const Tree = dynamic(() => import('./sortable-tree').then(mod => mod.SortableTree));
