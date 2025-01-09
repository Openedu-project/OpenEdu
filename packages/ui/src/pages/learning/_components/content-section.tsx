import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ILesson } from '@oe/api/types/course/segment';

import type { HTMLAttributes } from 'react';
import { cn } from '#utils/cn';
import LessonContentBlocks from './lesson-content/lesson-content-blocks';
import LessonMetadata from './lesson-metadata';

interface IContentSectionProps extends HTMLAttributes<HTMLDivElement> {
  courseData?: ICourseOutline;
  lesson?: ILesson | null;
}

const ContentSection = ({ courseData, lesson, className, ...props }: IContentSectionProps) => {
  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      <LessonContentBlocks courseId={courseData?.id ?? ''} contents={lesson?.contents ?? []} />

      <LessonMetadata
        title={lesson?.title ?? ''}
        courseName={courseData?.name ?? ''}
        slug={courseData?.slug ?? ''}
        updateAt={courseData?.update_at ?? 0}
      />
    </div>
  );
};

export default ContentSection;
