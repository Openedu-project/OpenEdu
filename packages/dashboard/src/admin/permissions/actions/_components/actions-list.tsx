'use client';
import type { IPermissionConfigActionItem } from '@oe/api/types/permissions';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export default function ActionsList() {
  const t = useTranslations('permissionActionList');
  const tableRef = useRef<TableRef<IPermissionConfigActionItem>>(null);

  const columns: ColumnDef<IPermissionConfigActionItem>[] = [
    {
      header: t('name'),
      accessorKey: 'name',
      size: 200,
    },
    {
      id: 'translation',
      header: t('description'),
      accessorKey: 'description',
      size: 500,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.PAGE_CONFIGS}
        apiQueryParams={{
          type: 'action',
          page: 1,
          per_page: 10,
        }}
        height="100%"
        ref={tableRef}
        filterSearchProps={{ useQueryParams: true }}
        tableOptions={{ manualPagination: true }}
      />
    </>
  );
}
