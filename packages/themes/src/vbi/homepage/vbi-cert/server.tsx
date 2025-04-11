import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageCert } from './vbi-cert';

const VbiHomepageCertServer: SectionComponent<'homepage', 'vbiCert'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiCert');
  return <VbiHomepageCert {...props} t={t} />;
};

export { VbiHomepageCertServer };
