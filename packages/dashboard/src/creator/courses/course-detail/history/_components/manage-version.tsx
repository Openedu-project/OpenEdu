'use client';

import { useGetCourseById, usePutCancelRequestCourse } from '@oe/api';
import { useGetOrganizationById } from '@oe/api';
import { PLATFORM_ROUTES, buildUrl } from '@oe/core';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { Link } from '@oe/ui';
import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

interface IProps {
  publishedVersion: number;
  reviewingVersion?: number;
}

const generateVersion = (version?: number) => (
  <p className="!no-underline font-bold text-primary text-sm">{version ? `V.${version}.0` : '-'}</p>
);

const ManageVersion = ({ publishedVersion, reviewingVersion }: IProps) => {
  const { courseId } = useParams();
  const t = useTranslations('course.history');

  const { course, mutateCourse } = useGetCourseById(courseId as string);

  const orgId = useMemo(() => course?.published?.find(p => p.status === 'publish')?.org_id, [course]);

  const { dataListOrganizationById } = useGetOrganizationById({
    id: orgId || '',
  });

  const { triggerPutCancelRequestCourse } = usePutCancelRequestCourse();

  const [openModal, setOpenModal] = useState(false);

  const previewUrl = useMemo(() => {
    if (!orgId) {
      return '';
    }

    return course
      ? `https://${dataListOrganizationById?.alt_domain || dataListOrganizationById?.domain}${buildUrl({
          endpoint: PLATFORM_ROUTES.previewCourse,
          params: {
            courseId: course.id,
            orgId: orgId,
          },
        })}`
      : '#';
  }, [orgId, dataListOrganizationById, course]);

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
  }, [triggerPutCancelRequestCourse, course?.org_request, mutateCourse, t]);

  return (
    <div className="flex w-full items-center justify-between gap-spacing-m">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <p className="font-bold">{t('published')}</p>
          {
            <Link target="_blank" href={previewUrl} className="h-fit p-0">
              {generateVersion(publishedVersion)}
            </Link>
          }
        </div>
        <span>|</span>
        <div className="flex items-center gap-1">
          <p className="font-bold">{t('reviewing')}</p>
          {generateVersion(reviewingVersion)}
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
        <Modal
          open={true}
          title={t('titleCancle')}
          onSubmit={handleCancelRequest}
          buttons={[
            {
              label: 'aaa',
              type: 'submit',
              variant: 'destructive',
            },
          ]}
        >
          <p>{t('confirmCancelContent')}</p>
        </Modal>
      )}
    </div>
  );
};

ManageVersion.display = 'ManageVersion';
export { ManageVersion };
