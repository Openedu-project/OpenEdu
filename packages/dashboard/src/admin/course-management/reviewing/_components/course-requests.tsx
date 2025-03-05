'use client';
import { useApprove, useReject } from '@oe/api/hooks/useApprovals';
import type { IApproval, IApprovalPayload, IRejectPayload } from '@oe/api/types/approvals';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';

import type { ICourse } from '@oe/api/types/course/course';
import type { ICourseOrganizationRequestProps } from '@oe/api/types/course/org-request';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDate } from '@oe/core/utils/datetime';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { BadgeCourseVerion } from '@oe/ui/components/badge-course-version';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AdminFeedbackCourseModal } from './admin-feedback-modal';
import ApproveCourseReviewingModal from './approve-course-reviewing-modal';
import RejectCourseReviewingModal from './reject-course-reviewing-modal';
import { CourseRequestItemActions } from './request-table-item-actions';

type BadgeVariant = 'success' | 'destructive' | 'secondary' | 'default' | 'outline' | null | undefined;
type StatusType = 'approved' | 'rejected' | 'new' | 'cancelled';

const generateVariantBadge = (status: string): BadgeVariant => {
  const obj: Record<StatusType, BadgeVariant> = {
    approved: 'success',
    rejected: 'destructive',
    new: 'secondary',
    cancelled: 'default',
  };

  return obj[status as StatusType];
};

type IApprovalCourseRequest = IApproval<ICourse, ICourseOrganizationRequestProps>;
interface ISelectItem extends IApprovalCourseRequest {
  action: 'reject' | 'approve';
}

export default function CourseRequests() {
  const t = useTranslations('coursesManagement');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IApprovalCourseRequest>>(null);
  const [isOpenDecisionModal, setOpenDecisionModal] = useState(false);
  const [isOpenFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [selectItem, setSelectItems] = useState<ISelectItem | null>(null);

  const { triggerApprove } = useApprove(selectItem?.id ?? '');
  const { triggerReject } = useReject(selectItem?.id ?? '');

  const [readOnly, setReadOnly] = useState(false);

  const handleOpenDecisionModal = useCallback((item: IApprovalCourseRequest, action: 'approve' | 'reject') => {
    setSelectItems({ ...item, action });
    setOpenDecisionModal(true);
  }, []);

  const handleCloseDecisionModal = useCallback(() => {
    setOpenDecisionModal(false);
  }, []);

  const handleOpenFeedbackModal = useCallback(() => {
    setOpenFeedbackModal(true);
  }, []);

  const handleCloseFeedbackModal = useCallback(() => {
    setOpenFeedbackModal(false);
  }, []);

  const handleTriggerDecision = useCallback(
    async (value: IApprovalPayload | IRejectPayload) => {
      try {
        if (selectItem?.action === 'approve') {
          await triggerApprove(value);
          toast.success(t('approveRequestMessage'));
        } else {
          await triggerReject(value);
          toast.success(t('rejectRequestMessage'));
        }
        tableRef.current?.mutateAndClearCache();
        handleCloseDecisionModal();
      } catch (error) {
        console.error('Error', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerApprove, triggerReject, t, tError, handleCloseDecisionModal, selectItem]
  );

  const columns: ColumnDef<IApprovalCourseRequest>[] = useMemo(
    () => [
      {
        header: 'ID',
        accessor: 'id',
        cell: ({ row }) => {
          const item = row.original;
          return <p className="truncate">{item?.id}</p>;
        },
      },
      {
        header: t('courseName'),
        accessor: 'entity',
        size: 250,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Link
              href={`https://${item?.org?.domain}${createAPIUrl({
                endpoint: PLATFORM_ROUTES.previewCourse,
                params: {
                  courseId: item.entity_id,
                  orgId: item.org_id,
                },
              })}`}
              target="_blank"
              className="w-[250px] justify-start truncate px-0 underline"
              key={item?.entity_id}
            >
              {item?.entity?.name ?? '-'}
            </Link>
          );
        },
      },
      {
        header: t('requester'),
        align: 'center',
        accessor: 'requester',
        cell: ({ row }) => {
          const item = row.original;
          return <p>{item.requester.username}</p>;
        },
      },
      {
        header: t('version'),
        align: 'center',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <BadgeCourseVerion
              version={item?.props?.pre_version}
              link={
                item?.props?.pre_id
                  ? `https://${item?.org?.domain}${createAPIUrl({
                      endpoint: PLATFORM_ROUTES.previewCourse,
                      params: {
                        courseId: item.props?.pre_id,
                        orgId: item.org_id,
                      },
                    })}`
                  : undefined
              }
            />
          );
        },
      },
      {
        header: t('requestedVersion'),
        align: 'center',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <BadgeCourseVerion
              version={item?.entity?.version}
              link={`https://${item?.org?.domain}${createAPIUrl({
                endpoint: PLATFORM_ROUTES.previewCourse,
                params: {
                  courseId: item.entity_id,
                  orgId: item.org_id,
                },
              })}`}
            />
          );
        },
      },
      {
        header: t('status'),
        accessor: 'status',
        align: 'center',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Badge variant={generateVariantBadge(item?.status as keyof BadgeVariant)} className="capitalize">
              {item?.status}
            </Badge>
          );
        },
      },
      {
        header: t('requestedDate'),
        accessor: 'request_date',
        align: 'center',
        cell: ({ row }) => {
          const item = row.original;
          return <>{formatDate(item?.request_date)}</>;
        },
      },
      {
        header: t('action'),
        align: 'center',
        sticky: 'right',
        cell({ row }) {
          const item = row.original;
          return (
            <CourseRequestItemActions
              item={item}
              setReadOnly={() => setReadOnly(false)}
              handleAction={handleOpenDecisionModal}
              handleFeedbackModal={() => handleOpenFeedbackModal()}
            />
          );
        },
      },
    ],
    [t, handleOpenDecisionModal, handleOpenFeedbackModal]
  );

  return (
    <>
      <div className="rounded-2xl border bg-bg-base-canvas p-6 shadow-shadow-5">
        <Table
          columns={columns}
          api={API_ENDPOINT.APPROVALS}
          hasNoColumn
          apiQueryParams={{
            page: 1,
            per_page: 10,
            entity_type: 'course',
            sort: 'request_date desc',
          }}
          height="100%"
          ref={tableRef}
          filterSearchProps={{ useQueryParams: true }}
          tableOptions={{
            manualPagination: true,
          }}
        />
        {isOpenDecisionModal && selectItem?.action === 'approve' && (
          <ApproveCourseReviewingModal onClose={handleCloseDecisionModal} onSubmit={handleTriggerDecision} />
        )}
        {isOpenDecisionModal && selectItem?.action === 'reject' && (
          <RejectCourseReviewingModal onClose={handleCloseDecisionModal} onSubmit={handleTriggerDecision} />
        )}
        {isOpenFeedbackModal && (
          <AdminFeedbackCourseModal
            open={true}
            mutate={tableRef.current?.mutate}
            onClose={handleCloseFeedbackModal}
            readOnly={readOnly}
          />
        )}
      </div>
    </>
  );
}
