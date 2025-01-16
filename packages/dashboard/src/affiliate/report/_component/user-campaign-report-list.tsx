'use client';
import { useGetMe } from '@oe/api/hooks/useMe';
import { useGetUserAffiliateSummariesReport } from '@oe/api/hooks/useUserAffiliateReport';
import type { IUserAffiliateReportItem } from '@oe/api/types/report-user-affiliate-campaign';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { AFFILIATE_ROUTES } from '@oe/core/utils/routes';
import { formatNumber } from '@oe/core/utils/utils';
import { Link } from '@oe/ui/common/navigation';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { type ColumnDef, Table } from '@oe/ui/components/table';
import { buttonVariants } from '@oe/ui/shadcn/button';
import { Tooltip } from '@oe/ui/shadcn/tooltip';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useUserAffiliateReport } from './user-campaign-report-provider';

export default function AffiliateManagementContent() {
  const t = useTranslations('userAffiliateReport');
  const { dataMe: me } = useGetMe();
  const { selectedOption } = useUserAffiliateReport();
  const { dataUserAffiliateSummariesReport: dataGetUserAffiliateSummariesReport } = useGetUserAffiliateSummariesReport({
    params: { userId: me?.id ?? '', user_id: me?.id, type: 'user' },
  });

  const { dataUserAffiliateSummariesReport: dataGetUserAffiliateSummariesReportUSD } =
    useGetUserAffiliateSummariesReport({
      params: {
        userId: me?.id ?? '',
        user_id: me?.id,
        type: 'user',
        currency: 'USD',
      },
    });

  const columns: ColumnDef<IUserAffiliateReportItem>[] = useMemo(
    () => [
      {
        header: t('campaign'),
        accessorKey: 'name',
        size: 200,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Tooltip content={item?.name}>
              <p className="">{item?.name}</p>
            </Tooltip>
          );
        },
      },
      {
        header: t('course'),
        accessorKey: 'course_name',
        size: 200,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Tooltip content={item?.course_name}>
              <p className="">{item?.course_name}</p>
            </Tooltip>
          );
        },
      },
      {
        header: t('price'),
        accessorKey: 'price',
        size: 140,
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="text-center">
              <p>{formatNumber(Number.parseFloat(item?.price ?? 0))}</p>
              <p className="text-center">{item?.currency}</p>
            </div>
          );
        },
      },
      {
        header: t('shareRate'),
        accessorKey: 'max_share_rate',
        size: 140,
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="text-center">
              {item?.max_share_rate ? t('upTo') : ''} {item?.max_share_rate}%
            </div>
          );
        },
      },
      {
        header: t('ref1'),
        accessorKey: 'ref1_amount',
        size: 120,
        cell: ({ row }) => {
          const item = row.original;

          return <>{formatNumber(Number.parseFloat(item?.ref1_amount ?? 0))}</>;
        },
      },
      {
        header: t('ref2'),
        accessorKey: 'ref2_amount',
        size: 120,
        cell: ({ row }) => {
          const item = row.original;

          return <>{formatNumber(Number.parseFloat(item?.ref2_amount ?? 0))}</>;
        },
      },
      {
        header: t('ref3'),
        accessorKey: 'ref3_amount',
        size: 120,
        cell: ({ row }) => {
          const item = row.original;

          return <span className="w-[140px]">{formatNumber(Number.parseFloat(item?.ref3_amount ?? 0))}</span>;
        },
      },
      {
        header: t('totalEarned'),
        accessorKey: 'id',
        size: 170,
        cell: ({ row }) => {
          const item = row.original;

          return (
            <span className="text-[#2BA830]">
              {formatNumber(
                Number.parseFloat(item?.ref1_amount ?? 0) +
                  Number.parseFloat(item?.ref2_amount ?? 0) +
                  Number.parseFloat(item?.ref3_amount ?? 0)
              )}
            </span>
          );
        },
      },
      {
        header: t('detail'),
        sticky: 'right',
        size: 180,
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="flex items-center justify-end space-x-2 ">
              <Link
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'w-[120px] cursor-pointer truncate text-primary'
                )}
                href={`${AFFILIATE_ROUTES.campaignReportDetail}?course_id=${item?.course_cuid}&course_name=${item?.course_name}&campaign_id=${item?.campaign_id}&campaign_name=${item?.name}`}
              >
                {t('viewDetail')}
              </Link>
            </div>
          );
        },
      },
    ],
    [t]
  );

  const filterOptions: FilterOption[] = useMemo(
    () => [
      {
        value: 'name',
        label: t('campaign'),
        type: 'search',
        id: 'campaign',
      },
      {
        value: 'course_name',
        label: t('course'),
        type: 'search',
        id: 'course_name',
      },
    ],
    [t]
  );

  return (
    <>
      <Table
        api={me?.id ? API_ENDPOINT.REFERRALS_USER_REPORT : ''}
        apiParams={{
          page: 1,
          per_page: 10,
          user_id: me?.id,
          sort: 'rp.create_at desc',
        }}
        columns={columns}
        hasNoColumn
        height="550px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
        filterOptions={filterOptions}
      >
        <div className="flex flex-col items-start gap-1 lg:flex-row">
          <h3 className="giant-iheading-semibold16 pt-2">{t('totalEstimatedRevenue')}</h3>
          <div className="block">
            {selectedOption === 'VND' && (
              <p className="giant-iheading-semibold24">
                {formatNumber(Number.parseFloat(dataGetUserAffiliateSummariesReport?.total_amount ?? '0'))}
                <span className="giant-iheading-semibold12">VND</span>
              </p>
            )}
            {selectedOption === 'USD' && (
              <p className="giant-iheading-semibold24">
                {formatNumber(Number.parseFloat(dataGetUserAffiliateSummariesReportUSD?.total_amount ?? '0'))}
                <span className="giant-iheading-semibold12">USD</span>
              </p>
            )}
          </div>
        </div>
      </Table>
    </>
  );
}
