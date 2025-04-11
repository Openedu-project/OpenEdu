import type { ICourse } from '@oe/api';

export function CourseCreatedBy({ course }: { course: ICourse }) {
  return <>{course.owner.username}</>;
}
