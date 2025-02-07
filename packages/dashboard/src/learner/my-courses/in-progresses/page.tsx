import { useTranslations } from 'next-intl';
import CourseLearningList from '../_components/course-learning-list';

export default function InProgressCoursePage() {
  const t = useTranslations('myLearningSpace.myCourses');
  return <CourseLearningList title={t('inProgressCourse')} group="in_progress" preload="LearningProgressOverview" />;
}
