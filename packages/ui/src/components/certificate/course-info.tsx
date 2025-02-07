import Layer from '@oe/assets/icons/layer';
import Person2User from '@oe/assets/icons/person-2-user';
import { useTranslations } from 'next-intl';

import type { ICourse } from '@oe/api/types/course/course';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useMemo } from 'react';
import { Link } from '#common/navigation';
import { RatingStars } from '#components/rating-stars';
import { UserAvatar } from '#components/user-avatar';
import { Separator } from '#shadcn/separator';

export default function CourseInfo({ courseData }: { courseData: ICourse }) {
  const t = useTranslations('courseOutline.certificate');

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
    <div className="flex flex-col gap-3 rounded-lg bg-white p-4 md:p-6">
      <Link href={courseUrl} target="_blank" className="giant-iheading-semibold24 line-clamp-2 px-0 text-foreground">
        {courseData?.name}
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-[2px]">
          <span className="mbutton-semibold16">
            {t('creator')}:
            <span className="ml-2 text-primary">
              {courseData?.owner?.display_name && courseData?.owner.display_name?.length > 0
                ? courseData?.owner.display_name
                : courseData?.owner?.username}
            </span>
          </span>
          {/* {courseData?.owner?.headline && courseData?.owner.headline?.length > 0 && (
            <span className="mbutton-regular14 text-foreground/50">{courseData?.owner.headline}</span>
          )} */}
        </div>
        <UserAvatar src={courseData?.owner?.avatar} name={displayName} />
      </div>

      {/* <div className="mcaption-semibold14 flex items-center gap-2 text-primary">
        {courseData?.org && <p>{courseData?.org?.name}</p>}
      </div> */}

      <div className="mcaption-regular14 flex justify-between gap-2 text-foreground">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-spacing-xs">
            <Person2User className="mr-1" />
            {courseData?.learner_count ?? 0}
          </div>

          <Separator orientation="vertical" />

          <RatingStars variant="number-shorten" rating={courseData?.rating ?? 5} />

          <Separator orientation="vertical" />

          {courseData?.levels && (
            <div className="flex items-center gap-spacing-xs">
              <Layer /> <span>{courseData?.levels?.[0]?.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
