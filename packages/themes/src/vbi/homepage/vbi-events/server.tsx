import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageEventsBase from './vbi-events';

const VbiHomepageEventsServer: SectionComponent<'homepage', 'vbiEvents'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiEvents');
  return <VbiHomepageEventsBase {...props} t={t} />;
};

export default VbiHomepageEventsServer;
