import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageCoursesBase from './vbi-courses';

const VbiHomepageCoursesServer: SectionComponent<'homepage', 'vbiCourses'> = async props => {
  const t = await getTranslations('themePage.vbi.homepage.vbiCourses');
  return <VbiHomepageCoursesBase {...props} t={t} />;
};

export default VbiHomepageCoursesServer;
