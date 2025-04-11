import { createStore } from '@oe/core';

interface TargetAmountStore {
  targetAmount: number;
  setTargetAmount: (targetAmount: number) => void;
}

const useTargetAmountStore = createStore<TargetAmountStore>(set => {
  return {
    targetAmount: 0,
    setTargetAmount: (targetAmount: number) => set({ targetAmount }),
  };
});

export { useTargetAmountStore };
