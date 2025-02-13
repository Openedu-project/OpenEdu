import { create } from 'zustand';

interface TargetAmountStore {
  targetAmount: number;
  setTargetAmount: (targetAmount: number) => void;
}

const useTargetAmountStore = create<TargetAmountStore>(set => {
  return {
    targetAmount: 0,
    setTargetAmount: (targetAmount: number) => set({ targetAmount }),
  };
});

export default useTargetAmountStore;
