import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageHeroBase from './vbi-hero';

const VbiHomepageHeroServer: SectionComponent<'homepage', 'vbiHero'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiHero');
  return <VbiHomepageHeroBase {...props} t={t} />;
};

export default VbiHomepageHeroServer;
