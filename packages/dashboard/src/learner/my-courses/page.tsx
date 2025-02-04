import { getCoursesCountingService, getMyCourseLearningService } from '@oe/api/services/my-learning-space';
import MyCoursesContent from './_components/my-courses-content';

export default async function MyCourses() {
  const courseCountData = await getCoursesCountingService(undefined, {});

  const inProgressCourses = await getMyCourseLearningService(undefined, {
    params: {
      group: 'in_progress',
      preloads: ['LearningProgressOverview', 'Categories', 'Levels', 'Medias'],
      page: 1,
      per_page: 8,
    },
  });

  const notStartedCourses = await getMyCourseLearningService(undefined, {
    params: {
      group: 'not_started',
      preloads: ['Categories', 'Levels', 'Medias'],
      page: 1,
      per_page: 8,
    },
  });

  const completedCourses = await getMyCourseLearningService(undefined, {
    params: {
      group: 'completed',
      preloads: ['Categories', 'Levels', 'Medias'],
      page: 1,
      per_page: 8,
    },
  });

  return (
    <MyCoursesContent
      coursesCountingData={courseCountData}
      inProgressCourses={inProgressCourses?.results}
      notStartedCourses={notStartedCourses?.results}
      completedCourses={completedCourses?.results}
    />
  );
}
