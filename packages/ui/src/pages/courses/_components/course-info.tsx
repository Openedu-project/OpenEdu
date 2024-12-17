import { CollapseText } from '#components/collapse-text';
import { useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';
import CourseCreator from './course-creator';
import CourseStats from './course-stats';
import { LastUpdated } from './last-updated';

export const CourseInfo = () => {
  const { courseOutline } = useCourseOutlineDetailStore();

  const { name, owner, description, update_at, mark_as_completed, learner_count, levels } = courseOutline;

  return courseOutline ? (
    <div className="mb-4 flex flex-col gap-6 md:mb-10">
      <h1 className="giant-iheading-semibold24 md:giant-iheading-semibold32 mb-0 text-primary">{name}</h1>

      <div className="flex flex-col gap-1 text-foreground/40 lg:flex-row lg:items-center lg:gap-4">
        {owner && (
          <>
            <CourseCreator />
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
