'use client';
import type { IPermissionConfigPayload } from '@oe/api';
import { useCreatePermissionConfig } from '@oe/api';
import { toast } from '@oe/ui';
import { useTable } from '@oe/ui';
import { Button } from '@oe/ui';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { ActionsFormModal } from './actions-form';

export function CreateActionButton() {
  const t = useTranslations('permissionActionList');
  const [isOpenAddActionModal, setIsOpenAddActionModal] = useState(false);
  const { mutateAndClearCache } = useTable();
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
      mutateAndClearCache?.();
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
