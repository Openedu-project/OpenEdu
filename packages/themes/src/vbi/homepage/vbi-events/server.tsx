import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageEvents } from './vbi-events';

const VbiHomepageEventsServer: SectionComponent<'homepage', 'vbiEvents'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiEvents');
  return <VbiHomepageEvents {...props} t={t} />;
};

export { VbiHomepageEventsServer };
