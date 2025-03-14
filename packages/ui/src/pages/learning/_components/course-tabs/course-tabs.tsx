'use client';

import type { ICourseOutline } from '@oe/api';
import { InfoCircle, Note } from '@oe/assets';
import { CustomTabs } from '#components/custom-tabs';
import { CourseOutline } from '../course-sidebar-section';
import { CourseDescription } from './course-description';

interface ICourseTabsProps {
  course_data: ICourseOutline;
  active_section?: string;
  activeLesson?: string;
}

const CourseTabs = ({ course_data }: ICourseTabsProps) => {
  const tabItems = course_data && [
    {
      value: 'content',
      label: 'Course Content',
      icon: <Note />,
      content: <CourseOutline />,
      className: 'lg:hidden',
    },
    {
      value: 'description',
      label: 'Description',
      icon: <InfoCircle />,
      content: <CourseDescription courseData={course_data} />,
    },
  ];

  return course_data && tabItems && <CustomTabs items={tabItems} className="mt-4 h-full px-3" />;
};

export { CourseTabs };
