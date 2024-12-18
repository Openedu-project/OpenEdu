import type { ILevel } from '@oe/api/types/categories';
import Layer from '@oe/assets/icons/layer';
import Person2User from '@oe/assets/icons/person-2-user';
import SendSquare from '@oe/assets/icons/send-square';
import { useTranslations } from 'next-intl';

interface ICourseStats {
  learner_count: number;
  levels?: ILevel[];
  mark_as_completed: boolean;
}

export default function CourseStats({ learner_count, levels, mark_as_completed }: ICourseStats) {
  const tCourse = useTranslations('courseOutline.courseStats');

  return (
    <div className="flex flex-col flex-wrap gap-4 md:flex-row md:items-center md:gap-6">
      <div className="flex items-center gap-5 text-foreground/40 sm:gap-6">
        {!!learner_count && learner_count > 0 && (
          <div className="flex items-center">
            <Person2User color="black" width={24} height={24} className="mr-2" />

            <span className="mcaption-semibold14 md:mcaption-semibold18 text-black">
              {learner_count > 1
                ? tCourse('learners', { learnerCount: learner_count })
                : tCourse('learner', { learnerCount: learner_count })}
            </span>
          </div>
        )}
        {levels?.[0]?.name && levels?.[0]?.name?.length > 0 && (
          <div className="flex items-center">
            <Layer width={24} height={24} color="black" className="mr-2" />
            <span className="mcaption-semibold14 md:mcaption-semibold18 text-black">{levels?.[0].name}</span>
          </div>
        )}
      </div>

      {/* <RatingStar variant="with-number" rating={rating ?? 5} /> */}

      {mark_as_completed && (
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 items-center justify-center rounded-full bg-green-600">
            <SendSquare />
          </div>
          <span className="mcaption-semibold14 md:mcaption-semibold18 text-green-600">
            {tCourse('contentCompleted')}
          </span>
        </div>
      )}
    </div>
  );
}
