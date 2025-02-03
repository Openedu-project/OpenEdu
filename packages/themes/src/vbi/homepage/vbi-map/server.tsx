import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageMapBase from './vbi-map';

const VbiHomepageMapServer: SectionComponent<'homepage', 'vbiMap'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiMap');
  return <VbiHomepageMapBase {...props} t={t} />;
};

export default VbiHomepageMapServer;
