'use client';
import { useGetMe } from '@oe/api';
import type { IReportAffiliateCampaign } from '@oe/api';
import { type ColumnDef, Table, type TableRef } from '@oe/ui';

import { Button } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';

import { API_ENDPOINT } from '@oe/api';
import { formatNumber } from '@oe/core';
import { cn } from '@oe/ui';
import { CampaignReportDetailModal } from './campaign-report-detail';

export function ReportAffiliateCampaignList() {
  const t = useTranslations('affiliateCampaignReport');
  const tableRef = useRef<TableRef<IReportAffiliateCampaign>>(null);
  const [selectedItem, setSelectedItem] = useState<IReportAffiliateCampaign | null>(null);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { dataMe: me } = useGetMe();

  const handleOpenModal = useCallback((item: IReportAffiliateCampaign | null = null) => {
    setSelectedItem(item);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    setOpenModal(false);
  }, []);

  const columns: ColumnDef<IReportAffiliateCampaign>[] = useMemo(
    () => [
      {
        header: t('campaignName'),
        accessorKey: 'campaign',
        size: 200,
        cell: ({ row }) => {
          const item = row.original;
          return <p>{item?.campaign?.name}</p>;
        },
      },
      {
        header: t('courseName'),
        accessorKey: 'pub_course',
        size: 240,
        cell: ({ row }) => {
          const item = row.original;
          return <p>{item?.pub_course?.name}</p>;
        },
      },
      {
        header: t('currency'),
        accessorKey: 'currency',
        size: 120,
        cell: ({ row }) => {
          const item = row.original;
          return <p>{item?.currency}</p>;
        },
      },
      {
        header: t('ref1Amount'),
        accessorKey: 'ref1_amount',
        size: 180,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Button
              variant="link"
              className={cn(me?.id === item.ref1_user_id ? 'text-primary underline' : 'text-foreground')}
              onClick={() => handleOpenModal(item)}
            >
              {formatNumber(Number(item.ref1_amount))}
            </Button>
          );
        },
      },
      {
        header: t('ref2Amount'),
        accessorKey: 'ref2_amount',
        size: 180,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Button
              variant="link"
              className={cn(me?.id === item.ref2_user_id ? 'text-primary underline' : 'text-foreground')}
              onClick={() => handleOpenModal(item)}
            >
              {formatNumber(Number(item.ref2_amount))}
            </Button>
          );
        },
      },
      {
        header: t('ref3Amount'),
        accessorKey: 'ref3_amount',
        size: 180,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Button
              variant="link"
              className={cn(me?.id === item.ref3_user_id ? 'text-primary underline' : 'text-foreground')}
              onClick={() => handleOpenModal(item)}
            >
              {formatNumber(Number(item.ref3_amount))}
            </Button>
          );
        },
      },
    ],
    [handleOpenModal, me?.id, t]
  );

  return (
    <>
      <Table
        api={API_ENDPOINT.REFERRALS}
        apiQueryParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
          preloads: ['Campaign', 'Ref1User', 'Ref2User', 'Ref3User'],
        }}
        columns={columns}
        ref={tableRef}
        hasNoColumn
        height="550px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
      />
      {isOpenModal && <CampaignReportDetailModal data={selectedItem ?? null} onClose={handleCloseModal} />}
    </>
  );
}
