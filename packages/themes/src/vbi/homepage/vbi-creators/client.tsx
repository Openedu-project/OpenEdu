'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageCreators } from './vbi-creators';

const VbiHomepageCreatorsClient: SectionComponent<'homepage', 'vbiCreators'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiCreators');
  return <VbiHomepageCreators {...props} t={t} />;
};

export { VbiHomepageCreatorsClient };
