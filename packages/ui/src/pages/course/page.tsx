import { getCourseOutlineService } from '@oe/api/services/course';
import CourseDetailContent from './_components/course-detail-content';

export default async function CourseDetailPage({ slug }: { slug: string }) {
  const course = await getCourseOutlineService(undefined, { id: slug });

  return course && course !== null ? <CourseDetailContent courseData={course} /> : <p>There's no data available</p>;
}
