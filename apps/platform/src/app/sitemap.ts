import { organizationsService } from '@oe/api/services/organizations';
import { getSystemConfig } from '@oe/api/services/system-config';
import { systemConfigKeys } from '@oe/api/utils/system-config';
import { SITEMAP_ROUTES } from '@oe/core/utils/routes';
import { DEFAULT_LOCALES } from '@oe/i18n/constants';
import type { LanguageCode } from '@oe/i18n/languages';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const organizationsPagination = await organizationsService(null, {
    queryParams: { isActive: true, per_page: 99999 },
  });
  const organizations = organizationsPagination.results;
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const organization of organizations) {
    const baseUrl = `https://${organization.domain}`;
    const i18nConfigResponse = await getSystemConfig<{ locales: LanguageCode[]; defaultLocale: LanguageCode }>(
      undefined,
      {
        key: systemConfigKeys.i18nConfig,
      }
    );

    const { locales } = i18nConfigResponse?.value ?? {};

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
