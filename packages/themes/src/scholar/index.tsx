'use client';
import dynamic from 'next/dynamic';

import type { ScholarHomepageAboutUsProps } from './homepage/scholar-about-us';
import type { ScholarHomepageHeroProps } from './homepage/scholar-hero';
import type { ScholarHomepageServiceProps } from './homepage/scholar-service';
export const ScholarHomePage = dynamic(() => import('./homepage'));
export const ScholarHomepageHero = dynamic(() => import('./homepage/scholar-hero'));
export const ScholarHomepageService = dynamic(() => import('./homepage/scholar-service'));
export const ScholarHomepageAboutUs = dynamic(() => import('./homepage/scholar-about-us'));

export const ScholarAboutUs = dynamic(() => import('./about-us'));

export type { ScholarHomepageHeroProps, ScholarHomepageServiceProps, ScholarHomepageAboutUsProps };
