'use client';

import { useGetCoursesPublish } from '@oe/api/hooks/useCourse';
import type { ICourse } from '@oe/api/types/course/course';
import type { IDataPagination } from '@oe/api/types/pagination';
import { useEffect, useState } from 'react';
import CourseGrid from './course-grid';
import { CourseGridSkeleton } from './course-skeleton';
import PaginationWrapper from './pagination-wrapper';
import { getSearchParamsData } from './search-params-handler';

const PER_PAGE = 12;

interface CourseListProps {
  searchParams: URLSearchParams;
  isOpenEdu: boolean;
}

export default function CourseList({ searchParams, isOpenEdu }: CourseListProps) {
  const [courseList, setCourseList] = useState<IDataPagination<ICourse[]>>();
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState(() => {
    const searchParamsData = getSearchParamsData(searchParams);
    return {
      ...searchParamsData,
      page: 1,
      per_page: PER_PAGE,
      enable_root: isOpenEdu,
      sort: 'create_at desc',
    };
  });

  const preloadData = ['Categories', 'Owner', 'Levels'];
  const { dataListCourses: dataCoursesPublish, mutateListCourses } = useGetCoursesPublish({
    params: { ...params, preloads: preloadData },
  });

  useEffect(() => {
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
    return <CourseGridSkeleton />;
  }

  return (
    <div>
      <CourseGrid courses={dataCoursesPublish?.results} mutate={mutateListCourses} />
      <PaginationWrapper
        currentPage={courseList?.pagination?.page ?? 1}
        totalCount={courseList?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
      />
    </div>
  );
}
