'use client';

import { API_ENDPOINT, type IReferralHistory, useGetMe } from '@oe/api';
import { formatDate } from '@oe/core';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { type ColumnDef, Table, type TableRef } from '#components/table';

export function InviteReferralHistory() {
  const t = useTranslations('referralProgram.history');
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('id');
  const tableRef = useRef<TableRef<IReferralHistory>>(null);
  const { dataMe: me } = useGetMe();

  const columns: ColumnDef<IReferralHistory>[] = useMemo(() => {
    return [
      {
        header: 'No',
        size: 50,
        cell: ({ row, table }) => {
          const pageSize = table.getState().pagination.pageSize;
          const pageIndex = table.getState().pagination.pageIndex;
          return pageIndex * pageSize + row.index + 1;
        },
      },
      {
        header: t('refereeId'),
        accessorKey: 'referee_id',
        size: 280,
      },
      {
        header: t('amount'),
        accessorKey: 'amount',
        size: 280,
      },
      {
        header: t('refDate'),
        accessorKey: 'create_at',
        cell: ({ row }) => <>{formatDate(row?.original?.create_at)}</>,
      },
    ];
  }, [t]);

  return (
    <>
      <Table
        api={API_ENDPOINT.OE_MY_REFERRAL_HISTORY}
        apiQueryParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
          user_id: me?.id,
          campaign_id: campaignId,
          trigger: 'register_account',
        }}
        columns={columns}
        ref={tableRef}
        height="550px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
      />
    </>
  );
}
