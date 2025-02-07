'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageMapBase from './vbi-map';

const VbiHomepageMapClient: SectionComponent<'homepage', 'vbiMap'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiMap');
  return <VbiHomepageMapBase {...props} t={t} />;
};

export default VbiHomepageMapClient;
