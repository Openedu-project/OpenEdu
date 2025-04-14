import { deleteCourseService } from '@oe/api';
import { duplicateCourseService } from '@oe/api';
import type { ICourse } from '@oe/api';
import { toast } from '@oe/ui';
import { useTable } from '@oe/ui';
import { Button } from '@oe/ui';
import { DeleteButton } from '@oe/ui';
import { CopyIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CourseActions({ data }: { data: ICourse }) {
  const tCourse = useTranslations('course');
  const { mutateAndClearCache } = useTable();

  const handleDuplicate = async () => {
    try {
      await duplicateCourseService(data.id);
      mutateAndClearCache?.();
      toast.success(
        tCourse('common.toast.duplicateSuccess', {
          item: tCourse('common.courseTitle'),
        })
      );
    } catch (error) {
      console.error(error);
      toast.error(
        tCourse('common.toast.duplicateError', {
          item: tCourse('common.courseTitle'),
        })
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCourseService(data.id);
      mutateAndClearCache?.();
      toast.success(
        tCourse('common.toast.deleteSuccess', {
          item: tCourse('common.courseTitle'),
        })
      );
    } catch (error) {
      console.error(error);
      toast.error(
        tCourse('common.toast.deleteError', {
          item: tCourse('common.courseTitle'),
        })
      );
    }
  };

  return (
    <div className="flex gap-2">
      <Button size="xs" variant="outline" onClick={handleDuplicate}>
        <CopyIcon className="mr-2 h-4 w-4" />
        {tCourse('common.actions.duplicate')}
      </Button>
      <DeleteButton
        onDelete={handleDelete}
        title={tCourse('common.modal.delete.title', {
          item: tCourse('common.courseTitle'),
        })}
        description={tCourse('common.modal.delete.description', {
          item: tCourse('common.courseTitle'),
        })}
        size="xs"
        variant="destructive"
        className="h-auto w-auto"
      >
        <TrashIcon className="mr-2 h-4 w-4" />
        {tCourse('common.actions.delete')}
      </DeleteButton>
    </div>
  );
}
