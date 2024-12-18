import { useSearchParams } from 'next/navigation';

import { INIT_PAGE_TYPE } from '@oe/api/utils/wallet';
import { useRouter } from '@oe/ui/common/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@oe/ui/shadcn/dialog';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import useBankAccount from '../../../_hooks/useBankAccount';
import useBankAccountStore from '../../../_store/useBankAccountStore';
import BankAccountForm from './bank-account-form';

const BankAccountDialog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('bankAccountPage.dialog');
  const { errors, handleAddBankAccount, handleUpdateBankAccount, handleFormChange } = useBankAccount();
  const { formData, isOpen, openDialog, closeDialog, isAddNew } = useBankAccountStore();

  // Memoize the close dialog handler
  const handleCloseDialog = useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  // Handle URL params only once on mount
  useEffect(() => {
    const type = searchParams.get('type');

    if (type === INIT_PAGE_TYPE.ADD_BANK) {
      openDialog(true);
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.delete('type');
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    }
  }, []); // Empty dependency array - only run once on mount

  // Memoize the submit handler
  const handleSubmit = useCallback(async () => {
    await (isAddNew ? handleAddBankAccount(handleCloseDialog) : handleUpdateBankAccount(handleCloseDialog));
  }, [isAddNew, handleAddBankAccount, handleUpdateBankAccount, handleCloseDialog]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="font-semibold text-[24px]">
            {isAddNew ? t('addNewTitle') : t('updateTitle')}
          </DialogTitle>
          <DialogDescription>{isAddNew ? t('addNewDescription') : t('updateDescription')}</DialogDescription>
        </DialogHeader>
        <BankAccountForm
          formData={formData}
          errors={errors}
          handleFormChange={handleFormChange}
          submitFunc={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BankAccountDialog;
