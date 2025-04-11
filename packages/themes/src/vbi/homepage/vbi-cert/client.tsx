'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageCert } from './vbi-cert';

const VbiHomepageCertClient: SectionComponent<'homepage', 'vbiCert'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiCert');
  return <VbiHomepageCert {...props} t={t} />;
};

export { VbiHomepageCertClient };
