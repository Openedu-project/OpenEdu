'use client';
import type { IAdminLaunchpadDetailRes } from '@oe/api/types/admin-launchpad';
import type { IApproval } from '@oe/api/types/approvals';
import type { ICourseOrganizationRequestProps } from '@oe/api/types/course/org-request';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';

export default function LaunchpadApprovedList() {
  const t = useTranslations('adminLaunchpadApproved');

  const tableRef = useRef<TableRef<IApproval<IAdminLaunchpadDetailRes, ICourseOrganizationRequestProps>>>(null);

  const getBadgeContent = useCallback(
    (status: string) => {
      switch (status) {
        case 'draft':
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-gray-50 px-6 py-2 text-center text-gray-600 ring-1 ring-gray-200/20 ring-inset">
              {t(status)}
            </span>
          );
        case 'waiting':
        case 'reviewing':
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-blue-50 px-6 py-2 text-center text-blue-700 ring-1 ring-blue-700/10 ring-inset">
              {t(status)}
            </span>
          );
        case 'failed':
        case 'rejected':
        case 'cancelled':
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-red-50 px-6 py-2 text-center text-red-700 ring-1 ring-red-600/10 ring-inset">
              {t(status)}
            </span>
          );
        case 'success':
        case 'approved':
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-green-50 px-6 py-2 text-center text-green-700 ring-1 ring-green-600/20 ring-inset">
              {t(status)}
            </span>
          );
        case 'publish':
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-yellow-50 px-6 py-2 text-center text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
              {t(status)}
            </span>
          );
        case 'voting':
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-purple-50 px-6 py-2 text-center text-purple-700 ring-1 ring-purple-700/10 ring-inset">
              {t(status)}
            </span>
          );
        case 'funding':
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-indigo-50 px-6 py-2 text-center text-indigo-700 ring-1 ring-indigo-700/10 ring-inset">
              {t(status)}
            </span>
          );
        case 'refunded':
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-orange-50 px-6 py-2 text-center text-orange-700 ring-1 ring-orange-700/10 ring-inset">
              {t(status)}
            </span>
          );
        default:
          return (
            <span className="giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] bg-gray-50 px-6 py-2 text-center text-gray-600 ring-1 ring-gray-200/20 ring-inset">
              {t(status)}
            </span>
          );
      }
    },
    [t]
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
                endpoint: ADMIN_ROUTES.launchpadApprovedDetail,
                params: { id: item?.entity_id },
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
          return <p className="min-w-[180px]">{formatDateHourMinute(Number(item?.entity?.create_at ?? 0))}</p>;
        },
      },
      {
        header: t('status'),
        accessorKey: 'status',
        size: 180,

        cell: ({ row }) => {
          const item = row.original;
          return getBadgeContent(item?.entity?.status);
        },
      },
    ];
  }, [t, getBadgeContent]);

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.APPROVALS}
        hasNoColumn
        apiParams={{
          page: 1,
          per_page: 10,
          sort: 'request_date desc',
          entity_type: 'clp_launchpad',
          status: 'approved',
        }}
        height="100%"
        ref={tableRef}
        filterSearchProps={{ useQueryParams: true }}
        tableOptions={{
          manualPagination: true,
        }}
      />
    </>
  );
}
