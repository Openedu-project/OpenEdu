'use client';
import dynamic from 'next/dynamic';

// export const scholar: Theme = {
//   // description: 'Phong cách trang nhã, chuyên nghiệp',
//   HomePage: dynamic(() => import('./homepage')),
// };

export const ScholarHomePage = dynamic(() => import('./homepage'));
export const ScholarAboutUs = dynamic(() => import('./about-us'));
