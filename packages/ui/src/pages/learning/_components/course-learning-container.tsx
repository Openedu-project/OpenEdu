import type { ICourseOutline, ILesson } from "@oe/api";
import type { ICertificate } from "@oe/api";
import { CourseFormTriggerModal } from "#components/course-form-trigger";
import { ContentSection } from "./content-section";
import { CourseOutline } from "./course-sidebar-section";
import { CourseTabs } from "./course-tabs/course-tabs";
import { ReceiveCertificateModal } from "./receive-certificate/receive-cert-modal";
import { memo } from "react";
import { useCurrentLesson } from "../_context/learning-context";

interface ICourseLearning {
  course: ICourseOutline;
  section_uid: string;
  lesson_uid: string;
  certificate?: ICertificate | null;
  lessonData?: ILesson | null;
}

function CourseLearningInternal({
  course,
  section_uid,
  lesson_uid,
  certificate,
  lessonData,
}: ICourseLearning) {
  const { currentSection, currentLesson } = useCurrentLesson();

  return (
    <>
      <div className="relative flex h-full w-full flex-col gap-1 bg-muted/50 py-4 lg:flex-row">
        <div className="mx-auto h-full w-full max-w-[900px]">
          <ContentSection
            className="h-auto max-h-[calc(100dvh-var(--header-with-sub-item-height)-16px)] md:h-[calc(100dvh-var(--header-with-sub-item-height)-16px)]"
            lessonData={lessonData}
          />

          <CourseTabs
            course_data={course}
            active_section={currentSection || section_uid}
            activeLesson={currentLesson || lesson_uid}
          />
        </div>

        <CourseOutline className="scrollbar hidden h-full w-full overflow-y-auto pr-4 pl-3 lg:block lg:w-1/3" />
      </div>

      {course?.has_certificate && certificate && (
        <ReceiveCertificateModal certificate={certificate} />
      )}

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

export const CourseLearning = memo(CourseLearningInternal);
