import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ILesson } from '@oe/api/types/course/segment';
import { ScrollArea } from '#shadcn/scroll-area';
import { AuthCheck } from './auth-check-learning';
import ContentSection from './content-section';
import CourseOutline from './course-sidebar-section';

export default function CourseLearning({
  course,
  section,
  lesson,
}: {
  course: ICourseOutline;
  section: string;
  lesson?: ILesson | null;
}) {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col px-3 py-4 lg:flex-row">
      <AuthCheck course={course} />

      <ContentSection courseData={course} lesson={lesson} className="h-full lg:w-2/3 lg:flex-1" />

      <ScrollArea className="hidden px-3 lg:block lg:w-1/3">
        <CourseOutline courseData={course} activeSection={section} activeLesson={lesson?.uid} />
      </ScrollArea>
    </div>
  );
}
