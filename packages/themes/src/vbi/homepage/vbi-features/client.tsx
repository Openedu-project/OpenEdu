'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageFeaturesBase from './vbi-features';

const VbiHomepageFeaturesClient: SectionComponent<'homepage', 'vbiFeatures'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiFeatures');
  return <VbiHomepageFeaturesBase {...props} t={t} />;
};

export default VbiHomepageFeaturesClient;
