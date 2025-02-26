import { getMyCourseLearningService } from '@oe/api/services/my-learning-space';
import { LEARNER_ROUTES } from '@oe/core/utils/routes';
import { NoDataAvailable } from '@oe/ui/components/no-data-available';
import { ScrollArea, ScrollBar } from '@oe/ui/shadcn/scroll-area';
import { useTranslations } from 'next-intl';
import CourseCard from '../../_components/course-card';
import SectionCard from './section-card';

export default async function MyInProgressCourse() {
  const tLearnerDashboard = useTranslations('myLearningSpace.dashboard');

  const coursesInProgress = await getMyCourseLearningService(undefined, {
    params: {
      group: 'in_progress',
      preloads: ['LearningProgressOverview', 'Categories', 'Levels', 'Medias'],
      page: 1,
      per_page: 3,
    },
  });

  return (
    <SectionCard
      title={tLearnerDashboard('myInProgressCourse')}
      viewAllButtonLink={LEARNER_ROUTES.coursesInProgress}
      className="col-span-2"
    >
      {coursesInProgress && coursesInProgress?.results?.length > 0 ? (
        <ScrollArea>
          <div className="mb-2 flex gap-4">
            {coursesInProgress?.results?.map(course => (
              <CourseCard
                key={course.id}
                courseData={course}
                className="min-w-[234px] max-w-[363px]"
                courseStatus="in_progress"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <NoDataAvailable size="sm" />
      )}
    </SectionCard>
  );
}
