'use client';

import type { ICourseOutline } from '@oe/api/types/course/course';

import { CoursePrice } from '#components/course-card';
import { ExpandableText } from '#components/expandable-text';
import { LastUpdated } from '../../../_components/last-updated';
import { CourseCreator } from '../../../course/_components/course-creator';
import CourseIncludes from '../../../course/_components/course-includes';
import CourseStats from '../../../course/_components/course-stats';

const CourseDescription = ({ courseData }: { courseData: ICourseOutline }) => {
  const { owner, description, update_at, mark_as_completed, learner_count, levels } = courseData;

  return (
    <>
      {courseData && courseData !== null ? (
        <>
          <div className="mb-4 flex flex-col gap-4">
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
          <CourseIncludes courseOutline={courseData} />
          <hr className="my-4" />
          <CoursePrice priceSettings={courseData?.price_settings} />
        </>
      ) : (
        <>NO data</>
      )}
    </>
  );
};

export default CourseDescription;
