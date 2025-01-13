import { deleteCourseService } from '@oe/api/services/course';
import { duplicateCourseService } from '@oe/api/services/course';
import type { ICourse } from '@oe/api/types/course/course';
import { DeleteButton } from '@oe/ui/components/delete-button';
import { useTable } from '@oe/ui/components/table';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { CopyIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CourseActions({ data }: { data: ICourse }) {
  const tCourses = useTranslations('courses');
  const { mutateAndClearCache } = useTable();

  const handleDuplicate = async () => {
    try {
      await duplicateCourseService(data.id);
      mutateAndClearCache?.();
      toast.success(tCourses('toast.duplicateSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tCourses('toast.duplicateError'));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCourseService(data.id);
      mutateAndClearCache?.();
      toast.success(tCourses('toast.deleteSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tCourses('toast.deleteError'));
    }
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={handleDuplicate}>
        <CopyIcon className="mr-2 h-4 w-4" />
        {tCourses('actions.duplicate')}
      </Button>
      <DeleteButton
        onDelete={handleDelete}
        title={tCourses('actions.deleteTitle')}
        description={tCourses('actions.deleteDescription')}
        size="sm"
        variant="destructive"
        className="h-auto w-auto"
      >
        <TrashIcon className="mr-2 h-4 w-4" />
        {tCourses('actions.delete')}
      </DeleteButton>
    </div>
  );
}
