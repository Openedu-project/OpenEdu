'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageEventsBase from './vbi-events';

const VbiHomepageEventsClient: SectionComponent<'homepage', 'vbiEvents'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiEvents');
  return <VbiHomepageEventsBase {...props} t={t} />;
};

export default VbiHomepageEventsClient;
