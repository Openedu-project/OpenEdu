import { TChain } from "@oe/api/utils/wallet";
import { create } from "zustand";

type ChainAddress = {
    address: string;
};

interface ChainState {
    chosenChain: { chain: TChain; address: string } | null;
    setChosenChain: (chain: TChain, data: ChainAddress) => void;
}

export const useDepositChainStore = create<ChainState>((set) => ({
    chosenChain: null,
    setChosenChain: (chain, data) =>
        set({ chosenChain: { chain, address: data.address } })
}));