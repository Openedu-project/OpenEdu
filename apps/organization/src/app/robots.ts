import { AUTH_ROUTES, PROTECTED_ROUTES } from '@oe/core';
import type { MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isProduction = process.env.NODE_ENV === 'production';

  const rules: MetadataRoute.Robots['rules'] = [
    {
      userAgent: '*',
      allow: isProduction ? '/' : [],
      disallow: isProduction
        ? [
            '/api/',
            ...Object.values(PROTECTED_ROUTES).map(route => `${route}/`),
            ...Object.values(AUTH_ROUTES).map(route => `${route}/`),
          ]
        : '/',
    },
  ];

  return {
    rules,
    sitemap: isProduction ? `${process.env.NEXT_PUBLIC_APP_ORIGIN}/sitemap.xml` : '',
  };
}
