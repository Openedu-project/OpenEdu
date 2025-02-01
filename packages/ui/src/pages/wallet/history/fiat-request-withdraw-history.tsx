import type { TRequestWithdrawHistory } from '@oe/api/types/wallet';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { FIAT_CURRENCIES } from '@oe/api/utils/wallet';
import { formatCurrency } from '@oe/core/utils/currency';
import { formatDateTime } from '@oe/core/utils/datetime';
import { useTranslations } from 'next-intl';
import type { FilterOption } from '#components/filter-search';
import { type ColumnDef, Table } from '#components/table';
import { StatusTableCell } from '../_components/status-table-cell';

export function FiatRequestWithdrawHistory() {
  const t = useTranslations('wallets');

  const fiatColumns: ColumnDef<TRequestWithdrawHistory>[] = [
    {
      accessorKey: 'entity.currency',
      header: t('historyPage.table.currency'),
      size: 150,
      headerClassName: 'bg-background',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {FIAT_CURRENCIES[row.original.entity.currency as keyof typeof FIAT_CURRENCIES]?.icon({
              height: 20,
              width: 20,
            })}
            <span>{row.original.entity.currency}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'create_at',
      header: t('historyPage.table.date'),
      size: 250,
      headerClassName: 'bg-background',
      cell: ({ row }) => (row.original.create_at ? formatDateTime(Number(row.original.create_at)) : ''),
    },
    {
      accessorKey: 'type',
      header: t('historyPage.table.typeOfAction'),
      headerClassName: 'bg-background',
      size: 200,
      cell: ({ row }) => {
        return t(`type.${row.original.type}`);
      },
    },
    {
      accessorKey: 'request_value',
      header: t('historyPage.table.amount'),
      size: 200,
      headerClassName: 'bg-background',
      cell: ({ row }) => {
        const amount = Number(row.original.request_value) || 0;
        return (
          <span className={amount < 0 ? 'text-destructive' : 'text-success'}>
            {amount < 0 ? '-' : '+'}
            {formatCurrency(Math.abs(amount), {
              currency: row.original.entity?.currency,
            })}
          </span>
        );
      },
    },
    {
      accessorKey: 'status',
      header: t('historyPage.table.status'),
      headerClassName: 'bg-background flex-1',
      className: 'flex-1',
      cell: ({ row }) => {
        const status = row.original.status;
        return <StatusTableCell status={status} />;
      },
    },
  ];

  const fiatFilterOptions: FilterOption[] = [
    {
      label: t('historyPage.fiat'),
      value: 'currency',
      type: 'select',
      id: 'currency',
      options: Object.entries(FIAT_CURRENCIES).map(([value]) => ({
        label: value,
        value,
      })),
    },
    {
      label: t('historyPage.table.status'),
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
  ];
  return (
    <Table
      api={API_ENDPOINT.USERS_ME_APPROVALS}
      tableOptions={{
        manualPagination: true,
        manualSorting: true,
      }}
      columns={fiatColumns}
      filterOptions={fiatFilterOptions}
      apiParams={{
        type: 'wallet_fiat_withdrawal',
        page: 1,
        per_page: 10,
        sort: 'create_at desc',
      }}
      wrapperClassName="bg-transparent"
      className="bg-background"
    />
  );
}
