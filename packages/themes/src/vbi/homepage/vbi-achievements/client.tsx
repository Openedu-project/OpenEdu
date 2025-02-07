'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageAchievementsBase from './vbi-achievements';

const VbiHomepageAchievementsClient: SectionComponent<'homepage', 'vbiAchievements'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiAchievements');
  return <VbiHomepageAchievementsBase {...props} t={t} />;
};

export default VbiHomepageAchievementsClient;
