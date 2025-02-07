import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageAchievementsBase from './vbi-achievements';

const VbiHomepageAchievementsServer: SectionComponent<'homepage', 'vbiAchievements'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiAchievements');
  return <VbiHomepageAchievementsBase {...props} t={t} />;
};

export default VbiHomepageAchievementsServer;
