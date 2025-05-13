import type { ICourseOutline } from '@oe/api';
import { LastUpdated } from '../../_components/last-updated';
import { CourseCreator } from './course-creator';
import { CourseHeader } from './course-header';
import { CourseStats } from './course-stats';

export const CourseInfo = ({ courseData }: { courseData: ICourseOutline }) => {
  // console.log("courseData - CourseInfo", courseData);
  const { owner, update_at, mark_as_completed, learner_count, levels } = courseData;

  return (
    <div className="flex flex-col gap-4 md:mb-10">
      <CourseHeader />

      <div className="flex flex-col gap-1 text-foreground/40 lg:flex-row lg:items-center lg:gap-4">
        {owner && (
          <>
            <CourseCreator owner={owner} />
            <span className="hidden lg:block">|</span>
          </>
        )}
        <LastUpdated update_at={update_at} />
      </div>

      <CourseStats learner_count={learner_count} mark_as_completed={mark_as_completed} levels={levels} />
    </div>
  );
};
