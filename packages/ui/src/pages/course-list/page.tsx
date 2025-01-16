import { getCoursesPublishService } from '@oe/api/services/course';
import CourseList from './_components/course-list';

export default async function CoursesListPage({
  // searchParams,
  isOpenEdu = true,
}: {
  // searchParams: URLSearchParams;
  isOpenEdu?: boolean;
}) {
  const courses = await getCoursesPublishService(undefined, {
    params: {
      enable_root: isOpenEdu,
      page: 1,
      per_page: 12,
      sort: 'create_at desc',
    },
  });
  return (
    // <Suspense fallback={<CourseGridSkeleton />}>
    <CourseList isOpenEdu={isOpenEdu} fallback={courses} />
    // </Suspense>
  );
}
