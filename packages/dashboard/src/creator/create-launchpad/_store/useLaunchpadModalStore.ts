import { createStore } from '@oe/core';

interface ModalState {
  modals: Record<string, boolean>;
  setOpenModal: (id: string, isOpen: boolean) => void;
}

export const useLaunchpadModalStore = createStore<ModalState>(set => {
  return {
    modals: {},
    setOpenModal: (id: string, isOpen: boolean) =>
      set(state => {
        return {
          modals: {
            ...state.modals,
            [id]: isOpen,
          },
        };
      }),
  };
});
