import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ICoursesCounting } from '@oe/api/types/my-learning-space';
import { LEARNER_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import CourseSection from './courses-section';

interface IMyCourseContentProps {
  coursesCountingData: ICoursesCounting;
  inProgressCourses?: ICourseOutline[];
  notStartedCourses?: ICourseOutline[];
  completedCourses?: ICourseOutline[];
}

export default function MyCoursesContent({
  coursesCountingData,
  inProgressCourses,
  notStartedCourses,
  completedCourses,
}: IMyCourseContentProps) {
  const t = useTranslations('myLearningSpace.myCourses');

  const coursesCompleted = coursesCountingData?.completed ?? 0;
  const coursesInProgress = coursesCountingData?.in_progress ?? 0;
  const coursesNotStarted = coursesCountingData?.not_started ?? 0;

  return (
    <div className="space-y-6 py-6">
      <h3 className="giant-iheading-semibold20 mb-0 border-primary border-l-[3px] pl-[12px] text-primary uppercase">
        {t('title')} ({coursesCompleted + coursesInProgress + coursesNotStarted})
      </h3>

      <CourseSection
        title={`${t('inProgressCourse')} (${coursesInProgress})`}
        courseList={inProgressCourses}
        courseStatus="in_progress"
        href={LEARNER_ROUTES.coursesInProgress}
      />

      <CourseSection
        title={`${t('notStartedCourse')} (${coursesNotStarted})`}
        courseList={notStartedCourses}
        courseStatus="not_started"
        href={LEARNER_ROUTES.coursesNotStarted}
      />

      <CourseSection
        title={`${t('completed')} (${coursesCompleted})`}
        courseList={completedCourses}
        courseStatus="completed"
        href={LEARNER_ROUTES.coursesCompleted}
      />
    </div>
  );
}
