import useWalletBase from "@oe/api/hooks/useWalletBase";
import useExchangeRates from "@oe/api/hooks/useExchangeRates";

import { useMemo } from "react";
import {
  calculateAvailAsset,
  calculateFiatAssets,
  calculateNearAsset,
  calculateStablecoinAssets,
} from "@oe/api/utils/wallet-calculations";
import { useTokenBalances } from "./useTokenBalances";
import { ASSET_TYPES, CHAIN } from "@oe/api/utils/wallet";
import useNearTokens from "@oe/api/hooks/useNearTokens";
import useAvailBalance from "@oe/api/hooks/useAvailBalance";

// export const useAssetList = () => {
//   const { wallets, isLoading: isWalletsLoading } = useWalletBase();
//   const { exchangeRates, isLoading: isRatesLoading } = useExchangeRates();
//   const { tokenBalances, isLoading: isTokensLoading } = useTokenBalances();

//   const assetList = useMemo(() => {
//     if (!wallets || !exchangeRates || !tokenBalances) return null;

//     const fiatAssets = calculateFiatAssets(wallets, exchangeRates);
//     const stablecoins = calculateStablecoinAssets(
//       wallets,
//       tokenBalances,
//       exchangeRates
//     );
//     const allAssets = [...fiatAssets, ...stablecoins];

//     return allAssets.sort((a, b) => {
//       if (fiatAssets.includes(a) && !fiatAssets.includes(b)) return -1;
//       if (!fiatAssets.includes(a) && fiatAssets.includes(b)) return 1;
//       return (b.value || 0) - (a.value || 0);
//     });
//   }, [wallets, exchangeRates, tokenBalances]);

//   return {
//     assetList,
//     isLoading: isWalletsLoading || isRatesLoading || isTokensLoading,
//   };
// };

export const useAssetList = () => {
  // Basic wallets & rates
  const { wallets, isLoading: isWalletsLoading } = useWalletBase();
  const { exchangeRates, isLoading: isRatesLoading } = useExchangeRates();

  // Find wallets first
  const nearWallet = useMemo(
    () =>
      wallets.find(
        (w) => w.type === ASSET_TYPES.CRYPTO && w.network === CHAIN.NEAR
      ),
    [wallets]
  );

  const availWallet = useMemo(
    () =>
      wallets.find(
        (w) => w.type === ASSET_TYPES.CRYPTO && w.network === CHAIN.AVAIL
      ),
    [wallets]
  );

  // Near ecosystem (NEAR + Stablecoins)
  const { nearTokens, isLoading: isNearLoading } = useNearTokens(
    nearWallet?.address || null
  );

  // Avail riêng biệt
  const { availBalance, isLoading: isAvailLoading } = useAvailBalance(
    availWallet?.address || null
  );

  // 1. Fiat assets (load first)
  const fiatAssets = useMemo(() => {
    if (!wallets || !exchangeRates) return null;
    return calculateFiatAssets(wallets, exchangeRates);
  }, [wallets, exchangeRates]);

  // 2. Near ecosystem assets (NEAR + USDT + USDC)
  const nearEcosystemAssets = useMemo(() => {
    if (!wallets || !exchangeRates || !nearTokens) return null;

    const nearWallet = wallets.find((w) => w.network === CHAIN.NEAR);
    const nearAsset = calculateNearAsset(
      nearWallet,
      nearTokens.near.balance || 0,
      exchangeRates
    );

    const stablecoins = calculateStablecoinAssets(
      wallets,
      nearTokens,
      exchangeRates
    );

    return [nearAsset, ...stablecoins].sort(
      (a, b) => (b.value || 0) - (a.value || 0)
    );
  }, [wallets, exchangeRates, nearTokens]);

  // 3. Avail assets (separate)
  const availAsset = useMemo(() => {
    if (!wallets || !exchangeRates || availBalance === null) return null;

    const availWallet = wallets.find((w) => w.network === CHAIN.AVAIL);
    if (!availWallet) return null;

    return calculateAvailAsset(availWallet, availBalance, exchangeRates);
  }, [wallets, exchangeRates, availBalance]);

  return {
    fiatAssets,
    nearEcosystemAssets,
    availAsset,
    isLoadingFiat: isWalletsLoading || isRatesLoading,
    isLoadingNear: isNearLoading,
    isLoadingAvail: isAvailLoading,
  };
};
