'use client';

import type { ICourseOutline } from '@oe/api';
import { InfoCircle, Note } from '@oe/assets';
import { CustomTabs } from '#components/custom-tabs';
import { CourseOutline } from '../course-sidebar-section';
import { CourseDescription } from './course-description';

interface ICourseTabsProps {
  courseData: ICourseOutline;
  activeSection?: string;
  activeLesson?: string;
}

const CourseTabs = ({ courseData, activeSection, activeLesson }: ICourseTabsProps) => {
  const tabItems = courseData && [
    {
      value: 'content',
      label: 'Course Content',
      icon: <Note />,
      content: <CourseOutline courseData={courseData} activeSection={activeSection} activeLesson={activeLesson} />,
      className: 'lg:hidden',
    },
    {
      value: 'description',
      label: 'Description',
      icon: <InfoCircle />,
      content: <CourseDescription courseData={courseData} />,
    },
  ];

  return courseData && tabItems && <CustomTabs items={tabItems} className="mt-4 h-full px-3" />;
};

export { CourseTabs };
