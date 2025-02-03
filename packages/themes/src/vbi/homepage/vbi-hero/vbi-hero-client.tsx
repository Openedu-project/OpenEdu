'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageHeroBase from './vbi-hero';

const VbiHomepageHeroClient: SectionComponent<'homepage', 'vbiHero'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiHero');
  return <VbiHomepageHeroBase {...props} t={t} />;
};

export default VbiHomepageHeroClient;
