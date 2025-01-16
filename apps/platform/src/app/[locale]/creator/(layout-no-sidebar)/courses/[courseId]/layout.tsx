import { CourseDetailLayout } from '@oe/dashboard/creator/courses/course-detail/layout';
import type { ReactNode } from 'react';

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CourseDetailLayout>{children}</CourseDetailLayout>
    </>
  );
}
