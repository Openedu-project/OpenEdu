'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiPartnersFeatures } from './vbi-features';

const VbiPartnerFeaturesClient: SectionComponent<'partners', 'vbiPartnerFeatures'> = props => {
  const t = useTranslations('themePage.vbi.partners.vbiPartnerFeatures');
  return <VbiPartnersFeatures {...props} t={t} />;
};

export { VbiPartnerFeaturesClient };
