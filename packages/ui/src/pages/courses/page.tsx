import { getCourseOutlineService } from '@oe/api/services/course';
import CourseOutlineContent from './_components/course-outline-content';

export default async function CourseOutlinePage({ slug }: { slug: string }) {
  const course = await getCourseOutlineService(undefined, { id: slug });

  return course && course !== null ? <CourseOutlineContent courseData={course} /> : <p>There's no data available</p>;
}
