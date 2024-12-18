import type { TBankAccounts } from '@oe/api/types/wallet';
import { create } from 'zustand';

interface BankAccountDialogState {
  isOpen: boolean;
  isAddNew: boolean;
  formData: TBankAccounts;
  setFormData: (formData: TBankAccounts) => void;
  openDialog: (isAddNew: boolean) => void;
  closeDialog: () => void;
}

const useBankAccountStore = create<BankAccountDialogState>(set => {
  return {
    isOpen: false,
    isAddNew: false,
    formData: {
      bank_name: '',
      account_name: '',
      account_number: '',
    },
    setFormData: (formData: TBankAccounts) => set({ formData }),
    openDialog: (isAddNew: boolean) => set({ isOpen: true, isAddNew }),
    closeDialog: () => set({ isOpen: false, isAddNew: false }),
  };
});

export default useBankAccountStore;
