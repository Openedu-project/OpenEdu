import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletVisibilityState {
    isVisible: boolean;
    isHiddenZeroAmount: boolean;
    isVNDCurrency: boolean;
    isLoading: boolean;
}

interface WalletVisibilityActions {
    setIsVisible: (visible: boolean) => void;
    setIsHiddenZeroAmount: (hidden: boolean) => void;
    setIsVNDCurrency: (isVNDCurrency: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    toggle: () => void;
    reset: () => void;
}

const initialState: WalletVisibilityState = {
    isVisible: false,
    isHiddenZeroAmount: false,
    isVNDCurrency: false,
    isLoading: true,
};

export const useWalletVisibilityStore = create<WalletVisibilityState & WalletVisibilityActions>()(
    persist(
        set => ({
            ...initialState,

            setIsVisible: visible => set({ isVisible: visible }),
            setIsHiddenZeroAmount: hidden => set({ isHiddenZeroAmount: hidden }),
            setIsVNDCurrency: isVNDCurrency => set({ isVNDCurrency }),
            setIsLoading: loading => set({ isLoading: loading }),

            toggle: () => set(state => ({ isVisible: !state.isVisible })),
            reset: () => set(initialState),
        }),
        {
            name: 'assets-visibility',
            partialize: state => ({
                isVisible: state.isVisible,
                isHiddenZeroAmount: state.isHiddenZeroAmount,
                isVNDCurrency: state.isVNDCurrency,
            }),
        }
    )
);

// Selectors
export const isVisible = (state: WalletVisibilityState) => state.isVisible;
export const isHiddenZeroAmount = (state: WalletVisibilityState) => state.isHiddenZeroAmount;
export const isVNDCurrency = (state: WalletVisibilityState) => state.isVNDCurrency;
export const isLoading = (state: WalletVisibilityState) => state.isLoading;

export const visibilitySettings = (state: WalletVisibilityState) => ({
    isVisible: state.isVisible,
    isHiddenZeroAmount: state.isHiddenZeroAmount,
    isVNDCurrency: state.isVNDCurrency,
});

// Usage example:
/*
const MyComponent = () => {
  const visible = useWalletVisibilityStore(isVisible);
  const settings = useWalletVisibilityStore(visibilitySettings);
  const { toggle, reset } = useWalletVisibilityStore();
  
  // ...
}
*/
