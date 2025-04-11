'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageEvents } from './vbi-events';

const VbiHomepageEventsClient: SectionComponent<'homepage', 'vbiEvents'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiEvents');
  return <VbiHomepageEvents {...props} t={t} />;
};

export { VbiHomepageEventsClient };
