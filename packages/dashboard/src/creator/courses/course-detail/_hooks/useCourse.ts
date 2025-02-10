import { useGetCourseById } from '@oe/api/hooks/useCourse';
import type { ICourse } from '@oe/api/types/course/course';
import { useParams } from 'next/navigation';

export const useCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, courseLoading, mutateCourse } = useGetCourseById(courseId);
  return { course: course as ICourse | undefined, courseLoading, mutateCourse };
};
