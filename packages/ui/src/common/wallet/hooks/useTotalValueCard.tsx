import useWalletBase from "@oe/api/hooks/useWalletBase";
import useExchangeRates from "@oe/api/hooks/useExchangeRates";

import { useMemo } from "react";
import {
  calculateFiatAssets,
  calculateStablecoinAssets,
  calculateTotalAssetValue,
} from "@oe/api/utils/wallet-calculations";
import { useTokenBalances } from "./useTokenBalances";

export const useTotalValueCard = () => {
  const { wallets, isLoading: isWalletsLoading } = useWalletBase();
  const { exchangeRates, isLoading: isRatesLoading } = useExchangeRates();
  const { tokenBalances, isLoading: isTokensLoading } = useTokenBalances();

  const totalValue = useMemo(() => {
    if (!wallets || !exchangeRates || !tokenBalances) return null;

    const fiatAssets = calculateFiatAssets(wallets, exchangeRates);
    const stablecoins = calculateStablecoinAssets(
      wallets,
      tokenBalances,
      exchangeRates
    );
    const allAssets = [...fiatAssets, ...stablecoins];

    const value = calculateTotalAssetValue(allAssets);

    return value;
  }, [wallets, exchangeRates, tokenBalances]);

  return {
    totalValue,
    isLoading: isWalletsLoading || isRatesLoading || isTokensLoading,
  };
};
