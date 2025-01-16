'use client';

import { useGetMe } from '@oe/api/hooks/useMe';
import type { IUserAffiliateReportDetailItem } from '@oe/api/types/report-user-affiliate-campaign';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { formatDateTime } from '@oe/core/utils/datetime';
import { formatNumber } from '@oe/core/utils/utils';
import { type ColumnDef, Table } from '@oe/ui/components/table';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export default function UserAffiliateReportDetailList() {
  const t = useTranslations('userAffiliateReport');
  const tNotation = useTranslations('userAffiliateReport.notations');

  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaign_id');
  const courseId = searchParams.get('course_id');
  const { dataMe: me } = useGetMe();

  const isCurrentUser = useCallback((userId: string) => me?.id === userId, [me?.id]);

  const generateNotation = useCallback(
    (item: IUserAffiliateReportDetailItem) => {
      const notations: string[] = [];

      // Check for coupon
      if (item.order?.discount_amount && Number(item.order.discount_amount) > 0) {
        notations.push(tNotation('coupon'));
      }

      // Check for ref1
      if (Number(item.ref1_amount) > 0 && isCurrentUser(item.ref1_user_id)) {
        notations.push(tNotation('ref1Rate'));
      }

      // Check for ref2
      if (Number(item.ref2_amount) > 0 && isCurrentUser(item.ref2_user_id)) {
        notations.push(tNotation('ref2Rate'));
      }

      // Check for ref3
      if (Number(item.ref3_amount) > 0 && isCurrentUser(item.ref3_user_id)) {
        notations.push(tNotation('ref3Rate'));
      }

      // Check for bonus
      if (Number(item.bonus_amount) > 0) {
        notations.push(tNotation('bonusRate'));
      }

      return notations.length > 0 ? (
        <ul className="list-disc pl-4 text-sm">
          {notations.map(notation => (
            <li key={notation} className="text-gray-700">
              {notation}
            </li>
          ))}
        </ul>
      ) : null;
    },
    [isCurrentUser, tNotation]
  );
  const columns: ColumnDef<IUserAffiliateReportDetailItem>[] = useMemo(
    () => [
      {
        header: t('uidOfBuyer'),
        accessorKey: 'order.user_id',
      },
      {
        header: t('date'),
        accessorKey: 'course_name',
        width: 200,
        cell: ({ row }) => {
          const item = row.original;
          return <p>{formatDateTime(item?.create_at)}</p>;
        },
      },
      {
        header: t('price'),
        accessorKey: 'price',
        width: 120,
        cell: ({ row }) => {
          const item = row.original;
          return <>{formatNumber(Number.parseFloat(item?.order_amount ?? 0))}</>;
        },
      },
      {
        header: t('shareRate'),
        accessorKey: 'shareRate',
        width: 120,
        cell: ({ row }) => {
          const item = row.original;
          return <>{formatNumber(Number.parseFloat(item?.share_amount ?? 0))}</>;
        },
      },
      {
        header: t('ref1'),
        accessorKey: 'ref1_amount',
        width: 120,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <span className="text-left">
              {isCurrentUser(item.ref1_user_id) ? (
                <span className="text-[#2ba830]">{formatNumber(Number.parseFloat(item?.ref1_amount ?? 0))}</span>
              ) : (
                '-'
              )}
            </span>
          );
        },
      },
      {
        header: t('ref2'),
        accessorKey: 'ref2_amount',
        width: 120,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <span className="text-left">
              {isCurrentUser(item.ref2_user_id) ? (
                <span className="text-[#2ba830]">{formatNumber(Number.parseFloat(item?.ref2_amount ?? 0))}</span>
              ) : (
                '-'
              )}
            </span>
          );
        },
      },
      {
        header: t('ref3'),
        accessorKey: 'ref3_amount',
        width: 120,
        cell: ({ row }) => {
          const item = row.original;

          return (
            <span className="text-left">
              {isCurrentUser(item.ref3_user_id) ? (
                <span className="text-[#2ba830]">{formatNumber(Number.parseFloat(item?.ref3_amount ?? 0))}</span>
              ) : (
                '-'
              )}
            </span>
          );
        },
      },
      {
        header: t('currency'),
        accessorKey: 'id',
        width: 110,
        cell: () => {
          return <>VND</>;
        },
      },
      {
        header: t('notation'),
        accessorKey: 'notation',
        width: 200,
        cell: ({ row }) => {
          const item = row.original;

          return <>{generateNotation(item)}</>;
        },
      },
    ],
    [generateNotation, isCurrentUser, t]
  );

  return (
    <>
      <Table
        api={me?.id ? API_ENDPOINT.USERS_ME_REFERRALS : ''}
        apiParams={{
          page: 1,
          per_page: 10,
          preloads: ['Campaign', 'Order'],
          campaign_id: campaignId,
          course_cuid: courseId,
        }}
        columns={columns}
        hasNoColumn
        height="550px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
      />
    </>
  );
}
