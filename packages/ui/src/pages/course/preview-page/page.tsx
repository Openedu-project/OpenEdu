import { getPreviewCourseByIdService, getSectionsHaveLessonsByCourseIdService } from '@oe/api';
import type { ICourseOutline } from '@oe/api';
import { CourseDetailContent } from '../_components/course-detail-content';

export async function CoursePreviewDetail({
  orgId,
  courseId,
}: {
  orgId: string;
  courseId: string;
}) {
  const [course, segments] = await Promise.all([
    getPreviewCourseByIdService(null, {
      payload: { courseId, orgId },
      init: undefined,
    }),
    getSectionsHaveLessonsByCourseIdService(null, {
      params: { course_id: courseId, status: 'publish' },
      init: undefined,
    }),
  ]);
  const courseData: ICourseOutline = {
    ...course,
    outline: segments.results?.sort((a, b) => a.order - b.order),
    learning_progress_overview: null,
  };

  return course ? <CourseDetailContent courseData={courseData} /> : <p>There's no data available</p>;
}
