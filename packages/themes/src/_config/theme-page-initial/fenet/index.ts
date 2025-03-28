import type { PagesConfig, ThemePageKey } from '../../../_types';
import { createAuthLayoutConfig } from '../core/auth';
import { defaultMetadataAtPage } from '../core/metadata';
import { createFenetHomepageConfig } from './homepage';

export const createFenetConfig = (
  t: (key: string) => string,
  fenetT: (path: string[]) => string
): PagesConfig<ThemePageKey> => ({
  homepage: {
    label: t('labels.homepage'),
    config: createFenetHomepageConfig(fenetT),
    metadata: defaultMetadataAtPage,
  },
  auth: {
    label: t('labels.authLayout'),
    config: createAuthLayoutConfig(fenetT),
    metadata: undefined,
  },
});
