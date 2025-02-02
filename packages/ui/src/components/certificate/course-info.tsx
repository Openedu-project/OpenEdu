import Layer from '@oe/assets/icons/layer';
import Person2User from '@oe/assets/icons/person-2-user';
import { Avatar, AvatarFallback, AvatarImage } from '@oe/ui/shadcn/avatar';
import { useTranslations } from 'next-intl';

import type { ICourse } from '@oe/api/types/course/course';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { pickCharacters } from '@oe/core/utils/string';
import { useMemo } from 'react';
import { Link } from '#common/navigation';
import { RatingStars } from '#components/rating-stars';

export default function CourseInfo({ courseData }: { courseData: ICourse }) {
  const t = useTranslations('courses');

  const displayName =
    courseData?.owner?.display_name && courseData?.owner?.display_name?.length > 0
      ? courseData?.owner.display_name
      : (courseData?.owner?.username ?? '');

  const courseUrl = useMemo(
    () =>
      createAPIUrl({
        endpoint: PLATFORM_ROUTES.courseDetail,
        params: { slug: courseData?.slug },
      }),
    [courseData?.slug]
  );

  return (
    <div className="flex flex-col gap-3 md:p-6">
      <Link href={courseUrl} target="_blank" className="giant-iheading-semibold24 line-clamp-2">
        {courseData?.name}
      </Link>

      <div className="flex items-center">
        <Avatar className="h-[40px] w-[40px]">
          <AvatarImage src={courseData?.owner?.avatar} alt="avatar" />
          <AvatarFallback>{pickCharacters(displayName)}</AvatarFallback>
        </Avatar>

        <div className="ml-3 flex flex-col gap-[2px]">
          <span className="mbutton-semibold16">
            {courseData?.owner?.display_name && courseData?.owner.display_name?.length > 0
              ? courseData?.owner.display_name
              : courseData?.owner?.username}
          </span>
          {courseData?.owner?.headline && courseData?.owner.headline?.length > 0 && (
            <span className="mbutton-regular14 text-foreground/50">{courseData?.owner.headline}</span>
          )}
        </div>
      </div>

      <div className="mcaption-semibold14 flex items-center gap-2 text-primary">
        {courseData?.org && <p>{courseData?.org?.name}</p>}
        <RatingStars variant="with-number" rating={courseData?.rating ?? 5} />
      </div>

      <div className="mcaption-regular14 flex justify-between gap-2 text-foreground">
        <div className="flex flex-wrap gap-spacing-xs">
          <div className="flex items-center gap-spacing-xs">
            <Person2User />
            <span>
              {courseData?.learner_count ?? 0}&nbsp;
              {courseData?.learner_count && courseData?.learner_count > 1 ? t('learners') : t('learner')}
            </span>
          </div>

          {courseData?.levels && (
            <div className="flex items-center gap-spacing-xs">
              <span>&#x2022; </span>
              <Layer /> <span>{courseData?.levels?.[0]?.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
