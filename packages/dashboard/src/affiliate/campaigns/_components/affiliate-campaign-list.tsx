'use client';
import type { IUserAffiliateCampaignItem } from '@oe/api/types/affiliate-campaign';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { AFFILIATE_ROUTES } from '@oe/core/utils/routes';
import { formatNumber } from '@oe/core/utils/utils';
import { Link } from '@oe/ui/common/navigation';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Button, buttonVariants } from '@oe/ui/shadcn/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@oe/ui/shadcn/select";
import { Tooltip } from '@oe/ui/shadcn/tooltip';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';
import CampaignCommissionDetailModal from './campaign-commission-detail-modal';

export default function AffiliateManagementContent() {
  const t = useTranslations('userAffiliateCampaigns');

  const tableRef = useRef<TableRef<IUserAffiliateCampaignItem>>(null);

  const [isOpenCommissionDetailModal, setOpenCommissionDetailModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IUserAffiliateCampaignItem | null>(null);

  const handleOpenCommissionDetailModal = useCallback((item: IUserAffiliateCampaignItem) => {
    setSelectedItem(item);
    setOpenCommissionDetailModal(true);
  }, []);

  const handleCloseCommissionDetailModal = useCallback(() => {
    setSelectedItem(null);
    setOpenCommissionDetailModal(false);
  }, []);

  const columns: ColumnDef<IUserAffiliateCampaignItem>[] = useMemo(
    () => [
      {
        header: t('campaign'),
        accessorKey: 'name',
        size: 155,
        className: 'font-medium py-4',

        cell: ({ row }) => {
          const item = row.original;
          return (
            <Tooltip content={item?.name} className="ml-1">
              <p className="line-clamp-1 cursor-pointer">{item?.name}</p>
            </Tooltip>
          );
        },
      },
      {
        header: t('course'),
        accessorKey: 'course_name',
        size: 155,
        className: 'font-medium py-4',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Tooltip content={item?.name} className="ml-1">
              <p className="line-clamp-1 cursor-pointer">{item?.name}</p>
            </Tooltip>
          );
        },
      },
      {
        header: t('price'),
        accessorKey: 'price',
        size: 100,
        className: 'font-medium py-4',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="text-center">
              <p className="text-center">{formatNumber(String(Number.parseFloat(item?.price ?? '0')))}</p>
              <p className="text-center">{item?.currency}</p>
            </div>
          );
        },
      },
      {
        header: t('shareRate'),
        accessorKey: 'premium_share_rate_max',
        size: 140,
        className: 'font-medium py-4',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <p className="flex min-w-[119px] gap-1 py-2 text-center">
              <span>{item?.premium_share_rate_max ? t('upTo') : ''}</span>
              <span>{item?.premium_share_rate_max}%</span>
            </p>
          );
        },
      },
      {
        header: t('learner'),
        align: 'center',
        columns: [
          {
            accessorKey: 'base_rate_max',
            header: t('ref1'),
            cell: ({ row }) => {
              const item = row.original;
              return (
                <div className="py-2 text-center">
                  {`${
                    item?.base_rate_min === item?.base_rate_max
                      ? `${item?.base_rate_max}%`
                      : `${item?.base_rate_min} - ${item?.base_rate_max}%`
                  }`}
                </div>
              );
            },
          },
          {
            accessorKey: 'base_rate_ref2',
            header: t('ref2'),
            cell: ({ row }) => {
              const item = row.original;
              return <div className="py-2 text-center">{item?.base_rate_ref2}%</div>;
            },
          },
        ],
      },
      {
        header: t('basicUser'),
        align: 'center',
        columns: [
          {
            accessorKey: 'learner_rate_min',
            header: t('ref1'),
            cell: ({ row }) => {
              const item = row.original;
              return (
                <div className="py-2 text-center">
                  {`${
                    item?.learner_rate_min === item?.learner_rate_max
                      ? `${item?.learner_rate_max}%`
                      : `${item?.learner_rate_min} - ${item?.learner_rate_max}%`
                  }`}
                </div>
              );
            },
          },
          {
            accessorKey: 'learner_rate_max',
            header: t('ref2'),
            cell: ({ row }) => {
              const item = row.original;
              return <div className="py-2 text-center">{item?.learner_rate_max === 0 ? 0 : item?.base_rate_ref2}%</div>;
            },
          },
        ],
      },
      {
        header: t('premiumUser'),
        align: 'center',
        columns: [
          {
            accessorKey: 'premium_rate_min',
            header: t('ref1'),
            cell: ({ row }) => {
              const item = row.original;
              return (
                <div className="py-2 text-center">
                  {`${
                    item?.premium_rate_min === item?.premium_rate_max
                      ? `${item?.premium_rate_max}%`
                      : `${item?.premium_rate_min} - ${item?.premium_rate_max}%`
                  }`}
                </div>
              );
            },
          },
          {
            accessorKey: 'premium_rate_max',
            header: t('ref2'),
            cell: ({ row }) => {
              const item = row.original;
              return <div className="py-2 text-center">{item?.premium_rate_max === 0 ? 0 : item?.base_rate_ref2}%</div>;
            },
          },
        ],
      },
      {
        header: t('action'),
        sticky: 'right',
        align: 'center',
        size: 180,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center justify-center gap-3">
              <Button variant="default" onClick={() => handleOpenCommissionDetailModal(item)} className=" px-2 py-1">
                {t('getLinkBtn')}
              </Button>
              <Link
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'cursor-pointer truncate px-2 py-1 text-primary'
                )}
                href={`${createAPIUrl({
                  endpoint: AFFILIATE_ROUTES.campaignDetail,
                  params: { id: item?.id },
                })}?campaign_name=${item?.name}&course_name=${
                  item?.course_name
                }&org_domain=${item?.org_domain}&course_slug=${
                  item?.course_slug
                }&course_price=${item?.price}&start_date=${item?.start_date}&end_date=${item?.end_date}`}
              >
                {t('detailBtn')}
              </Link>
            </div>
          );
        },
      },
    ],
    [handleOpenCommissionDetailModal, t]
  );

  return (
    <>
      <Table
        api={API_ENDPOINT.USERS_ME_AFFILIATE_CAMPAIGNS}
        apiParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
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
      {isOpenCommissionDetailModal && (
        <CampaignCommissionDetailModal
          title={selectedItem?.course_name ?? ''}
          campaignId={selectedItem?.id ?? ''}
          courseSlug={selectedItem?.course_slug ?? ''}
          orgDomain={selectedItem?.org_domain ?? ''}
          onClose={handleCloseCommissionDetailModal}
        />
      )}
    </>
  );
}
