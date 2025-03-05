'use client';
import { useApprove, useReject } from '@oe/api/hooks/useApprovals';
import type { IAdminLaunchpadDetailRes } from '@oe/api/types/admin-launchpad';
import type { IApproval, IApprovalPayload, IRejectPayload } from '@oe/api/types/approvals';
import type { ICourseOrganizationRequestProps } from '@oe/api/types/course/org-request';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';
import ApproveLaunchpadModal from './approve-launchpad-modal';
import RejectLaunchpadModal from './reject-launchpad-modal';

export default function LaunchpadRequestsList() {
  const t = useTranslations('adminLaunchpadRequest');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IApproval<IAdminLaunchpadDetailRes, ICourseOrganizationRequestProps>>>(null);

  const [selectedItem, setSelectedItem] = useState<IApproval<
    IAdminLaunchpadDetailRes,
    ICourseOrganizationRequestProps
  > | null>(null);
  const [isOpenApproveModal, setIsOpenApproveModal] = useState<boolean>(false);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState<boolean>(false);

  const { triggerApprove, isLoadingApprove } = useApprove(selectedItem?.id ?? '');
  const { triggerReject } = useReject(selectedItem?.id ?? '');

  const handleOpenApproveModal = useCallback(
    (item: IApproval<IAdminLaunchpadDetailRes, ICourseOrganizationRequestProps>) => {
      setSelectedItem(item);
      setIsOpenApproveModal(true);
    },
    []
  );

  const handleCloseApproveModal = useCallback(() => {
    setSelectedItem(null);
    setIsOpenApproveModal(false);
  }, []);

  const handleOpenRejectModal = useCallback(
    (item: IApproval<IAdminLaunchpadDetailRes, ICourseOrganizationRequestProps>) => {
      setSelectedItem(item);

      setIsOpenRejectModal(true);
    },
    []
  );

  const handleCloseRejectModal = useCallback(() => {
    setSelectedItem(null);

    setIsOpenRejectModal(false);
  }, []);

  const handleApprove = useCallback(
    async (values: IApprovalPayload) => {
      try {
        await triggerApprove(values);

        await tableRef?.current?.mutateAndClearCache();
        toast.success(t('approveSuccess'));
        handleCloseApproveModal();
      } catch (error) {
        console.error('Error Approve Launchpad', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleCloseApproveModal, triggerApprove, t, tError]
  );

  const handleReject = useCallback(
    async (values: IRejectPayload) => {
      try {
        await triggerReject(values);
        await tableRef?.current?.mutateAndClearCache();
        toast.success(t('rejectSuccess'));
        handleCloseRejectModal();
      } catch (error) {
        console.error('Error Reject Launchpad', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleCloseRejectModal, triggerReject, t, tError]
  );

  const columns: ColumnDef<IApproval<IAdminLaunchpadDetailRes, ICourseOrganizationRequestProps>>[] = useMemo(() => {
    return [
      {
        header: t('launchpadName'),
        accessorKey: 'launchpadName',
        searchable: true,
        size: 210,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Link
              className="p-0"
              href={createAPIUrl({
                endpoint: ADMIN_ROUTES.launchpadRequestsDetail,
                params: { id: item?.entity_id },
                queryParams: { orderId: item?.id },
              })}
            >
              {item?.entity?.name}
            </Link>
          );
        },
      },
      {
        header: t('courseName'),
        accessorKey: 'courseName',
        size: 250,
        cell: ({ row }) => {
          const item = row.original;
          return <p>{item?.entity?.courses?.[0]?.name}</p>;
        },
      },
      {
        header: t('owner'),
        accessorKey: 'owner',
        cell: ({ row }) => {
          const item = row.original;
          return <p>{item?.entity?.owner?.display_name ?? ''}</p>;
        },
      },
      {
        header: t('requestedDate'),
        accessorKey: 'requestedDate',
        size: 180,

        cell: ({ row }) => {
          const item = row.original;
          return <p className="min-w-[180px]">{formatDateHourMinute(Number(item?.entity?.create_at))}</p>;
        },
      },
      {
        header: t('action'),
        size: 210,
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="flex w-[210px] justify-center gap-2">
              <Button
                variant="destructive"
                onClick={() => {
                  handleOpenRejectModal(item);
                }}
              >
                {t('reject')}
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  handleOpenApproveModal(item);
                }}
              >
                {t('approve')}
              </Button>
            </div>
          );
        },
      },
    ];
  }, [handleOpenApproveModal, handleOpenRejectModal, t]);

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.APPROVALS}
        hasNoColumn
        apiQueryParams={{
          page: 1,
          per_page: 10,
          sort: 'request_date desc',
          entity_type: 'clp_launchpad',
          status: 'new',
        }}
        height="100%"
        ref={tableRef}
        filterSearchProps={{ useQueryParams: true }}
        tableOptions={{
          manualPagination: true,
        }}
      />
      {isOpenApproveModal && (
        <ApproveLaunchpadModal
          isLoading={isLoadingApprove}
          onSubmit={handleApprove}
          onClose={handleCloseApproveModal}
        />
      )}

      {isOpenRejectModal && <RejectLaunchpadModal onSubmit={handleReject} onClose={handleCloseRejectModal} />}
    </>
  );
}
