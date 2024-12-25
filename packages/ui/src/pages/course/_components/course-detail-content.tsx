'use client';
import type { ICourseOutline } from '@oe/api/types/course/course';
import { type HTMLAttributes, useEffect, useRef } from 'react';
import { useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';
import CourseAchievements from './course-achievement';
import CourseCertificate from './course-certificate';
import CourseContent from './course-content';
import { CourseInfo } from './course-info';
import SupportingChannels from './course-support-channels';
import CourseThumbnail from './course-thumbnail';
import StickyCourseSidebar from './sticky-course-sidebar';

interface CourseOutlineDetailsProps extends HTMLAttributes<HTMLDivElement> {
  courseOutline: ICourseOutline;
}

export default function CourseDetailContent({
  courseData,
}: {
  courseData: ICourseOutline;
}) {
  const courseContentRef = useRef<HTMLDivElement>(null);

  const { setCourseOutline, courseOutline } = useCourseOutlineDetailStore();

  useEffect(() => {
    if (courseData) {
      setCourseOutline(courseData);
    }
  }, [courseData]);

  const CourseOutlineDetails = ({ className, courseOutline, ...props }: CourseOutlineDetailsProps) => {
    return (
      <div className={className} {...props}>
        <CourseAchievements courseOutline={courseOutline} />
        <CourseContent courseOutline={courseOutline} />
        <SupportingChannels courseOutline={courseOutline} />
        <CourseCertificate courseOutline={courseOutline} />
      </div>
    );
  };

  return (
    <>
      <div className="p-2 sm:p-10 md:p-6 xl:p-10">
        {courseData ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:grid-cols-3 ">
            <div className="md:col-span-3 lg:col-span-2">
              <div ref={courseContentRef}>
                <CourseThumbnail className="md:hidden" courseOutline={courseData} />
                <CourseInfo courseData={courseData} />
                <CourseOutlineDetails className="hidden md:block" courseOutline={courseData} />
              </div>
            </div>

            {courseOutline?.thumbnail ? (
              <StickyCourseSidebar courseContentRef={courseContentRef} courseData={courseData} />
            ) : null}

            <CourseOutlineDetails className="md:hidden" courseOutline={courseData} />
          </div>
        ) : (
          <>There is no data</>
        )}
      </div>
    </>
  );
}
