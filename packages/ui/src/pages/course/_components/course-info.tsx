import type { ICourseOutline } from '@oe/api';
import courseBg from '@oe/assets/images/bg-course-infor.png';
import { Image } from '#components/image';
import { LastUpdated } from '../../_components/last-updated';
import { CourseCreator } from './course-creator';
import { CourseHeader } from './course-header';
import { CourseStats } from './course-stats';

export const CourseInfo = ({ courseData }: { courseData: ICourseOutline }) => {
  // console.log("courseData - CourseInfo", courseData);
  const { owner, update_at, mark_as_completed, learner_count, levels, short_desc } = courseData;

  return (
    <div className="relative rounded-xl bg-primary p-4 md:mb-10 md:p-6">
      <div className="sticky z-40 flex flex-col gap-4">
        <CourseHeader />

        {short_desc?.length > 0 && <p className="mcaption-semibold16 text-white">{short_desc}</p>}

        <CourseStats learner_count={learner_count} mark_as_completed={mark_as_completed} levels={levels} />

        <div className="flex flex-col gap-1 text-white lg:flex-row lg:items-center lg:gap-4">
          {owner && (
            <>
              <CourseCreator owner={owner} />
              <span className="hidden lg:block">|</span>
            </>
          )}
          <LastUpdated update_at={update_at} />
        </div>
      </div>

      <Image
        src={courseBg.src}
        alt="bg-course-infor"
        width={800}
        height={330}
        className="absolute bottom-0 z-30 w-full translate-y-1/3 object-fill mix-blend-multiply"
      />
    </div>
  );
};
