import type { ILevel } from '@oe/api';
import { abbreviateNumber } from '@oe/core';
import { Layers, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Separator } from '#shadcn/separator';

interface ICourseStats {
  learner_count: number;
  levels?: ILevel[];
  mark_as_completed: boolean;
  rating?: number;
}

export function CourseStats({ learner_count, levels, rating }: ICourseStats) {
  const tCourse = useTranslations('courseOutline.courseStats');

  const showRating = rating !== undefined && rating !== null;
  const showLevel = levels?.[0]?.name && levels?.[0]?.name?.length > 0;
  const showLearnerCount = !!learner_count && learner_count > 0;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-primary-foreground">
      {/* {showRating && (
        <RatingStars variant="number-shorten" rating={rating} className='pl-0'/>
      )} */}

      {showRating && showLevel && <Separator orientation="vertical" className="h-4 bg-primary-foreground" />}

      {showLevel && (
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4" />
          <span className="mcaption-semibold14">{levels?.[0]?.name}</span>
        </div>
      )}

      {showLevel && showLearnerCount && <Separator orientation="vertical" className="h-4 bg-primary-foreground" />}

      {showLearnerCount && (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="mcaption-semibold14">
            {learner_count > 1
              ? tCourse('learners', {
                  learnerCount: abbreviateNumber(learner_count),
                })
              : tCourse('learner', { learnerCount: learner_count })}
          </span>
        </div>
      )}
    </div>
  );
}
