'use client';
import { useCreatePermissionConfig } from '@oe/api/hooks/usePermission';
import type { IPermissionConfigPayload } from '@oe/api/types/permissions';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { useTable } from '@oe/ui/components/table';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import ActionsFormModal from './actions-form';

export default function CreateActionButton() {
  const t = useTranslations('permissionActionList');
  const [isOpenAddActionModal, setIsOpenAddActionModal] = useState(false);
  const { mutate: globalMutate } = useSWRConfig();
  const { mutate } = useTable();
  const { triggerCreatePermissionConfig } = useCreatePermissionConfig();

  const handleOpenAddActionModal = useCallback(() => {
    setIsOpenAddActionModal(true);
  }, []);

  const handleCancelAddActionModal = useCallback(() => {
    setIsOpenAddActionModal(false);
  }, []);

  const handleAddSubmit = async (value: IPermissionConfigPayload) => {
    try {
      await triggerCreatePermissionConfig(value);
      globalMutate((key: string) => !!key?.includes(API_ENDPOINT.PAGE_CONFIGS), undefined, { revalidate: false });
      mutate?.();
      toast.success(t('success'));
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className="flex justify-start md:justify-end">
      <Button onClick={handleOpenAddActionModal}>
        <Plus className="mr-2 h-4 w-4" />
        {t('addAction')}
      </Button>
      {isOpenAddActionModal && (
        <ActionsFormModal open={isOpenAddActionModal} onClose={handleCancelAddActionModal} onSubmit={handleAddSubmit} />
      )}
    </div>
  );
}
