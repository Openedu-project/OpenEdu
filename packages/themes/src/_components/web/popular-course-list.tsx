'use client';

import type { ICourse } from '@oe/api';
import { useGetPopularCoursesAtWebsite } from '@oe/api';
import type { IFeaturedContent } from '@oe/api';
import { getAPIReferrerAndOriginClient } from '@oe/api';
import { CourseCard } from '@oe/ui';
import type { KeyedMutator } from 'swr';

interface IProps {
  fallback: IFeaturedContent<ICourse>[] | undefined;
}
export function PopularCourseList({ fallback }: IProps) {
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
