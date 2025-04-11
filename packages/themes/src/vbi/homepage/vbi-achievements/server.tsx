import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { VbiHomepageAchievements } from './vbi-achievements';

const VbiHomepageAchievementsServer: SectionComponent<'homepage', 'vbiAchievements'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiAchievements');
  return <VbiHomepageAchievements {...props} t={t} />;
};

export { VbiHomepageAchievementsServer };
