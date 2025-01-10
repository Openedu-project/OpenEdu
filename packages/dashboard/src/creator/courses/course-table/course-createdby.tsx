import type { ICourse } from '@oe/api/types/course/course';

export default function CourseCreatedBy({ course }: { course: ICourse }) {
  return <>{course.owner.username}</>;
}
