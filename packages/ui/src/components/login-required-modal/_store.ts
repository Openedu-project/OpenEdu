import { createStore } from '@oe/core';

type LoginRequiredStore = {
  isOpen: boolean;
  hasCancel: boolean;
  setLoginRequiredModal: (isOpen: boolean, hasCancel?: boolean) => void;
};

export const useLoginRequiredStore = createStore<LoginRequiredStore>(set => {
  return {
    isOpen: false,
    hasCancel: true,
    setLoginRequiredModal: (isOpen: boolean, hasCancel = true) => set({ isOpen, hasCancel }),
  };
});
