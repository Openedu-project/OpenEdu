'use client';

import { useGetCoursesPublish } from '@oe/api/hooks/useCourse';
import type { ICourseResponse } from '@oe/api/types/course/course';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CourseGrid from './course-grid';
import { CourseGridSkeleton } from './course-skeleton';
import PaginationWrapper from './pagination-wrapper';
import { getSearchParamsData } from './search-params-handler';

const PER_PAGE = 12;

interface CourseListProps {
  // searchParams: URLSearchParams;
  isOpenEdu: boolean;
  fallback?: ICourseResponse;
}

export default function CourseList({ isOpenEdu, fallback }: CourseListProps) {
  const searchParams = useSearchParams();
  // const [courseList, setCourseList] = useState<IDataPagination<ICourse[]>>();
  // const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState(() => {
    const searchParamsData = getSearchParamsData(searchParams);
    return {
      ...searchParamsData,
      page: 1,
      per_page: PER_PAGE,
      enable_root: isOpenEdu,
      sort: 'create_at desc',
      preloads: ['Categories', 'Owner', 'Levels'],
    };
  });

  const {
    dataListCourses: dataCoursesPublish,
    isLoadingCourses,
    mutateListCourses,
  } = useGetCoursesPublish(params, params.page === 1 ? fallback : undefined);

  // useEffect(() => {
  //   if (dataCoursesPublish) {
  //     setCourseList(dataCoursesPublish);
  //     // setIsLoading(false);
  //   }
  // }, [dataCoursesPublish]);

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
    // setIsLoading(true);
  };

  if (isLoadingCourses) {
    return <CourseGridSkeleton />;
  }

  return (
    <div>
      <CourseGrid courses={dataCoursesPublish?.results} mutate={mutateListCourses} />
      <PaginationWrapper
        currentPage={dataCoursesPublish?.pagination?.page ?? 1}
        totalCount={dataCoursesPublish?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
      />
    </div>
  );
}
