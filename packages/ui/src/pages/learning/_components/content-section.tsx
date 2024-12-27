import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ILesson } from '@oe/api/types/course/segment';

import type { HTMLAttributes } from 'react';
import { cn } from '#utils/cn';
import LessonContent from './lesson-content/lesson-content';
import LessonMetadata from './lesson-metadata';

interface IContentSectionProps extends HTMLAttributes<HTMLDivElement> {
  courseData?: ICourseOutline;
  lesson?: ILesson | null;
}

const ContentSection = ({ courseData, lesson, className, ...props }: IContentSectionProps) => {
  return (
    <div className={cn('grid grid-rows-5 gap-3', className)} {...props}>
      <LessonContent className="row-span-4" courseId={courseData?.id ?? ''} contents={lesson?.contents ?? []} />

      <LessonMetadata
        className="row-span-1"
        title={lesson?.title ?? ''}
        courseName={courseData?.name ?? ''}
        slug={courseData?.slug ?? ''}
        updateAt={courseData?.update_at ?? 0}
      />
    </div>
  );
};

export default ContentSection;
