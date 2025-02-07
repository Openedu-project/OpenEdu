'use client';

import type { ITransaction } from '@oe/api/types/wallet';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { CRYPTO_CURRENCIES } from '@oe/api/utils/wallet';
import { formatCurrency } from '@oe/core/utils/currency';
import { formatDateTime } from '@oe/core/utils/datetime';
import { type ColumnDef, Table } from '@oe/ui/components/table';
import { useTranslations } from 'next-intl';
import { shortenAddress } from '#utils/crypto';
import { StatusTableCell } from '../_components/status-table-cell';

export const EarningTransactions = () => {
  const t = useTranslations('wallets');

  const columns: ColumnDef<ITransaction>[] = [
    {
      accessorKey: 'currency',
      header: t('earningPage.token'),
      size: 150,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {CRYPTO_CURRENCIES[row.original.currency as keyof typeof CRYPTO_CURRENCIES]?.icon({
              height: 20,
              width: 20,
            })}
            <span>{row.original.currency}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'create_at',
      header: t('earningPage.createdAt'),
      size: 250,
      cell: ({ row }) => (row.original.create_at ? formatDateTime(Number(row.original.create_at)) : ''),
    },
    {
      accessorKey: 'type',
      header: t('earningPage.type'),
      cell: ({ row }) => {
        return t(`type.${row.original.type}`);
      },
    },
    {
      accessorKey: 'amount',
      header: t('earningPage.amount'),
      size: 200,
      cell: ({ row }) => {
        const amount = Number(row.original.amount) || 0;
        return (
          <span className={amount < 0 ? 'text-destructive' : 'text-success'}>
            {amount < 0 ? '-' : '+'}
            {formatCurrency(Math.abs(amount), {
              showSymbol: false,
              decimals: 2,
            })}
          </span>
        );
      },
    },
    {
      accessorKey: 'tx_hash',
      header: t('earningPage.transactionHash'),
      size: 200,
      cell: ({ row }) => {
        return row.original.tx_hash ? (
          <a
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://nearblocks.io/txns/${row.original.tx_hash}`}
          >
            {shortenAddress(row.original.tx_hash)}
          </a>
        ) : null;
      },
    },
    {
      accessorKey: 'status',
      header: t('earningPage.status'),
      cell: ({ row }) => {
        const status = row.original.status;
        return <StatusTableCell status={status} />;
      },
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="mcaption-semibold16">{t('earningPage.transactionHistory')}</h3>
      <Table
        columns={columns}
        api={API_ENDPOINT.USERS_ME_TRANSACTIONS}
        apiParams={{
          currency_type: 'crypto',
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
          preloads: 'Files',
          type: 'claim_earning',
        }}
        tableOptions={{
          manualPagination: true,
          manualSorting: true,
        }}
        filterOptions={[
          {
            label: t('earningPage.token'),
            value: 'currency',
            type: 'select',
            id: 'currency',
            options: Object.keys(CRYPTO_CURRENCIES).map(currency => ({
              label: currency,
              value: currency,
            })),
          },
          {
            label: t('earningPage.status'),
            value: 'status',
            type: 'select',
            id: 'status',
            options: [
              { label: t('status.success'), value: 'success' },
              { label: t('status.pending'), value: 'pending' },
              { label: t('status.failed'), value: 'failed' },
              { label: t('status.new'), value: 'new' },
              { label: t('status.cancelled'), value: 'cancelled' },
              { label: t('status.rejected'), value: 'rejected' },
              { label: t('status.approved'), value: 'approved' },
            ],
          },
        ]}
      />
    </div>
  );
};
