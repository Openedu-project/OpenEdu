'use client';

import type { ICourseOutline } from '@oe/api';
import { InfoCircle, Note } from '@oe/assets';
import { CustomTabs } from '#components/custom-tabs';
import { cn } from '#utils/cn';
import { CourseOutline } from '../course-sidebar-section';
import { CourseDescription } from './course-description';

interface ICourseTabsProps {
  course_data: ICourseOutline;
  active_section?: string;
  activeLesson?: string;
  className?: string;
}

const CourseTabs = ({ course_data, className }: ICourseTabsProps) => {
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

  return (
    course_data &&
    tabItems && <CustomTabs items={tabItems} className={cn('flex h-full flex-col bg-white', className)} />
  );
};

export { CourseTabs };
