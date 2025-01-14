'use client';
import dynamic from 'next/dynamic';

import type { VbiHomepageAchievementsProps } from './homepage/vbi-achievements';
import type { VbiHomepageCertProps } from './homepage/vbi-cert';
import type { VbiHomepageCoursesProps } from './homepage/vbi-courses';
import type { VbiHomepageFeaturesProps } from './homepage/vbi-features';
import type { VbiHomepageHeroProps } from './homepage/vbi-hero';

export const VbiHomepage = dynamic(() => import('./homepage'));
export const VbiHomepageHero = dynamic(() => import('./homepage/vbi-hero'));
export const VbiHomepageAchievements = dynamic(() => import('./homepage/vbi-achievements'));
export const VbiHomepageCourses = dynamic(() => import('./homepage/vbi-courses'));
export const VbiHomepageFeatures = dynamic(() => import('./homepage/vbi-features'));
export const VbiHomepageCert = dynamic(() => import('./homepage/vbi-cert'));
export type {
  VbiHomepageHeroProps,
  VbiHomepageAchievementsProps,
  VbiHomepageCoursesProps,
  VbiHomepageCertProps,
  VbiHomepageFeaturesProps,
};
