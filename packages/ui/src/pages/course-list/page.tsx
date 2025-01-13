import { Suspense } from 'react';
import CourseList from './_components/course-list';
import { CourseGridSkeleton } from './_components/course-skeleton';

export default function CoursesListPage({
  searchParams,
  isOpenEdu = true,
}: {
  searchParams: URLSearchParams;
  isOpenEdu?: boolean;
}) {
  return (
    <Suspense fallback={<CourseGridSkeleton />}>
      <CourseList searchParams={searchParams} isOpenEdu={isOpenEdu} />
    </Suspense>
  );
}
