import { getCourseOutlineService } from '@oe/api/services/course';
import { getUserProfileService } from '@oe/api/services/user';
import { NoDataAvailable } from '#components/no-data-available';
import CourseDetailContent from './_components/course-detail-content';

export default async function CourseDetailPage({ slug }: { slug: string }) {
  const course = await getCourseOutlineService(undefined, { id: slug });
  const creatorData = await getUserProfileService(undefined, { id: course?.owner?.username });

  return course ? <CourseDetailContent courseData={course} creatorData={creatorData} /> : <NoDataAvailable />;
}
