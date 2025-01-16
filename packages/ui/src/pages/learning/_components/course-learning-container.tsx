import type { ICourseOutline } from '@oe/api/types/course/course';
import { ScrollArea } from '#shadcn/scroll-area';
import ContentSection from './content-section';
import CourseOutline from './course-sidebar-section';

export default function CourseLearning({
  course,
  section_uid,
  lesson_uid,
  // learning_data,
}: {
  course: ICourseOutline;
  section_uid: string;
  lesson_uid: string;
  // learning_data: ISectionLearningProgress[];
}) {
  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col py-4 lg:flex-row">
      <ContentSection
        courseData={course}
        lesson={lesson_uid}
        section={section_uid}
        // outline={learning_data as ISectionLearningProgress[]}
        className="h-full lg:w-2/3 lg:flex-1"
      />

      <ScrollArea className="hidden pr-4 pl-3 lg:block lg:w-1/3">
        <CourseOutline
          courseData={course}
          activeSection={section_uid}
          activeLesson={lesson_uid}
          // outline={learning_data as ISectionLearningProgress[]}
        />
      </ScrollArea>
    </div>
  );
}
