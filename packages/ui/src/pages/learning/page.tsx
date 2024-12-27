import { getCourseOutlineService } from '@oe/api/services/course';
import { getLessonLearnService } from '@oe/api/services/lesson-learn';
import CourseLearning from './_components/course-learning-container';

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
  const lessonData = course ? await getLessonLearnService(undefined, { id: lesson, cid: course?.id }) : undefined;

  return course && <CourseLearning course={course} section={section} lesson={lessonData} />;
}
