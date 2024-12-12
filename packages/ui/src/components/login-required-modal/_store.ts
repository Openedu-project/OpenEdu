import { create } from 'zustand';

type LoginRequiredStore = {
  isOpen: boolean;
  hasCancel: boolean;
  setLoginRequiredModal: (isOpen: boolean, hasCancel?: boolean) => void;
};

export const useLoginRequiredStore = create<LoginRequiredStore>(set => {
  return {
    isOpen: false,
    hasCancel: true,
    setLoginRequiredModal: (isOpen: boolean, hasCancel = true) => set({ isOpen, hasCancel }),
  };
});
