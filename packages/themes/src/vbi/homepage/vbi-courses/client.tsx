'use client';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import VbiHomepageCoursesBase from './vbi-courses';

const VbiHomepageCoursesClient: SectionComponent<'homepage', 'vbiCourses'> = props => {
  const t = useTranslations('themePage.vbi.homepage.vbiCourses');
  return <VbiHomepageCoursesBase {...props} t={t} />;
};

export default VbiHomepageCoursesClient;
