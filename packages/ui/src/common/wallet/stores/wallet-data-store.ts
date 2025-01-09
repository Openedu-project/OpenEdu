import type { TAssetList, TExchangeRates } from '@oe/api/types/wallet';
import type { TChain } from '@oe/api/utils/wallet';
import { create } from 'zustand';

type BalanceValue = {
    vnd: number;
    usd: number;
};

type ChainAddress = {
    address: string;
};

export interface WalletState {
    integratedChainData: Record<string, ChainAddress> | null;
    assetList: TAssetList[] | null;
    exchangeRates: TExchangeRates | null;
    totalAssetValue: BalanceValue | null;
    totalEarningBalance: BalanceValue | null;
    totalNFTSupply: number;
    chosenChain: { chain: TChain; address: string } | null;
}

export interface WalletActions {
    setIntegratedChainData: (chain: TChain, data: ChainAddress) => void;
    setAssetList: (assets: TAssetList[]) => void;
    setExchangeRate: (rate: TExchangeRates) => void;
    setTotalAssetValue: (value: BalanceValue) => void;
    setTotalEarningBalance: (value: BalanceValue) => void;
    setTotalNFTSupply: (supply: number) => void;
    setChosenChain: (chain: TChain, data: ChainAddress) => void;
}

const initialState: WalletState = {
    integratedChainData: null,
    assetList: null,
    exchangeRates: null,
    totalAssetValue: null,
    totalEarningBalance: null,
    totalNFTSupply: 0,
    chosenChain: null,
};

export const useWalletDataStore = create<WalletState & WalletActions>()(set => ({
    ...initialState,

    setIntegratedChainData: (chain, data) =>
        set(state => ({
            integratedChainData: {
                ...state.integratedChainData,
                [chain]: data,
            },
        })),

    setAssetList: assets => set({ assetList: assets }),
    setExchangeRate: rate => set({ exchangeRates: rate }),
    setTotalAssetValue: value => set({ totalAssetValue: value }),
    setTotalEarningBalance: value => set({ totalEarningBalance: value }),
    setTotalNFTSupply: supply => set({ totalNFTSupply: supply }),
    setChosenChain: (chain, data) => set({ chosenChain: { chain, address: data.address } }),
}));

// Selectors
export const assetList = (state: WalletState) => state.assetList;
export const exchangeRates = (state: WalletState) => state.exchangeRates;
export const totalAssetValue = (state: WalletState) => state.totalAssetValue;
export const totalEarningBalance = (state: WalletState) => state.totalEarningBalance;
export const totalNFTSupply = (state: WalletState) => state.totalNFTSupply;
export const chosenChain = (state: WalletState) => state.chosenChain;
export const integratedChainData = (state: WalletState) => state.integratedChainData;

// Derived selectors
export const assetsByType = (type: string) => (state: WalletState) =>
    state.assetList?.filter(asset => asset.type === type) ?? [];

export const chainAddress = (chain: TChain) => (state: WalletState) => state.integratedChainData?.[chain]?.address;

export const totalBalance = (state: WalletState) => ({
    vnd: state.totalAssetValue?.vnd ?? 0,
    usd: state.totalAssetValue?.usd ?? 0,
});

export const isChainIntegrated = (chain: TChain) => (state: WalletState) => Boolean(state.integratedChainData?.[chain]);

// Usage example:
// const assetList = useWalletDataStore(assetList);
// const cryptoAssets = useWalletDataStore(assetsByType('crypto'));
// const isNearIntegrated = useWalletDataStore(isChainIntegrated(CHAIN.NEAR));
