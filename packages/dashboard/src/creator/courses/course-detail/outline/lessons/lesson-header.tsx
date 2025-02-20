'use client';
import { DeleteButton } from '@oe/ui/components/delete-button';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Check, Copy, Menu, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SegmentBadgeSelect } from '../../../_components/segment-badge-select';
import { useLessonActions } from '../../_hooks/useLessonActions';
import { LessonDrawer } from './lesson-drawer';

export function LessonHeader({ submitLoading }: { submitLoading: boolean }) {
  const tCourse = useTranslations('course');
  const { activeLessons, activeLesson, handleDeleteLesson, handleDuplicateLesson } = useLessonActions();

  const [duplicateLoading, setDuplicateLoading] = useState(false);

  const onDeleteLesson = async () => {
    await handleDeleteLesson();
  };

  const onDuplicateLesson = async () => {
    setDuplicateLoading(true);
    await handleDuplicateLesson();
    setDuplicateLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-md bg-background md:flex-row md:gap-4">
      <div className="flex w-full gap-2 space-y-0">
        <LessonDrawer
          trigger={
            <Button variant="ghost" size="xs" className="flex h-8 w-8 p-0 md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          }
        />
        <FormFieldWithLabel name="title" className="w-full" showErrorMessage={false}>
          <Input type="text" className="h-8" />
        </FormFieldWithLabel>
      </div>
      <div className="flex items-center gap-2">
        <SegmentBadgeSelect className="ml-auto" status={activeLesson?.status} data={activeLesson} type="lesson" />
        <Button variant="outline" className="h-8 w-8 p-0" onClick={onDuplicateLesson} disabled={duplicateLoading}>
          <Copy className="h-4 w-4" />
        </Button>
        {activeLessons.length > 1 && (
          <DeleteButton
            title={tCourse('common.modal.delete.title', {
              item: tCourse('outline.lesson.title').toLowerCase(),
            })}
            description={tCourse('common.modal.delete.description', {
              item: tCourse('outline.lesson.title').toLowerCase(),
            })}
            onDelete={onDeleteLesson}
            variant="outline"
          >
            <Trash2 className="h-4 w-4" />
          </DeleteButton>
        )}
        <Button
          // variant="outline"
          className="gap-2"
          size="xs"
          type="submit"
          loading={submitLoading}
          disabled={submitLoading}
        >
          <Check className="h-4 w-4" />
          {tCourse('common.actions.save')}
        </Button>
      </div>
    </div>
  );
}
