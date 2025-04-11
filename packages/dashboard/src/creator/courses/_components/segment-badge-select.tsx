import type { TCourseStatus } from '@oe/api';
import type { ILesson, ILessonContent, ISection } from '@oe/api';
import { SelectStatusBadge, StatusBadge, type TStatus } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useOptimistic, useTransition } from 'react';
import { useStatusUpdate } from '../_hooks/useStatusUpdate';

const isContentValid = (content: ILessonContent) => {
  switch (content.type) {
    case 'text':
    case 'embedded':
      return !!content.content && content.content.trim() !== '';
    case 'video':
    case 'pdf':
      return Array.isArray(content.files) && content.files.length > 0;
    case 'quiz':
      return Array.isArray(content.quizzes) && content.quizzes.length > 0;
    default:
      return false;
  }
};

// const isLessonValid = (lesson: ILesson) => {
//   const hasContents = lesson?.contents && lesson.contents.length > 0;
//   const hasValidContents = hasContents && lesson.contents?.some(isContentValid);

//   return hasContents && hasValidContents;
// };

interface SegmentBadgeSelectProps {
  className?: string;
  status?: TCourseStatus;
  data?: ISection | ILesson;
  type?: 'lesson' | 'section';
}

export function SegmentBadgeSelect({ className, status, data, type = 'section' }: SegmentBadgeSelectProps) {
  const tGeneral = useTranslations('general');
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic<TCourseStatus | undefined>(
    (data as ISection | ILesson)?.free ? 'preview' : status
  );

  const { handleStatusChange } = useStatusUpdate(type, data);

  const getDisabledStatuses = () => {
    if (type === 'section') {
      const section = data as ISection;
      const hasInvalidLessons = section?.lessons?.every(lesson => lesson.status === 'draft');

      return hasInvalidLessons ? (['publish', 'preview'] as TStatus[]) : [];
    }
    const lesson = data as ILesson;
    const hasContents = lesson?.contents && lesson.contents.length > 0;
    const hasValidContents = hasContents && lesson.contents?.every(isContentValid);

    return hasContents && hasValidContents ? [] : (['publish', 'preview'] as TStatus[]);
  };

  return (
    <SelectStatusBadge
      statuses={['draft', 'publish', 'preview']}
      disabled={isPending}
      value={optimisticStatus || status}
      className={cn(className)}
      onValueChange={value => {
        startTransition(async () => {
          setOptimisticStatus(value as TCourseStatus);
          await handleStatusChange(value);
        });
      }}
      displayItem={value => (
        <div className="grid max-w-96 grid-cols-[100px_1fr] items-center gap-4 py-2">
          <StatusBadge status={value} className="w-full justify-center" />
          <p>{tGeneral(`statusDescription.${type}.${value}`)}</p>
        </div>
      )}
      disabledItems={getDisabledStatuses()}
    />
  );
}
