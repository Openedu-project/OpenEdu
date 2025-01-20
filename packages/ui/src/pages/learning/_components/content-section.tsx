import type { ICourseOutline } from '@oe/api/types/course/course';

import { getLessonLearnService } from '@oe/api/services/lesson-learn';
import type { HTMLAttributes } from 'react';
import { cn } from '#utils/cn';
import { sortByOrder } from '../_utils/utils';
import LessonContentBlocks from './lesson-content/lesson-content-blocks';
import LessonMetadata from './lesson-metadata';

interface IContentSectionProps extends HTMLAttributes<HTMLDivElement> {
  courseData?: ICourseOutline;
  lesson: string;
  section: string;
}

const ContentSection = async ({ courseData, lesson, className, section, ...props }: IContentSectionProps) => {
  const lessonData = courseData
    ? await getLessonLearnService(undefined, {
        id: lesson,
        cid: courseData?.id,
      })
    : undefined;

  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      <LessonContentBlocks
        course_data={courseData as ICourseOutline}
        contents={lessonData?.contents?.sort(sortByOrder) ?? []}
        section_uid={section}
        lesson_uid={lesson}
      />

      <LessonMetadata
        title={lessonData?.title ?? ''}
        courseName={courseData?.name ?? ''}
        slug={courseData?.slug ?? ''}
        updateAt={courseData?.update_at ?? 0}
        className="px-2 md:pl-4"
        lessonUid={lesson}
      />
    </div>
  );
};

export default ContentSection;
