'use client';
import dynamic from 'next/dynamic';
import type { AcademiaHomepageExploresProps } from './homepage/explores';
import type { AcademiaHomepageFeaturesProps } from './homepage/features';
import type { AcademiaHomepageHeroProps } from './homepage/hero';
import type { AcademiaHomepageOrganizationsProps } from './homepage/organizations';
import type { AcademiaHomepagePartnersProps } from './homepage/partners';

export const AcademiaHomePage = dynamic(() => import('./homepage').then(mod => mod.Homepage));
export const AcademiaHomepageHero = dynamic(() => import('./homepage/hero').then(mod => mod.AcademiaHomepageHero));
export const AcademiaHomepageFeatures = dynamic(() =>
  import('./homepage/features').then(mod => mod.AcademiaHomepageFeatures)
);
export const AcademiaHomepagePartners = dynamic(() =>
  import('./homepage/partners').then(mod => mod.AcademiaHomepagePartners)
);
export const AcademiaHomepageExplores = dynamic(() =>
  import('./homepage/explores').then(mod => mod.AcademiaHomepageExplores)
);
export const AcademiaHomepageOrganizations = dynamic(() =>
  import('./homepage/organizations').then(mod => mod.AcademiaHomepageOrganizations)
);

export const AcademiaAboutUs = dynamic(() => import('./about-us').then(mod => mod.AcademiaAboutUs));

export type {
  AcademiaHomepageFeaturesProps,
  AcademiaHomepageHeroProps,
  AcademiaHomepagePartnersProps,
  AcademiaHomepageExploresProps,
  AcademiaHomepageOrganizationsProps,
};
