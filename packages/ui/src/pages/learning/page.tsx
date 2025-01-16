import { getCourseOutlineService } from '@oe/api/services/course';
import { getLearningProgressesService } from '@oe/api/services/learning-progress';
import type { ISectionLearningProgress } from '@oe/api/types/course/learning-progress';
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
  const course = await getCourseOutlineService(undefined, { id: slug });

  const dataLearningProgress = course
    ? await getLearningProgressesService(undefined, {
        id: course?.slug,
      })
    : undefined;

  const learningData =
    course && dataLearningProgress && mergeSectionWithProgress(course?.outline, dataLearningProgress?.sections);

  return (
    course && (
      <>
        <AuthCheck course={course} learning_data={learningData as ISectionLearningProgress[]} />
        <CourseLearning
          course={course}
          section_uid={section}
          lesson_uid={lesson}
          // learning_data={learningData as ISectionLearningProgress[]}
        />
      </>
    )
  );
}
