// import dynamic from 'next/dynamic';
export type * from './types';

// export const Tree = dynamic(() => import('./tree').then(mod => mod.Tree));
import { Tree } from './tree';
export { Tree };
