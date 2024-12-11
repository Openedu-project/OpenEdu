'use client';
import { useCreatePermissionConfig, useGetPermissionPageConfig } from '@oe/api/hooks/usePermission';
import type { IPermissionConfigActionItem, IPermissionConfigPayload } from '@oe/api/types/permissions';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@oe/ui/shadcn/card';
import { toast } from '@oe/ui/shadcn/sonner';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import ActionsFormModal from './actions-form';

export default function ActionsList() {
  const t = useTranslations('permissionActionList');
  const tableRef = useRef<TableRef<IPermissionConfigActionItem>>(null);

  const [isOpenAddActionModal, setIsOpenAddActionModal] = useState(false);

  const { dataListPermissionPageConfig, isLoadingPermissionPageConfig, mutateListPermissionPageConfig } =
    useGetPermissionPageConfig({
      params: {
        type: 'action',
        page: 1,
        per_page: 10,
      },
    });
  const { triggerCreatePermissionConfig } = useCreatePermissionConfig();

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

  const handleOpenAddActionModal = useCallback(() => {
    setIsOpenAddActionModal(true);
  }, []);

  const handleCancelAddActionModal = useCallback(() => {
    setIsOpenAddActionModal(false);
  }, []);

  const handleAddSubmit = async (value: IPermissionConfigPayload) => {
    try {
      await triggerCreatePermissionConfig(value);
      mutateListPermissionPageConfig();
      toast.success(t('success'));
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('title')}</CardTitle>
            <Button onClick={handleOpenAddActionModal}>
              <Plus className="mr-2 h-4 w-4" />
              {t('addAction')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={columns}
            data={dataListPermissionPageConfig?.results ?? []}
            // filterOptions={filterOptions}
            height="100%"
            isLoading={isLoadingPermissionPageConfig}
            ref={tableRef}
            filterSearchProps={{ useQueryParams: true }}
          />
        </CardContent>
      </Card>
      {isOpenAddActionModal && (
        <ActionsFormModal open={isOpenAddActionModal} onClose={handleCancelAddActionModal} onSubmit={handleAddSubmit} />
      )}
    </div>
  );
}
