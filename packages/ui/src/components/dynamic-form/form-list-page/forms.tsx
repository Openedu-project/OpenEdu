'use client';

import { deleteFormService } from '@oe/api/services/forms';
import type { IFormResponse } from '@oe/api/types/form';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { formatDate } from '@oe/core/utils/datetime';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { StatusBadge } from '@oe/ui/components/status-badge';
import { type ColumnDef, Table, useTable } from '@oe/ui/components/table';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Link } from '#common/navigation';
import { DeleteButton } from '#components/delete-button';
import type { FilterOption } from '#components/filter-search';

export default function Forms() {
  const t = useTranslations('dynamicForms');
  const { mutateAndClearCache } = useTable();

  const handleDelete = async (id: string) => {
    try {
      await deleteFormService(undefined, { id });
      await mutateAndClearCache?.();

      toast.success(t('form.deleteSuccess'));
    } catch {
      toast.error(t('form.deleteError'));
    }
  };

  const columns: ColumnDef<IFormResponse>[] = [
    {
      accessorKey: 'title',
      header: t('form.name'),
      size: 200,
      enableSorting: false,
      cell: ({ row }) => (
        <Link
          href={buildUrl({
            endpoint: CREATOR_ROUTES.formDetail,
            params: { id: row.original.id },
          })}
          className="p-0 font-medium"
          title={row.getValue('title')}
        >
          {row.getValue('title')}
        </Link>
      ),
    },
    {
      accessorKey: 'description',
      header: t('form.description'),
      size: 250,
      enableSorting: false,
      cell: ({ row }) => row.getValue('description'),
    },
    {
      accessorKey: 'status',
      header: t('form.status'),
      enableSorting: false,
      cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
    },
    {
      accessorKey: 'update_at',
      header: t('form.lastUpdated'),
      enableSorting: false,
      cell: ({ row }) => formatDate(row.getValue('update_at')),
    },
    {
      accessorKey: 'actions',
      header: t('form.actions'),
      sticky: 'right',
      enableSorting: false,
      cell: ({ row }) => (
        <DeleteButton
          onDelete={async onClose => {
            await handleDelete(row.original.id);
            onClose?.();
          }}
          title={t('form.delete')}
          description={t('form.deleteDescription')}
          className="w-full gap-2"
          variant="destructive"
        >
          <Trash2 className="h-4 w-4" />
          {t('form.delete')}
        </DeleteButton>
      ),
    },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: t('form.name'),
      value: 'title',
      global: false,
      type: 'search',
      id: 'title',
    },
  ];

  return (
    <Table<IFormResponse>
      api={API_ENDPOINT.FORMS}
      apiQueryParams={{ is_template: true }}
      columns={columns}
      filterOptions={filterOptions}
      hasNoColumn={true}
      tableOptions={{
        manualPagination: true,
      }}
    />
  );
}
