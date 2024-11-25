import { organizationsService } from '@oe/api/services/organizations';
import { AUTH_ROUTES, PROTECTED_ROUTES } from '@oe/core/utils/routes';
import type { MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isProduction = process.env.NODE_ENV === 'production';

  const organizationsPagination = await organizationsService(null, {
    queryParams: { isActive: true, per_page: 99999 },
  });
  const organizations = organizationsPagination.results;

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
    sitemap: isProduction ? [...organizations.map(organization => `https://${organization.domain}/sitemap.xml`)] : [],
  };
}
