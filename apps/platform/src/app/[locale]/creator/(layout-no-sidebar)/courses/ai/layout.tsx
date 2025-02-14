import AICourseLayout from '@oe/dashboard/creator/courses/ai-course/ai-course-layout';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <AICourseLayout>{children}</AICourseLayout>;
}
