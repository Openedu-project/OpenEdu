'use client';
import type { TLessonContent } from '@oe/api';
import type { ILesson } from '@oe/api';
import { Button } from '@oe/ui';
import { DeleteButton } from '@oe/ui';
import { Modal } from '@oe/ui';
import { Selectbox } from '@oe/ui';
import { cn } from '@oe/ui';
import { Copy, PlusIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLessonActions } from '../../_hooks/useLessonActions';
import { useOutlineStore } from '../../_store/useOutlineStore';
import { tabOptions } from './lesson-content-options';
import { hasContent } from './utils';

export interface LessonContentTabHeaderProps {
  activeLesson?: ILesson;
  value: TLessonContent;
  hasErrors?: boolean;
}

export function LessonContentTabHeader({ value, activeLesson, hasErrors }: LessonContentTabHeaderProps) {
  const tCourse = useTranslations('course');
  const tCourseLesson = useTranslations('course.outline.lesson');
  const { handleLessonContentTypeChange, handleRemoveLessonContent, handleDuplicateLessonContent, handleAddQuiz } =
    useLessonActions();
  const { activeLessonContent } = useOutlineStore();

  const { reset, getValues } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<TLessonContent>(value);
  const [openWarning, setOpenWarning] = useState(false);
  const [duplicateLoading, setDuplicateLoading] = useState(false);
  const [addQuizLoading, setAddQuizLoading] = useState(false);

  const onChangeType = (value: string) => {
    if (hasContent(activeLessonContent)) {
      setType(value as TLessonContent);
      setOpenWarning(true);
    } else {
      handleTypeChange(value as TLessonContent);
    }
  };

  const handleTypeChange = async (currentType?: TLessonContent) => {
    setIsLoading(true);
    await handleLessonContentTypeChange(currentType, type);
    setIsLoading(false);
    setOpenWarning(false);
  };

  const onRemoveLessonContent = async (onClose?: () => void) => {
    await handleRemoveLessonContent();
    onClose?.();
  };

  const onDuplicateLessonContent = async () => {
    setDuplicateLoading(true);
    await handleDuplicateLessonContent();
    setDuplicateLoading(false);
  };

  const onAddQuiz = async () => {
    setAddQuizLoading(true);
    const currentLesson = getValues();
    const currentQuizzes = currentLesson.contents?.[activeLessonContent?.order ?? 0]?.quizzes;
    const updatedLesson = await handleAddQuiz(currentQuizzes);
    if (updatedLesson) {
      reset({
        contents: updatedLesson.contents,
      });
    }

    setAddQuizLoading(false);
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
          options={Object.values(tabOptions).map(option => ({
            ...option,
            label: tCourseLesson(option.label),
          }))}
          value={type ?? value}
          onChange={onChangeType}
          disabled={isLoading}
          displayValue={value => {
            const option = tabOptions[value as TLessonContent];
            return (
              <div className="flex items-center gap-2">
                {option?.icon}
                <span>{tCourseLesson(option?.label)}</span>
              </div>
            );
          }}
          className="h-8 min-w-[200px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="h-8 gap-2 px-2 py-0"
          onClick={onAddQuiz}
          disabled={addQuizLoading}
          loading={addQuizLoading}
        >
          <PlusIcon className="h-4 w-4" />
          {tCourseLesson('actions.addQuiz')}
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={onDuplicateLessonContent}
          disabled={duplicateLoading}
        >
          <Copy className="h-4 w-4" />
        </Button>
        {(activeLesson?.contents?.length ?? 0) > 1 && (
          <DeleteButton
            variant="outline"
            title={tCourse('common.modal.delete.title', {
              item: tCourse('outline.lesson.contentTitle').toLowerCase(),
            })}
            description={tCourse('common.modal.delete.description', {
              item: tCourse('outline.lesson.contentTitle').toLowerCase(),
            })}
            onDelete={onRemoveLessonContent}
            className="ml-auto"
          >
            <Trash2Icon className="h-4 w-4" />
          </DeleteButton>
        )}
      </div>
      <Modal
        open={openWarning}
        title={tCourse('common.modal.changeContent.title', {
          item: tCourse('outline.lesson.contentTitle').toLowerCase(),
        })}
        description={tCourse('common.modal.changeContent.description', {
          item: tCourse('outline.lesson.contentTitle').toLowerCase(),
        })}
        buttons={[
          {
            label: tCourse('common.actions.cancel'),
            variant: 'outline',
            onClick: () => {
              setOpenWarning(false);
            },
          },
          {
            label: tCourse('common.actions.continue'),
            variant: 'destructive',
            loading: isLoading,
            onClick: () => {
              handleTypeChange();
            },
          },
        ]}
      />
    </div>
  );
}
