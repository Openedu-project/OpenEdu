'use client';

import { useGetCoursesPublish } from '@oe/api/hooks/useCourse';
import type { ICourse } from '@oe/api/types/course/course';
import type { IDataPagination } from '@oe/api/types/pagination';
import { PaginationCustom } from '@oe/ui/components/pagination-custom';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import CourseCard from './_components/course-card';
import { CourseGridSkeleton } from './_components/course-skeleton';
const PER_PAGE = 12;

export default function CoursesPage() {
  const searchParams = useSearchParams();

  const getSearchParams = useMemo(() => {
    const { course_name, organization, category_id_in, ...baseParams } = Object.fromEntries(searchParams);
    const categoryIds = category_id_in?.split(',');

    return {
      ...baseParams,
      search_term: course_name ?? '',
      search_categories: 'name',
      org_id: organization,
      category_id_in: categoryIds,
    };
  }, [searchParams]);

  // const isOpenEdu = isOpenEduClient();
  const isOpenEdu = true;

  const [courseList, setCourseList] = useState<IDataPagination<ICourse[]>>();
  const [isLoading, setIsLoading] = useState(true);

  const [params, setParams] = useState(
    isOpenEdu
      ? {
          ...getSearchParams,
          page: 1,
          per_page: PER_PAGE,
          enable_root: true,
          sort: 'create_at desc',
        }
      : {
          ...getSearchParams,
          page: 1,
          per_page: PER_PAGE,
          enable: true,
          sort: 'create_at desc',
        }
  );
  const preloadData = useMemo(() => ['Categories', 'Owner', 'Levels'], []);
  const { dataListCourses: dataCoursesPublish, mutateListCourses } = useGetCoursesPublish({
    params: { ...params, preloads: preloadData },
  });

  useEffect(() => {
    if (dataCoursesPublish) {
      setCourseList(dataCoursesPublish);
    }
  }, [dataCoursesPublish]);

  useEffect(() => {
    setIsLoading(true);
    if (dataCoursesPublish) {
      setCourseList(dataCoursesPublish);
      setIsLoading(false);
    }
  }, [dataCoursesPublish]);

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div>
        <CourseGridSkeleton />
        <div className="flex justify-center p-8">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-8 lg:grid-cols-4">
        {dataCoursesPublish?.results?.map(course => (
          <CourseCard key={course.id} courseData={course} mutate={mutateListCourses} />
        ))}
      </div>

      <PaginationCustom
        currentPage={courseList?.pagination?.page ?? 1}
        totalCount={courseList?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
        className="p-8"
      />
    </div>
  );
}
