import { DEFAULT_LOCALES } from '@oe/i18n';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return DEFAULT_LOCALES.map(locale => ({
    url: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
    alternates: {
      languages: {
        [locale]: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/${locale}`,
      },
    },
  }));
}
