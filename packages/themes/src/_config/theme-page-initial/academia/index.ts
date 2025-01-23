import type { PagesConfig, ThemePageKey } from '../../../_types';
import { createAuthLayoutConfig } from '../core/auth';
import { defaultMetadataAtPage } from '../core/metadata';
import { createAcademiaHomepageConfig } from './homepage';

export const createAcademiaConfig = (
  t: (key: string) => string,
  academiaT: (path: string[]) => string
): PagesConfig<ThemePageKey> => ({
  homepage: {
    label: t('labels.homepage'),
    config: createAcademiaHomepageConfig(academiaT),
    metadata: {
      title: 'Homepage',
      description: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      canonical: '',
      robotsIndex: true,
      robotsFollow: true,
    },
  },
  'about-us': {
    label: t('labels.aboutus'),
    config: undefined,
    metadata: defaultMetadataAtPage,
  },
  auth: {
    label: t('labels.authLayout'),
    config: createAuthLayoutConfig(academiaT),
    metadata: undefined,
  },
});
