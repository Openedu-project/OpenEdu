import { useTranslations } from 'next-intl';
import { CourseLearningList } from '../_components/course-learning-list';

export function NotStartedCoursePage() {
  const t = useTranslations('myLearningSpace.myCourses');

  return <CourseLearningList title={t('notStartedCourse')} group="not_started" />;
}
