import { getI18nConfigServer } from '@oe/api';
import { organizationsService } from '@oe/api';
import { SITEMAP_ROUTES } from '@oe/core';
import { DEFAULT_LOCALES } from '@oe/i18n';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const organizationsPagination = await organizationsService(null, {
    queryParams: { isActive: true, per_page: 99999 },
  });
  const organizations = organizationsPagination.results;
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const organization of organizations) {
    const baseUrl = `https://${organization.domain}`;
    const i18nConfigResponse = await getI18nConfigServer();

    const { locales } = i18nConfigResponse?.[0]?.value ?? {};

    for (const page of SITEMAP_ROUTES.filter(page => !page.isDynamic)) {
      for (const locale of locales ?? DEFAULT_LOCALES) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}${page.path}`,
          lastModified: new Date(),
          priority: page.priority,
          changeFrequency: page.changeFrequency,
          alternates: {
            languages: Object.fromEntries(locales?.map(locale => [locale, `${baseUrl}/${locale}/${page.path}`]) ?? []),
          },
        });
      }
    }
  }

  return sitemapEntries;
}
