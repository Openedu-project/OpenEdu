'use client';

import { API_ENDPOINT } from '@oe/api';
import { createAPIUrl } from '@oe/api';
import type { IApproval } from '@oe/api';
import type { ICourseOrganizationRequestProps } from '@oe/api';
import type { IAdminLaunchpadDetailRes } from '@oe/api';
import { ADMIN_ROUTES } from '@oe/core';
import { formatDateHourMinute } from '@oe/core';
import { type ColumnDef, Table, type TableRef } from '@oe/ui';
import { Link } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';

// Badge Component with integrated translation
type StatusType =
  | 'draft'
  | 'waiting'
  | 'reviewing'
  | 'failed'
  | 'rejected'
  | 'cancelled'
  | 'success'
  | 'approved'
  | 'publish'
  | 'voting'
  | 'funding'
  | 'refunded';
const Badge = ({
  status,
  t,
}: {
  status: StatusType;
  t: (key: string) => string;
}) => {
  const statusStyles = useMemo(
    () => ({
      draft: {
        bg: 'bg-neutral-50',
        text: 'text-neutral-600',
      },
      waiting: {
        bg: 'bg-info-50',
        text: 'text-info-600',
      },
      reviewing: {
        bg: 'bg-info-50',
        text: 'text-info-600',
      },
      failed: {
        bg: 'bg-negative-50',
        text: 'text-negative-500',
      },
      rejected: {
        bg: 'bg-negative-50',
        text: 'text-negative-500',
      },
      cancelled: {
        bg: 'bg-negative-50',
        text: 'text-negative-500',
      },
      success: {
        bg: 'bg-positive-50',
        text: 'text-positive-600',
      },
      approved: {
        bg: 'bg-positive-50',
        text: 'text-positive-600',
      },
      publish: {
        bg: 'bg-warning-50',
        text: 'text-warning-600',
      },
      voting: {
        bg: 'bg-tertiary-50',
        text: 'text-tertiary-800',
      },
      funding: {
        bg: 'bg-primary-100',
        text: 'text-primary',
      },
      refunded: {
        bg: 'bg-orange-50',
        text: 'text-orange-500',
      },
    }),
    []
  );

  const styles = statusStyles[status] || { bg: '', text: '' };

  return (
    <span
      className={`giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] px-6 py-2 ${styles.bg} ${styles.text}`}
    >
      {t(status)}
    </span>
  );
};

export function LaunchpadApprovedList() {
  const t = useTranslations('adminLaunchpadApproved');
  const tableRef = useRef<TableRef<IApproval<IAdminLaunchpadDetailRes, ICourseOrganizationRequestProps>>>(null);

  const getBadgeContent = useCallback(
    (status: string) => {
      if (!status) {
        return null;
      }
      return <Badge status={status as StatusType} t={t} />;
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
    <Table
      columns={columns}
      api={API_ENDPOINT.APPROVALS}
      hasNoColumn
      apiQueryParams={{
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
  );
}
