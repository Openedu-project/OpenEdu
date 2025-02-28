import type { ILevel } from '@oe/api/types/categories';
import SendSquare from '@oe/assets/icons/send-square';
import { abbreviateNumber } from '@oe/core/utils/helpers';
import { Layers, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ICourseStats {
  learner_count: number;
  levels?: ILevel[];
  mark_as_completed: boolean;
}

export default function CourseStats({ learner_count, levels, mark_as_completed }: ICourseStats) {
  const tCourse = useTranslations('courseOutline.courseStats');

  return (
    <div className="flex flex-col flex-wrap gap-4 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        {!!learner_count && learner_count > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />

            <span className="mcaption-semibold14">
              {/* {learner_count > 1
                ? tCourse('learners', { learnerCount: learner_count })
                : tCourse('learner', { learnerCount: learner_count })} */}
              {abbreviateNumber(learner_count)}
            </span>
          </div>
        )}
        {levels?.[0]?.name && levels?.[0]?.name?.length > 0 && (
          <div className="flex items-center gap-2">
            {/* <Layer width={20} height={20} color="black" className="mr-2" /> */}
            <Layers className="h-4 w-4" />
            <span className="mcaption-semibold14">{levels?.[0].name}</span>
          </div>
        )}
      </div>

      {/* <RatingStar variant="with-number" rating={rating ?? 5} /> */}

      {mark_as_completed && (
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 items-center justify-center rounded-full bg-success">
            <SendSquare />
          </div>
          <span className="mcaption-semibold14 text-success">{tCourse('contentCompleted')}</span>
        </div>
      )}
    </div>
  );
}
