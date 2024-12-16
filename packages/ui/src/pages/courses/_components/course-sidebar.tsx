import CourseIncludes from './course-includes';
import CourseThumbnail from './course-thumbnail';

const CourseSidebar = () => (
  <div className="rounded-lg md:border md:border-foreground/20 md:p-4 lg:p-6 ">
    <CourseThumbnail className="hidden md:block" />
    <CourseIncludes />
  </div>
);

export default CourseSidebar;
