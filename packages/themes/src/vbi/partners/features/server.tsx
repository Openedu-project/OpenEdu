import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiPartnersFeatures } from './vbi-features';

const VbiPartnersFeaturesServer: SectionComponent<'partners', 'vbiPartnerFeatures'> = async props => {
  const t = await getTranslations('themePage.vbi.partners.vbiPartnerFeatures');
  return <VbiPartnersFeatures {...props} t={t} />;
};

export { VbiPartnersFeaturesServer };
