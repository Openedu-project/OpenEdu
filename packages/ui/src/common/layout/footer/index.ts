'use client';
import dynamic from 'next/dynamic';
import { Footer, type FooterProps, type NavigationItem, type NavigationLink } from './footer';

export const FooterLazy = dynamic(() => import('./footer').then(mod => mod.Footer), { ssr: false });

export { Footer, type FooterProps, type NavigationItem, type NavigationLink };
