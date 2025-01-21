import type { ICourseOutline } from '@oe/api/types/course/course';
import { ScrollArea } from '#shadcn/scroll-area';
import ContentSection from './content-section';
import CourseOutline from './course-sidebar-section';
import { CourseTabs } from './course-tabs/course-tabs';

export default function CourseLearning({
  course,
  section_uid,
  lesson_uid,
}: {
  course: ICourseOutline;
  section_uid: string;
  lesson_uid: string;
}) {
  return (
    <div className="flex h-full flex-col py-4 lg:flex-row">
      <div className="h-full lg:w-2/3 lg:flex-1">
        <ContentSection
          courseData={course}
          lesson={lesson_uid}
          section={section_uid}
          className="h-auto max-h-[calc(100vh-var(--header-height)-16px)] lg:h-[calc(100vh-var(--header-height)-16px)]"
        />
        <CourseTabs courseData={course} activeSection={section_uid} activeLesson={lesson_uid} />
      </div>

      <ScrollArea className="hidden h-[calc(100vh-var(--header-height))] pr-4 pl-3 lg:block lg:w-1/3">
        <CourseOutline courseData={course} activeSection={section_uid} activeLesson={lesson_uid} />
      </ScrollArea>
    </div>
  );
}
