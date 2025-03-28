import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getCertLayerByCourseIdService } from '@oe/api/services/certificate';
import { getCourseOutlineService } from '@oe/api/services/course';
import { getLearningProgressesService, latestLessonProgressService } from '@oe/api/services/learning-progress';
import type { ILatestLessonProgressPayload, ISectionLearningProgress } from '@oe/api/types/course/learning-progress';
import { AuthCheck } from './_components/auth-check-learning';
import CourseLearning from './_components/course-learning-container';
import { mergeSectionWithProgress } from './_utils/utils';

export default async function LearningPage({
  slug,
  section,
  lesson,
}: {
  slug: string;
  section: string;
  lesson: string;
}) {
  const me = await getMeServiceWithoutError();
  const course = await getCourseOutlineService(undefined, { id: slug });

  const dataLearningProgress =
    me && course
      ? await getLearningProgressesService(undefined, {
          id: course?.slug,
        })
      : undefined;

  const certLayerData =
    course && (await getCertLayerByCourseIdService(undefined, { params: { courseId: course?.id ?? '' } }));

  const latestLessonPayload = {
    course_cuid: course?.cuid ?? '',
    course_slug: slug,
    user_id: me?.id,
    section_uid: section,
    lesson_uid: lesson,
    event: 'latest_lesson_progress',
  } as ILatestLessonProgressPayload;

  await latestLessonProgressService(undefined, {
    payload: latestLessonPayload,
    shouldFetch: !!(me && course?.is_enrolled),
  });

  const learningData =
    course && dataLearningProgress && mergeSectionWithProgress(course?.outline, dataLearningProgress?.sections);

  return (
    !!course && (
      <>
        <AuthCheck
          me={me}
          course={course}
          learning_data={learningData as ISectionLearningProgress[]}
          lesson_uid={lesson as string}
        />
        {course?.is_enrolled && (
          <CourseLearning course={course} section_uid={section} lesson_uid={lesson} certificate={certLayerData} />
        )}
      </>
    )
  );
}
