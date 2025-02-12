import type { ReactNode } from 'react';
import { CourseDetailHeader } from './_components/course-detail-header';

export function CourseDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <CourseDetailHeader />
      <div className="flex-1 overflow-hidden rounded">{children}</div>
    </div>
  );
}
