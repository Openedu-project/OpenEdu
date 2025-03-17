'use client';

import { useGetCourseById, usePutCancelRequestCourse } from '@oe/api/hooks/useCourse';
import { Link } from '@oe/ui/common/navigation';
import { Modal } from '@oe/ui/components/modal';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface IProps {
  publishedVersion: number;
  reviewingVersion?: number;
  previewUrl?: string;
}

const ManageVersion = ({ publishedVersion, reviewingVersion, previewUrl }: IProps) => {
  const { courseId } = useParams();
  const t = useTranslations('course.history');

  const { course, mutateCourse } = useGetCourseById(courseId as string);
  const { triggerPutCancelRequestCourse } = usePutCancelRequestCourse();

  const [openModal, setOpenModal] = useState(false);

  const handleCancelRequest = useCallback(async () => {
    try {
      if (!course?.org_request) {
        toast.error(t('toast.noRequest'));
        return;
      }

      const res = await triggerPutCancelRequestCourse(course?.org_request.entity_id);

      if (!res) {
        throw new Error('Failed to fetch');
      }
      setOpenModal(false);
      await mutateCourse();
    } catch {
      toast.error(t('toast.actionFail'));
    }
  }, [triggerPutCancelRequestCourse, course?.org_request, mutateCourse, t, toast, setOpenModal]);

  return (
    <div className="flex items-center gap-spacing-m">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {t('published')}
          {
            <Link href={previewUrl ?? '#'}>
              <Badge variant="outline_primary">v{publishedVersion}.0</Badge>
            </Link>
          }
        </div>
        <span>|</span>
        <div className="flex items-center gap-2">
          {t('reviewing')}
          {<Badge variant="outline_primary">v{reviewingVersion}.0</Badge>}
        </div>
      </div>

      {reviewingVersion && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setOpenModal(true);
          }}
          type="button"
        >
          {t('cancelRequest')}
        </Button>
      )}

      {openModal && (
        <Modal open={true} title={t('titleCancel')} onSubmit={handleCancelRequest}>
          <p>{t('confirmCancelContent')}</p>
        </Modal>
      )}
    </div>
  );
};

ManageVersion.display = 'ManageVersion';
export { ManageVersion };
