import type { TBankAccountSchema } from '@oe/api/schemas/bankAccountSchema';
import { create } from 'zustand';

interface BankAccountState {
  // UI State
  dialog: {
    isOpen: boolean;
    isAddNew: boolean;
  };
  // Form State
  form: {
    data: TBankAccountSchema;
  };
}

interface BankAccountActions {
  // Dialog Actions
  openDialog: (isAddNew: boolean) => void;
  closeDialog: () => void;
  // Form Actions
  setFormData: (data: TBankAccountSchema) => void;
  resetForm: () => void;
}

type BankAccountStore = BankAccountState & {
  actions: BankAccountActions;
};

const initialFormData: TBankAccountSchema = {
  bank_name: '',
  account_name: '',
  account_number: '',
};

const useBankAccountStore = create<BankAccountStore>(set => ({
  // Initial State
  dialog: {
    isOpen: false,
    isAddNew: false,
  },
  form: {
    data: initialFormData,
  },

  // Actions
  actions: {
    openDialog: (isAddNew: boolean) =>
      set(state => ({
        dialog: {
          ...state.dialog,
          isOpen: true,
          isAddNew,
        },
      })),

    closeDialog: () =>
      set(state => ({
        dialog: {
          ...state.dialog,
          isOpen: false,
        },
      })),

    setFormData: (data: TBankAccountSchema) =>
      set(state => ({
        form: {
          ...state.form,
          data,
        },
      })),

    resetForm: () =>
      set(state => ({
        form: {
          ...state.form,
          data: initialFormData,
        },
      })),
  },
}));

// Selector hooks for better performance
export const useDialogState = () => useBankAccountStore(state => state.dialog);
export const useFormData = () => useBankAccountStore(state => state.form.data);
export const useBankAccountActions = () => useBankAccountStore(state => state.actions);

// Export the store as default for direct access when needed
export default useBankAccountStore;
