'use client';
import { SendSquare } from '@oe/assets';
import { useTranslations } from 'next-intl';
import { useCourseContext } from './course-context';

export function CourseHeader() {
  const tCourse = useTranslations('courseOutline.courseStats');
  const { courseData } = useCourseContext();

  return (
    <div className="flex items-start justify-between gap-2">
      <h1 className="giant-iheading-semibold24 md:giant-iheading-semibold32 mb-0 text-white">{courseData.name}</h1>

      {courseData?.mark_as_completed && (
        <div className="absolute top-4 right-0 flex items-center gap-2 rounded-l-full bg-success p-1 md:top-6">
          <div className="grid h-6 w-6 items-center justify-center">
            <SendSquare />
          </div>
          <span className="mcaption-semibold14 hidden text-white md:block">{tCourse('contentCompleted')}</span>
        </div>
      )}
    </div>
  );
}
