'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageHero } from './vbi-hero';

const VbiHomepageHeroClient: SectionComponent<'homepage', 'vbiHero'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiHero');
  return <VbiHomepageHero {...props} t={t} />;
};

export { VbiHomepageHeroClient };
