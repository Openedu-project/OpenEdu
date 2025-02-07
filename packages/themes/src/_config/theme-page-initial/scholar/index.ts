import type { PagesConfig, ThemePageKey } from '../../../_types';
import { createAuthLayoutConfig } from '../core/auth';
import { defaultMetadataAtPage } from '../core/metadata';
import { createScholarHomepageConfig } from './homepage';

export const createScholarConfig = (
  t: (key: string) => string,
  scholarT: (path: string[]) => string
): PagesConfig<ThemePageKey> => ({
  homepage: {
    label: t('labels.homepage'),
    config: createScholarHomepageConfig(scholarT),
    metadata: defaultMetadataAtPage,
  },
  'about-us': {
    label: t('labels.aboutus'),
    config: undefined,
    metadata: defaultMetadataAtPage,
  },
  auth: {
    label: t('labels.authLayout'),
    config: createAuthLayoutConfig(scholarT),
    metadata: undefined,
  },
});
