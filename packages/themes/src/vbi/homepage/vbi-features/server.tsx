import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageFeatures } from './vbi-features';

const VbiHomepageFeaturesServer: SectionComponent<'homepage', 'vbiFeatures'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiFeatures');
  return <VbiHomepageFeatures {...props} t={t} />;
};

export { VbiHomepageFeaturesServer };
