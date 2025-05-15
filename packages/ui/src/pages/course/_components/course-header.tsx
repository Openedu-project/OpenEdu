'use client';
import { SendSquare } from '@oe/assets';
import { useTranslations } from 'next-intl';
import { cn } from '#utils/cn';
import { useCourseContext } from './course-context';

export function CourseHeader() {
  const tCourse = useTranslations('courseOutline.courseStats');
  const { courseData } = useCourseContext();

  return (
    <div className="flex items-start justify-between gap-2">
      <h1 className={cn('giant-iheading-semibold24 md:giant-iheading-semibold32 mb-0 w-full text-primary-foreground', courseData?.mark_as_completed ? 'max-w-[80%]' : 'max-w-full')}>
        {courseData.name}
      </h1>

      {courseData?.mark_as_completed && (
        <div className="-right-4 md:-right-6 absolute top-0 z-40 flex items-center gap-[2px] rounded-l-full bg-success p-1">
          <div className="grid h-6 w-6 items-center justify-center">
            <SendSquare />
          </div>
          <span className="mcaption-semibold14 hidden text-white md:block">{tCourse('contentCompleted')}</span>
        </div>
      )}
    </div>
  );
}
