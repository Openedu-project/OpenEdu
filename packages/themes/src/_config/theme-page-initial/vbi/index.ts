import type { PagesConfig, ThemePageKey } from '../../../_types';
import { createVbiAuthLayoutConfig } from '../core/auth';
import { defaultMetadataAtPage } from '../core/metadata';
import { createVbiAboutUsConfig } from './about-us';
import { createVbiHomepageConfig } from './homepage';
import { createVbiPartnersConfig } from './partners';

export const createVbiConfig = (
  t: (key: string) => string,
  vbiT: (path: string[]) => string
): PagesConfig<ThemePageKey> => ({
  homepage: {
    label: t('labels.homepage'),
    config: createVbiHomepageConfig(vbiT),
    metadata: defaultMetadataAtPage,
  },
  'about-us': {
    label: t('labels.aboutus'),
    config: createVbiAboutUsConfig(vbiT),
    metadata: defaultMetadataAtPage,
  },
  auth: {
    label: t('labels.authLayout'),
    config: createVbiAuthLayoutConfig(vbiT),
    metadata: undefined,
  },
  partners: {
    label: t('labels.partners'),
    config: createVbiPartnersConfig(vbiT),
    metadata: defaultMetadataAtPage,
  },
});
