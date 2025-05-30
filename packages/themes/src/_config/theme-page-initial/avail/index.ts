import type { PagesConfig, ThemePageKey } from '../../../_types';
import { createAvailAuthLayoutConfig } from '../core/auth';
import { defaultMetadataAtPage } from '../core/metadata';
import { createAvailHomepageConfig } from './homepage';

export const createAvailConfig = (
  t: (key: string) => string,
  availT: (path: string[]) => string
): PagesConfig<ThemePageKey> => ({
  homepage: {
    label: t('labels.homepage'),
    config: createAvailHomepageConfig(availT),
    metadata: defaultMetadataAtPage,
  },
  auth: {
    label: t('labels.authLayout'),
    config: createAvailAuthLayoutConfig(availT),
    metadata: undefined,
  },
});
