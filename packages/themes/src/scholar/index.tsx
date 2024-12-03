'use client';
import dynamic from 'next/dynamic';

export const ScholarHomePage = dynamic(() => import('./homepage'));
export const ScholarAboutUs = dynamic(() => import('./about-us'));
