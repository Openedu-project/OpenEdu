import type { ICourseOutline } from '@oe/api';
import type { ICertificate } from '@oe/api';
import { CourseFormTriggerModal } from '#components/course-form-trigger';
import { ScrollArea } from '#shadcn/scroll-area';
import { ContentSection } from './content-section';
import { CourseOutline } from './course-sidebar-section';
import { CourseTabs } from './course-tabs/course-tabs';
import { ReceiveCertificateModal } from './receive-certificate/receive-cert-modal';

interface ICourseLearning {
  course: ICourseOutline;
  section_uid: string;
  lesson_uid: string;
  certificate?: ICertificate | null;
}

export function CourseLearning({ course, section_uid, lesson_uid, certificate }: ICourseLearning) {
  return (
    <>
      <div className="flex h-full flex-col gap-1 bg-muted/50 py-4 lg:flex-row">
        <div className="h-full lg:w-2/3 lg:flex-1">
          <ContentSection
            courseData={course}
            lesson={lesson_uid}
            section={section_uid}
            className="h-auto max-h-[calc(100vh-var(--header-height)-16px)] md:h-[calc(100vh-var(--header-height)-16px)]"
          />
          <CourseTabs courseData={course} activeSection={section_uid} activeLesson={lesson_uid} />
        </div>

        <ScrollArea className="hidden h-full pr-4 pl-3 lg:block lg:w-1/3">
          <CourseOutline courseData={course} activeSection={section_uid} activeLesson={lesson_uid} />
        </ScrollArea>
      </div>

      {course?.has_certificate && certificate && <ReceiveCertificateModal certificate={certificate} />}

      {/* {course?.form_relations?.map((form) => ( form?.enabled &&
        <CourseFormTrigger
          key={form?.id}
          formData={form}
          courseData={course}
        />
      ))} */}

      <CourseFormTriggerModal />
    </>
  );
}
