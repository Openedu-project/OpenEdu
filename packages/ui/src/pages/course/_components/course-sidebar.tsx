import type { ICourseOutline } from '@oe/api/types/course/course';
import CourseIncludes from './course-includes';
import CourseThumbnail from './course-thumbnail';
import { PaymentCard } from './payment-card';

const CourseSidebar = ({ courseData }: { courseData: ICourseOutline }) => (
  <div className="rounded-lg md:border md:border-foreground/20 md:p-4 lg:p-6">
    <CourseThumbnail className="hidden md:block" courseOutline={courseData} />
    <CourseIncludes className="!mb-4" courseOutline={courseData} />
    <hr />
    <PaymentCard courseOutline={courseData} />
  </div>
);

export default CourseSidebar;
