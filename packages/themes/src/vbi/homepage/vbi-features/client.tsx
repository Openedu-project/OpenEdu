'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageFeatures } from './vbi-features';

const VbiHomepageFeaturesClient: SectionComponent<'homepage', 'vbiFeatures'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiFeatures');
  return <VbiHomepageFeatures {...props} t={t} />;
};

export { VbiHomepageFeaturesClient };
