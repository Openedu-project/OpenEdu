// 'use client';

import CoursesListPage from "@oe/ui/pages/course-list";
// import { useSearchParams } from 'next/navigation';

export default function CourseList() {
  // const searchParams = useSearchParams();

  return (
    <>
      <CoursesListPage isOpenEdu />
    </>
  );
}
