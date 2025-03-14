import { getMeServiceWithoutError } from "@oe/api";
import { getCertLayerByCourseIdService } from "@oe/api";
import { getCourseOutlineService } from "@oe/api";
import {
  getLearningProgressesService,
  latestLessonProgressService,
} from "@oe/api";
import { getLessonLearnService } from "@oe/api";
import type {
  ILatestLessonProgressPayload,
  ISectionLearningProgress,
} from "@oe/api";
import { Suspense } from "react";
import { NoDataAvailable } from "#components/no-data-available";
import { Spinner } from "#components/spinner";
import { AuthCheck } from "./_components/auth-check-learning";
import { CourseLearning } from "./_components/course-learning-container";
import { LearningProviders } from "./_context/learning-context";
import { mergeSectionWithProgress } from "./_utils/utils";

export async function LearningPage({
  slug,
  section,
  lesson,
}: {
  slug: string;
  section: string;
  lesson: string;
}) {
  const [me, course] = await Promise.all([
    getMeServiceWithoutError(),
    getCourseOutlineService(undefined, { id: slug }),
  ]);

  if (!course) {
    return <NoDataAvailable />;
  }

  const progressPromise =
    me && course
      ? getLearningProgressesService(undefined, { id: course.slug })
      : Promise.resolve(undefined);

  const certLayerPromise = course
    ? getCertLayerByCourseIdService(undefined, {
        params: { courseId: course.id ?? "" },
      })
    : Promise.resolve(undefined);

  const lessonLearnPromise =
    me && course?.is_enrolled
      ? getLessonLearnService(undefined, { id: lesson, cid: course?.id })
      : Promise.resolve(undefined);

  const [dataLearningProgress, certLayerData, lessonData] = await Promise.all([
    progressPromise,
    certLayerPromise,
    lessonLearnPromise,
  ]);

  if (me && course?.is_enrolled) {
    const latestLessonPayload = {
      course_cuid: course.cuid ?? "",
      course_slug: slug,
      user_id: me.id,
      section_uid: section,
      lesson_uid: lesson,
      event: "latest_lesson_progress",
    } as ILatestLessonProgressPayload;

    Promise.allSettled([
      latestLessonProgressService(undefined, {
        payload: latestLessonPayload,
        shouldFetch: true,
      }),
    ]);
  }

  const learningData =
    course && dataLearningProgress
      ? mergeSectionWithProgress(course.outline, dataLearningProgress.sections)
      : undefined;

  return (
    course && (
      <LearningProviders
        course={course}
        initialProgressData={learningData as ISectionLearningProgress[]}
        initialSection={section}
        initialLesson={lesson}
      >
        <AuthCheck me={me} course={course} />

        {course?.is_enrolled && (
          <Suspense
            fallback={
              <div className="h-[calc(100dvh-var(--header-with-sub-item-height))]">
                <Spinner />
              </div>
            }
          >
            <CourseLearning
              course={course}
              section_uid={section}
              lesson_uid={lesson}
              certificate={certLayerData}
              lessonData={lessonData}
            />
          </Suspense>
        )}
      </LearningProviders>
    )
  );
}
