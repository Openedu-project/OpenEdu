// "use client";
import type { ICourseOutline } from '@oe/api/types/course/course';
// import { useRef } from "react";
import { CourseInfo } from './course-info';
import { CourseOutlineDetails } from './course-outline-detail';
import CourseThumbnail from './course-thumbnail';
import StickyCourseSidebar from './sticky-course-sidebar';

export default function CourseDetailContent({
  courseData,
}: {
  courseData: ICourseOutline;
}) {
  // console.log("courseData - CourseDetailContent", courseData);
  // const courseContentRef = useRef<HTMLDivElement>(null);

  // const { setCourseOutline, courseOutline } = useCourseOutlineDetailStore();

  // useEffect(() => {
  //   if (courseData) {
  //     setCourseOutline(courseData);
  //   }
  // }, [courseData]);

  return (
    <>
      <div className="p-2 sm:p-10 md:p-6 xl:p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:grid-cols-3 ">
          <div className="md:col-span-3 lg:col-span-2">
            <div id="course-content">
              <CourseThumbnail className="md:hidden" courseOutline={courseData} />
              <CourseInfo courseData={courseData} />
              <CourseOutlineDetails className="hidden md:flex" courseData={courseData} />
            </div>
          </div>

          {courseData?.thumbnail ? <StickyCourseSidebar courseData={courseData} /> : null}

          <CourseOutlineDetails className="md:hidden" courseData={courseData} />
        </div>
      </div>
    </>
  );
}
