import useWalletBase from "@oe/api/hooks/useWalletBase";
import { useTokenBalances } from "./useTokenBalances";
import { useMemo } from "react";

export const useNFTCard = () => {
  const { wallets, isLoading: isWalletsLoading } = useWalletBase();
  const { tokenBalances, isLoading: isTokensLoading } = useTokenBalances();

  const nftData = useMemo(() => {
    if (!wallets || !tokenBalances) return null;
    const supply = tokenBalances.totalNFTSupply || 0;
    return { supply };
  }, [wallets, tokenBalances]);

  return {
    nftData,
    isLoading: isWalletsLoading || isTokensLoading,
  };
};
