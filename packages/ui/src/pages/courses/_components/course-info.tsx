import type { ICourseOutline } from '@oe/api/types/course/course';
import { CollapseText } from '#components/collapse-text';
import CourseCreator from './course-creator';
import CourseHeader from './course-header';
import CourseStats from './course-stats';
import { LastUpdated } from './last-updated';

export const CourseInfo = ({ courseData }: { courseData: ICourseOutline }) => {
  const { owner, description, update_at, mark_as_completed, learner_count, levels } = courseData;

  return courseData ? (
    <div className="flex flex-col gap-6 md:mb-10">
      <CourseHeader courseOutline={courseData} />

      <div className="flex flex-col gap-1 text-foreground/40 lg:flex-row lg:items-center lg:gap-4">
        {owner && (
          <>
            <CourseCreator owner={owner} />
            <span className="hidden lg:block">|</span>
          </>
        )}
        <LastUpdated update_at={update_at} />
      </div>

      <CollapseText content={description} className="rounded-[12px] border border-foreground/20 p-2 md:p-5" />

      <CourseStats learner_count={learner_count} mark_as_completed={mark_as_completed} levels={levels} />
    </div>
  ) : null;
};
