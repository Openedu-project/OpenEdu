import type { ICourseResponse } from '@oe/api';
import { CourseGrid } from './course-grid';
import { CourseListPagination } from './course-list-pagination';

interface CourseListProps {
  courses: ICourseResponse | undefined;
  page: number;
}

export function CourseList({ courses, page }: CourseListProps) {
  return (
    <>
      <CourseGrid courses={courses?.results} />
      <CourseListPagination pageValue={page} courses={courses} />
    </>
  );
}
