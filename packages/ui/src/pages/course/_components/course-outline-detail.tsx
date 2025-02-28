import type { ICourseOutline } from '@oe/api/types/course/course';
import { cn } from '#utils/cn';
import CourseAchievements from './course-achievement';
import CourseCertificate from './course-certificate';
import CourseContent from './course-content';
import { CreatorColabs } from './course-creator';
import SupportingChannels from './course-support-channels';

export function CourseOutlineDetails({
  className,
  courseData,
}: {
  className: string;
  courseData: ICourseOutline;
}) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <CourseAchievements courseOutline={courseData} />
      <CreatorColabs />
      <CourseContent courseOutline={courseData} />
      <SupportingChannels courseOutline={courseData} />
      <CourseCertificate courseOutline={courseData} />
    </div>
  );
}
