'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageCreatorsBase from './vbi-creators';

const VbiHomepageCreatorsClient: SectionComponent<'homepage', 'vbiCreators'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiCreators');
  return <VbiHomepageCreatorsBase {...props} t={t} />;
};

export default VbiHomepageCreatorsClient;
