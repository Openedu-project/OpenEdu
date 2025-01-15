import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageCertBase from './vbi-cert';

const VbiHomepageCertServer: SectionComponent<'homepage', 'vbiCert'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiCert');
  return <VbiHomepageCertBase {...props} t={t} />;
};

export default VbiHomepageCertServer;
