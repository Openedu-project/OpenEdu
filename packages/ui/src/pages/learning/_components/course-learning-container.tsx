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
    <div className="grid h-[calc(100vh-var(--header-height))] px-3 py-4 md:grid-cols-3">
      <AuthCheck course={course} />

      <ContentSection courseData={course} lesson={lesson} className="md:col-span-2" />

      <ScrollArea>
        <CourseOutline
          courseData={course}
          activeSection={section}
          activeLesson={lesson?.uid}
          className="hidden px-3 md:col-span-1 md:block"
        />
      </ScrollArea>
    </div>
  );
}
