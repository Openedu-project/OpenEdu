import type { ICourseOutline } from '@oe/api/types/course/course';
import { ExpandableText } from '#components/expandable-text';
import CourseCreator from './course-creator';
import CourseHeader from './course-header';
import CourseStats from './course-stats';
import { LastUpdated } from './last-updated';

export const CourseInfo = ({ courseData }: { courseData: ICourseOutline }) => {
  // console.log("courseData - CourseInfo", courseData);
  const { owner, description, update_at, mark_as_completed, learner_count, levels } = courseData;

  return (
    <div className="flex flex-col gap-4 md:mb-10">
      <CourseHeader courseData={courseData} />

      <div className="flex flex-col gap-1 text-foreground/40 lg:flex-row lg:items-center lg:gap-4">
        {owner && (
          <>
            <CourseCreator owner={owner} />
            <span className="hidden lg:block">|</span>
          </>
        )}
        <LastUpdated update_at={update_at} />
      </div>

      <ExpandableText content={description} className="rounded-xl border border-foreground/20 p-4" />

      <CourseStats learner_count={learner_count} mark_as_completed={mark_as_completed} levels={levels} />
    </div>
  );
};
