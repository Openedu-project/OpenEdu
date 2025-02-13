'use client';

import { useGetPopularCoursesAtWebsite } from '@oe/api/hooks/useFeaturedContent';
import type { ICourse } from '@oe/api/types/course/course';
import type { IFeaturedContent } from '@oe/api/types/featured-contents';
import { getAPIReferrerAndOriginClient } from '@oe/api/utils/referrer-origin';
import { CourseCard } from '@oe/ui/components/course-card';
import type { KeyedMutator } from 'swr';

interface IProps {
  fallback: IFeaturedContent<ICourse>[] | undefined;
}
export default function PopularCourseList({ fallback }: IProps) {
  const { host } = getAPIReferrerAndOriginClient();

  const { dataPopularCourses: dataCoursesPopular, mutatePopularCourses } = useGetPopularCoursesAtWebsite({
    params: { org_id: host ?? '' },
    fallback,
  });

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
      {dataCoursesPopular?.map(
        (course: IFeaturedContent<ICourse>) =>
          course?.entity && (
            <CourseCard
              key={course?.entity?.id}
              courseData={course?.entity}
              mutate={mutatePopularCourses as KeyedMutator<IFeaturedContent<ICourse>[]>}
            />
          )
      )}
    </div>
  );
}
