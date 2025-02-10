import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import { deleteLessonContentService, updateSegmentService } from '@oe/api/services/course';
import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ILesson, ILessonContent, ISegment } from '@oe/api/types/course/segment';
import { DeleteButton } from '@oe/ui/components/delete-button';
import { Selectbox } from '@oe/ui/components/selectbox';
import { toast } from '@oe/ui/shadcn/sonner';
import { cn } from '@oe/ui/utils/cn';
import { Trash2Icon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { tabOptions } from './lesson-content-options';

export interface LessonContentTabHeaderProps {
  activeLesson?: ILesson;
  activeLessonContent?: ILessonContent;
  value: TLessonContent;
  hasErrors?: boolean;
}

export function LessonContentTabHeader({
  value,
  activeLesson,
  activeLessonContent,
  hasErrors,
}: LessonContentTabHeaderProps) {
  const { sectionId } = useParams<{
    courseId: string;
    sectionId: string;
    lessonId: string;
  }>();
  const { mutateSegment } = useGetSegmentById(sectionId);

  const [isLoading, setIsLoading] = useState(false);

  const handleTypeChange = async (value: string) => {
    if (!activeLessonContent) {
      return;
    }
    setIsLoading(true);
    try {
      await updateSegmentService(undefined, {
        ...activeLesson,
        contents: activeLesson?.contents?.map(content => {
          if (content.id === activeLessonContent.id) {
            return {
              ...content,
              type: value as TLessonContent,
            };
          }
          return content;
        }),
      } as ISegment);
      mutateSegment();
    } catch {
      toast.error('Failed to update lesson content type');
    }
    setIsLoading(false);
  };

  const handleRemoveLessonContent = async (onClose?: () => void) => {
    if (!activeLessonContent?.id) {
      return;
    }
    try {
      await deleteLessonContentService(undefined, activeLessonContent.id);
      await mutateSegment();
    } catch {
      toast.error('Failed to remove lesson content');
    }
    onClose?.();
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between border border-primary bg-muted p-2',
        hasErrors && 'border-destructive'
      )}
    >
      <div className="flex items-center gap-2">
        <Selectbox
          options={Object.values(tabOptions)}
          value={value}
          onChange={handleTypeChange}
          disabled={isLoading}
          displayValue={value => {
            const option = tabOptions[value as TLessonContent];
            return (
              <div className="flex items-center gap-2">
                {option?.icon}
                <span>{option?.label}</span>
              </div>
            );
          }}
          className="h-8 min-w-[200px]"
        />
      </div>
      {(activeLesson?.contents?.length ?? 0) > 1 && (
        <DeleteButton
          variant="ghost"
          title="Remove lesson content"
          description="This action cannot be undone. Are you sure you want to remove this lesson content?"
          onDelete={handleRemoveLessonContent}
          className="ml-auto"
        >
          <Trash2Icon className="h-4 w-4" />
        </DeleteButton>
      )}
    </div>
  );
}
