import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageHero } from './vbi-hero';

const VbiHomepageHeroServer: SectionComponent<'homepage', 'vbiHero'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiHero');
  return <VbiHomepageHero {...props} t={t} />;
};

export { VbiHomepageHeroServer };
