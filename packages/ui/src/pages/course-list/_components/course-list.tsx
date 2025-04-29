'use client';

import { type ICourseResponse, type IFilter, useGetCoursesPublish } from '@oe/api';
import { CourseGrid } from './course-grid';
import { CourseListPagination } from './course-list-pagination';

interface CourseListProps {
  courses: ICourseResponse | undefined;
  page: number;
  fallback?: ICourseResponse;
  params: IFilter;
}

export function CourseList({ page, fallback, params }: CourseListProps) {
  const { dataListCourses: dataCoursesPublish, mutateListCourses } = useGetCoursesPublish(
    params,
    params?.page === 1 ? fallback : undefined
  );

  return (
    <>
      <CourseGrid courses={dataCoursesPublish?.results} mutate={mutateListCourses} />
      <CourseListPagination pageValue={page} courses={dataCoursesPublish} />
    </>
  );
}
