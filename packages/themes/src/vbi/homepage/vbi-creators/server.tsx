import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageCreatorsBase from './vbi-creators';

const VbiHomepageCreatorsServer: SectionComponent<'homepage', 'vbiCreators'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiCreators');
  return <VbiHomepageCreatorsBase {...props} t={t} />;
};

export default VbiHomepageCreatorsServer;
