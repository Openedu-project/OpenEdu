import type { ICourseOutline } from '@oe/api/types/course/course';
import { InfoCircle } from '@oe/assets/icons/info-circle';
import { Note } from '@oe/assets/icons/note';
import { CustomTabs } from '#components/custom-tabs';
import CourseOutline from '../course-sidebar-section';

interface ICourseTabsProps {
  courseData?: ICourseOutline;
  activeSection?: string;
  activeLesson?: string;
}

export function CourseTabs({ courseData, activeSection, activeLesson }: ICourseTabsProps) {
  const tabItems = [
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
      content: <div>Description content goes here...</div>,
    },
  ];

  return <CustomTabs items={tabItems} className="mt-4 px-3 h-full" />;
}
