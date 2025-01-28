'use client';
import dynamic from 'next/dynamic';
import type { AcademiaHomepageExploresProps } from './homepage/explores';
import type { AcademiaHomepageFeaturesProps } from './homepage/features';
import type { AcademiaHomepageHeroProps } from './homepage/hero';
import type { AcademiaHomepageOrganizationsProps } from './homepage/organizations';
import type { AcademiaHomepagePartnersProps } from './homepage/partners';

export const AcademiaHomePage = dynamic(() => import('./homepage'));
export const AcademiaHomepageHero = dynamic(() => import('./homepage/hero'));
export const AcademiaHomepageFeatures = dynamic(() => import('./homepage/features'));
export const AcademiaHomepagePartners = dynamic(() => import('./homepage/partners'));
export const AcademiaHomepageExplores = dynamic(() => import('./homepage/explores'));
export const AcademiaHomepageOrganizations = dynamic(() => import('./homepage/organizations'));

export const AcademiaAboutUs = dynamic(() => import('./about-us'));

export type {
  AcademiaHomepageFeaturesProps,
  AcademiaHomepageHeroProps,
  AcademiaHomepagePartnersProps,
  AcademiaHomepageExploresProps,
  AcademiaHomepageOrganizationsProps,
};
