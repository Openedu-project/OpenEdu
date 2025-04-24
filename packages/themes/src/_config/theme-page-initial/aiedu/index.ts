import type { PagesConfig, ThemePageKey } from '../../../_types';
import { createAieduAuthLayoutConfig } from '../core/auth';
import { defaultMetadataAtPage } from '../core/metadata';
import { createAiEduHomepageConfig } from './homepage';
import { createAiEduIntroductionConfig } from './introduction';

// Theme step 11 (optionals): create the org config object
export const createAieduConfig = (
  t: (key: string) => string,
  aieduT: (path: string[]) => string
): PagesConfig<ThemePageKey> => ({
  // Theme step 12 (optional): add value with the ${pageKey}
  homepage: {
    label: t('labels.homepage'),
    config: createAiEduHomepageConfig(aieduT),
    metadata: defaultMetadataAtPage,
  },
  //Theme step 13 (optional): The ${auth} page is required
  auth: {
    label: t('labels.authLayout'),
    config: createAieduAuthLayoutConfig(aieduT),
    metadata: undefined,
  },
  introduction: {
    label: t('labels.introduction'),
    config: createAiEduIntroductionConfig(aieduT),
    metadata: defaultMetadataAtPage,
  },
  ranking: {
    label: t('labels.ranking'),
    config: undefined,
    metadata: defaultMetadataAtPage,
  },
  schedule: {
    label: t('labels.schedule'),
    config: undefined,
    metadata: defaultMetadataAtPage,
  },
});
