import { getCourseOutlineService } from '@oe/api/services/course';
import { NoDataAvailable } from '#components/no-data-available';
import CourseDetailContent from './_components/course-detail-content';

export default async function CourseDetailPage({ slug }: { slug: string }) {
  const course = await getCourseOutlineService(undefined, { id: slug });
  // console.log("course - CourseDetailPage", course);
  return course ? <CourseDetailContent courseData={course} /> : <NoDataAvailable />;
}
