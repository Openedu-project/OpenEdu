'use client';

import type { TBankAccountSchema } from '@oe/api/schemas/bankAccountSchema';
import { INIT_PAGE_TYPE } from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Button } from '#shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '#shadcn/dialog';
import useBankAccount from '../hooks/useBankAccount';
import useUrlStateHandler from '../hooks/useUrlStateHandler';
import BankAccountForm from './bank-account-form';
import { useBankAccountActions, useDialogState, useFormData } from './useBankAccountStore';

const BankAccountDialog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, isAddNew } = useDialogState();
  const formData = useFormData();
  const { openDialog, closeDialog, resetForm } = useBankAccountActions();
  const { handleAddBankAccount, handleUpdateBankAccount } = useBankAccount();
  const t = useTranslations('bankAccountPage.dialog');

  useUrlStateHandler({
    handlers: [
      {
        type: INIT_PAGE_TYPE.ADD_BANK,
        handler: () => openDialog(true),
      },
    ],
  });

  const handleCloseDialog = useCallback(() => {
    if (!isSubmitting) {
      closeDialog();
      resetForm();
    }
  }, [isSubmitting, closeDialog, resetForm]);

  const handleSubmit = useCallback(
    async (data: TBankAccountSchema) => {
      try {
        setIsSubmitting(true);
        if (isAddNew) {
          await handleAddBankAccount(data);
        } else {
          await handleUpdateBankAccount({
            ...data,
            id: formData.id,
          });
        }
        handleCloseDialog();
      } catch (error) {
        console.error('Failed to submit form:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isAddNew, handleAddBankAccount, handleUpdateBankAccount, handleCloseDialog, formData.id]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="font-semibold text-[24px]">
            {isAddNew ? t('addNewTitle') : t('updateTitle')}
          </DialogTitle>
          <DialogDescription>{isAddNew ? t('addNewDescription') : t('updateDescription')}</DialogDescription>
        </DialogHeader>
        <BankAccountForm defaultValues={formData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
};

export const BackAccountDialogTrigger = () => {
  const { openDialog } = useBankAccountActions();
  const t = useTranslations('bankAccountPage');
  return (
    <Button className="w-fit p-2 text-[14px] md:p-3 md:text-base" onClick={() => openDialog(true)}>
      {t('addNewBtn')}
    </Button>
  );
};

export default BankAccountDialog;
