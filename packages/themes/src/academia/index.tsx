'use client';
import dynamic from 'next/dynamic';
// import type { Theme } from '../types';

// export const academia: Theme = {
//   // description: 'Phong cách trang nhã, chuyên nghiệp',
//   HomePage: dynamic(() => import('./homepage')),
// };

export const AcademiaHomePage = dynamic(() => import('./homepage'));
export const AcademiaAboutUs = dynamic(() => import('./about-us'));
