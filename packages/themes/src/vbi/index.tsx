'use client';
import dynamic from 'next/dynamic';

import type { VbiHomepageAchievementsProps } from './homepage/vbi-achievements';
import type { VbiHomepageHeroProps } from './homepage/vbi-hero';
import type { VbiHomepagePartnersProps } from './homepage/vbi-partners';

export const VbiHomepage = dynamic(() => import('./homepage'));
export const VbiHomepageHero = dynamic(() => import('./homepage/vbi-hero'));
export const VbiHomepagePartners = dynamic(() => import('./homepage/vbi-partners'));
export const VbiHomepageAchievements = dynamic(() => import('./homepage/vbi-achievements'));

export type { VbiHomepageHeroProps, VbiHomepagePartnersProps, VbiHomepageAchievementsProps };
