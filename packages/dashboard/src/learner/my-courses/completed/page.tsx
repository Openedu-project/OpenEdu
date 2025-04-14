import { useTranslations } from 'next-intl';
import { CourseLearningList } from '../_components/course-learning-list';

export function CompletedCoursePage() {
  const t = useTranslations('myLearningSpace.myCourses');

  return <CourseLearningList title={t('completed')} group="completed" />;
}
