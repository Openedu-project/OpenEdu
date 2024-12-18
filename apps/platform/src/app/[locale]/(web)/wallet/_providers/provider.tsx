'use client';

import { type ReactNode, useEffect } from 'react';

import useWallet from '@oe/api/hooks/useWallet';
import { CHAIN } from '@oe/api/utils/wallet';
import { useWalletDataStore } from '../_store/useWalletDataStore';
import { useWalletVisibilityStore } from '../_store/useWalletVisibilityStore';

export function WalletProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useWallet();

  const {
    setAssetList,
    setTotalAssetValue,
    setTotalEarningBalance,
    setExchangeRate,
    setIntegratedChainData,
    setTotalNFTSupply,
  } = useWalletDataStore();

  const { setIsLoading } = useWalletVisibilityStore();

  // Handle loading state
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  // Update stores with processed data
  useEffect(() => {
    if (!data) {
      return;
    }

    const { assetList, totalEarning, totalAssetValue, tokenBalances, exchangeRates, integratedChains } = data;

    setAssetList(assetList);
    setTotalEarningBalance(totalEarning);
    setTotalAssetValue(totalAssetValue);
    setTotalNFTSupply(tokenBalances.totalNFTSupply);
    setExchangeRate(exchangeRates);

    // Update integrated chains data
    for (const wallet of integratedChains) {
      if (wallet.network === CHAIN.NEAR || wallet.network === CHAIN.AVAIL) {
        setIntegratedChainData(wallet.network, { address: wallet.address });
      }
    }
  }, [
    data,
    setAssetList,
    setTotalEarningBalance,
    setTotalAssetValue,
    setTotalNFTSupply,
    setExchangeRate,
    setIntegratedChainData,
  ]);

  return children;
}
