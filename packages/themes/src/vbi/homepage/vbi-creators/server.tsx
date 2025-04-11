import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageCreators } from './vbi-creators';

const VbiHomepageCreatorsServer: SectionComponent<'homepage', 'vbiCreators'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiCreators');
  return <VbiHomepageCreators {...props} t={t} />;
};

export { VbiHomepageCreatorsServer };
