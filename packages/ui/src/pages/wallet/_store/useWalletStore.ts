import { type TWithdrawType, WITHDRAW_TYPE } from '@oe/api';
import { createStore } from '@oe/core';

interface WalletState {
  selectedCurrency?: string;
  isHiddenZeroAmount: boolean;
  withdrawType: TWithdrawType;
  setSelectedCurrency: (currency: string) => void;
  setIsHiddenZeroAmount: (hidden: boolean) => void;
  setWithdrawType: (type: TWithdrawType) => void;
}

export const useWalletStore = createStore<WalletState>(set => ({
  selectedCurrency: undefined,
  isHiddenZeroAmount: false,
  withdrawType: WITHDRAW_TYPE.TOKEN,
  setSelectedCurrency: currency => set({ selectedCurrency: currency }),
  setIsHiddenZeroAmount: hidden => set({ isHiddenZeroAmount: hidden }),
  setWithdrawType: type => set({ withdrawType: type }),
}));
