'use client';
import { getLearningProgressesService, updateLearningProgressService } from '@oe/api/services/learning-progress';
import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ILessonContent } from '@oe/api/types/course/segment';
import type React from 'react';
import { toast } from 'sonner';
import { ScrollArea } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import { useLessonLearningStore, useQuizSubmissionStore } from '../../_store/learning-store';
import { checkCompleteAt, isLessonContentComplete } from '../../_utils/learning-progress';
import { mergeSectionWithProgress } from '../../_utils/utils';
import type { LessonContentBlockProps } from './_types/types';
import { ContentElement } from './content-block';
import { CONTENT_RENDERERS } from './content-render';

const getWrapperClassName = (contents: ILessonContent[]): string => {
  return cn(
    'h-auto overflow-y-auto md:pr-2 md:pl-4 [&>[data-radix-scroll-area-viewport]>div]:h-full',
    contents.every(item => item.type !== 'embedded') && 'h-full',
    contents.length === 1 &&
      contents[0] &&
      ((contents[0].type === 'video' && contents[0].quizzes?.length === 0) || contents[0].type === 'embedded') &&
      'h-auto aspect-video'
  );
};

const LessonContentBlocks: React.FC<LessonContentBlockProps> = ({
  contents = [],
  section_uid,
  lesson_uid,
  course_data,
  isPreview = false,
}) => {
  const { sectionsProgressData, setSectionsProgressData } = useLessonLearningStore();
  const { quizResult } = useQuizSubmissionStore();

  const onCompleteContent = async (
    lesson_content_uid: string,
    type: TLessonContent,
    videoDuration = 0,
    pauseAt = 0,
    quizId?: string
  ) => {
    const start_at = Date.now();
    const pause_at = Math.floor(pauseAt);
    const complete_at = checkCompleteAt({
      type,
      videoDuration,
      pauseAt,
      quizId,
      quizResult,
    });

    const hasUpdated = isLessonContentComplete({
      outline: sectionsProgressData,
      section_uid,
      lesson_uid,
      lesson_content_uid,
      pause_at,
    });

    if (section_uid && lesson_uid && !hasUpdated) {
      const payload = {
        complete_at,
        section_uid,
        lesson_uid,
        lesson_content_uid,
        course_slug: course_data?.slug,
        pause_at,
        start_at,
      };

      console.log('pause_at', pause_at);
      console.log('complete_at', complete_at);
      console.log('start_at', start_at);

      console.log('==================================');

      try {
        await updateLearningProgressService(undefined, { payload });
        const newLearningProgres = await getLearningProgressesService(undefined, { id: course_data?.slug });

        const data = mergeSectionWithProgress(course_data?.outline, newLearningProgres?.sections);
        setSectionsProgressData(data);

        // onComplete?.();
        if (complete_at > 0) {
          toast.success('Content completed');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (contents.length === 0) {
    return <div className={getWrapperClassName([])}>No data</div>;
  }

  return (
    <ScrollArea className={cn(getWrapperClassName(contents))}>
      {contents?.map(item => {
        const contentType = item.type;
        const renderer = CONTENT_RENDERERS[contentType];
        if (!renderer) {
          return null;
        }

        const elementProps = {
          type: contentType,
          courseData: course_data,
          data: item,
          isOnlyContent: contents.length === 1,
          contents,
          isPreview,
        };

        return (
          <div key={item.id} className={cn(renderer.getClassName(contents.length === 1), '[&>hr]:last:hidden')}>
            <ContentElement
              onCompleteContent={props =>
                onCompleteContent(item?.uid ?? '', item?.type, props?.duration, props?.pause_at, props?.quiz_id)
              }
              {...elementProps}
            />
            <hr className="mt-8" />
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default LessonContentBlocks;
