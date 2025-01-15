'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageCertBase from './vbi-cert';

const VbiHomepageCertClient: SectionComponent<'homepage', 'vbiCert'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiCert');
  return <VbiHomepageCertBase {...props} t={t} />;
};

export default VbiHomepageCertClient;
