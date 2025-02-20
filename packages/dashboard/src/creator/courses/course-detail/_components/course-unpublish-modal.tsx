import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { unpublishCourseService } from '@oe/api/services/course';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { Modal } from '@oe/ui/components/modal';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
export function CourseUnpublishModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const tCourse = useTranslations('course');
  const { courseId } = useParams<{ courseId: string }>();
  const { mutateCourse } = useGetCourseById(courseId);
  const { mutate } = useSWRConfig();

  const [isLoading, setIsLoading] = useState(false);

  const handleUnpublish = async () => {
    setIsLoading(true);
    try {
      await unpublishCourseService(undefined, courseId);
      await Promise.all([
        mutateCourse(),
        mutate((key: string) => !!key?.includes(API_ENDPOINT.COURSES), undefined, { revalidate: false }),
      ]);
      toast.success(tCourse('common.toast.unpublishSuccess'));
    } catch {
      toast.error(tCourse('common.toast.unpublishError'));
    }
    onClose();
    setIsLoading(false);
  };

  return (
    <Modal
      title={tCourse('common.modal.unpublish.title')}
      description={tCourse('common.modal.unpublish.description')}
      open={isOpen}
      buttons={[
        {
          label: tCourse('common.actions.cancel'),
          variant: 'outline',
          onClick: onClose,
        },
        {
          label: tCourse('common.actions.unpublish'),
          variant: 'destructive',
          onClick: handleUnpublish,
          loading: isLoading,
          disabled: isLoading,
        },
      ]}
    />
  );
}
