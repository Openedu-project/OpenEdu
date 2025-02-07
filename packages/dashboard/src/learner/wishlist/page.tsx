import { useTranslations } from 'next-intl';
import CourseLearningList from '../my-courses/_components/course-learning-list';

export default function LearnerWishlistPage() {
  const t = useTranslations('myLearningSpace.myCourses');

  return <CourseLearningList title={t('wishlistCourse')} group="wishlist" />;
}
