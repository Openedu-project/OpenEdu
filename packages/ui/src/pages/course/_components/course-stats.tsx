import type { ILevel } from '@oe/api';
import { abbreviateNumber } from '@oe/core';
import { Layers, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Separator } from '#shadcn/separator';

interface ICourseStats {
  learner_count: number;
  levels?: ILevel[];
  mark_as_completed: boolean;
}

export function CourseStats({ learner_count, levels }: ICourseStats) {
  const tCourse = useTranslations('courseOutline.courseStats');

  return (
    <div className="flex flex-col flex-wrap gap-4 text-white md:flex-row md:items-center">
      {/* <RatingStar variant="with-number" rating={rating ?? 5} /> */}

      <div className="flex items-center gap-4">
        {levels?.[0]?.name && levels?.[0]?.name?.length > 0 && (
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span className="mcaption-semibold14">{levels?.[0].name}</span>
          </div>
        )}

        <Separator orientation="vertical" />

        {!!learner_count && learner_count > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />

            <span className="mcaption-semibold14">
              {learner_count > 1
                ? tCourse('learners', { learnerCount: abbreviateNumber(learner_count) })
                : tCourse('learner', { learnerCount: learner_count })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
