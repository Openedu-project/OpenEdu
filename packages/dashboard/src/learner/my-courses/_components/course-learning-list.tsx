'use client';

import { useGetMyCoursesLearning } from '@oe/api/hooks/useMyLearningSpace';
import type { TMyCourseStatus } from '@oe/api/types/my-learning-space';
import { NoDataAvailable } from '@oe/ui/components/no-data-available';
import { PaginationCustom } from '@oe/ui/components/pagination-custom';
import { Spinner } from '@oe/ui/components/spinner';
import { useState } from 'react';
import CourseCard from '../../_components/course-card';

interface ICourseLearningListProps {
  title: string;
  group: TMyCourseStatus;
  preload?: string | string[];
}
export default function CourseLearningList({ title, group, preload }: ICourseLearningListProps) {
  const [page, setPage] = useState<number>(1);

  const params = {
    group,
    preloads: [...(Array.isArray(preload) ? preload : preload ? [preload] : []), 'Categories', 'Levels', 'Medias'],
    page,
    per_page: 12,
  };
  const revalidateOnMount = true;

  const { coursesLearningData, coursesLearningLoading, coursesLearningMutate } = useGetMyCoursesLearning(
    params,
    revalidateOnMount
  );

  return (
    <>
      {coursesLearningLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-8 pt-6">
          <h3 className="giant-iheading-semibold20 mb-0 border-primary border-l-[3px] pl-[12px] text-primary uppercase">
            {title} ({coursesLearningData?.pagination?.total_items ?? 0})
          </h3>

          {coursesLearningData && coursesLearningData.results?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {coursesLearningData.results?.map(course => (
                <CourseCard key={course.id} courseData={course} courseStatus={group} mutate={coursesLearningMutate} />
              ))}
            </div>
          ) : (
            <NoDataAvailable />
          )}

          <PaginationCustom
            currentPage={coursesLearningData?.pagination?.page ?? 1}
            totalCount={coursesLearningData?.pagination?.total_items ?? 0}
            onPageChange={page => setPage(page)}
            className="p-8"
            pageSize={12}
          />
        </div>
      )}
    </>
  );
}
