import { useMemo } from 'react';
import useSWR from 'swr';

import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { fetchAPI } from '@oe/api/utils/fetch';
import { getAvailBalance } from '#services/avail';
import { getNearTokens } from '#services/near';
import type { TAssetList, TBalanceValue, TExchangeRates, TTokenBalances, TWallet } from '#types/wallet';
import { ASSET_TYPES, CHAIN, SWR_CONFIG, SWR_WALLET_KEY } from '#utils/wallet';
import { calculateAssetList, calculateTotals } from '#utils/wallet-calculations';

interface ProcessedWalletData {
  assetList: TAssetList[];
  totalEarning: TBalanceValue;
  totalAssetValue: TBalanceValue;
  tokenBalances: TTokenBalances;
  exchangeRates: TExchangeRates;
  integratedChains: TWallet[];
}

const useWallet = () => {
  // Fetch wallets data
  const { data: walletsData } = useSWR<TWallet[]>(
    SWR_WALLET_KEY.WALLETS,
    async () => {
      const response = await fetchAPI(API_ENDPOINT.USERS_ME_WALLETS);
      return response.data as TWallet[];
    },
    SWR_CONFIG.fast
  );

  // Fetch exchange rates
  const { data: exchangeRatesData } = useSWR<TExchangeRates>(
    SWR_WALLET_KEY.EXCHANGE_RATES,
    async () => {
      const response = await fetchAPI(API_ENDPOINT.EXCHANGE_RATES);
      return response.data as TExchangeRates;
    },
    SWR_CONFIG.slow
  );

  const wallets = walletsData || [];

  // Find specific wallets
  const { nearWallet, availWallet } = useMemo(() => {
    return {
      nearWallet: wallets.find(wallet => wallet.type === ASSET_TYPES.CRYPTO && wallet.network === CHAIN.NEAR),
      availWallet: wallets.find(wallet => wallet.type === ASSET_TYPES.CRYPTO && wallet.network === CHAIN.AVAIL),
    };
  }, [wallets]);

  // Fetch NEAR tokens
  const { data: nearTokensData } = useSWR<TTokenBalances | null>(
    nearWallet?.address ? SWR_WALLET_KEY.NEAR_TOKENS(nearWallet.address) : null,
    async () => {
      const nearTokenBalances = await getNearTokens(nearWallet?.address || '');
      return nearTokenBalances as TTokenBalances;
    },
    SWR_CONFIG.fast
  );

  // Fetch AVAIL balance
  const { data: availBalance } = useSWR(
    SWR_WALLET_KEY.AVAIL_BALANCE(availWallet?.address),
    () => getAvailBalance(availWallet?.address || ''),
    SWR_CONFIG.fast
  );

  // Combine token balances
  const tokenBalances = useMemo(() => {
    if (!nearTokensData) {
      return null;
    }

    return {
      ...nearTokensData,
      tokens: {
        ...nearTokensData.tokens,
        AVAIL: {
          balance: Number(availBalance) || 0,
        },
      },
    };
  }, [nearTokensData, availBalance]);

  // Process all data
  const processedData = useMemo((): ProcessedWalletData | null => {
    if (!(walletsData && tokenBalances && exchangeRatesData)) {
      return null;
    }

    const assetList = calculateAssetList(walletsData, tokenBalances, exchangeRatesData);
    const [totalEarning, totalAssetValue] = calculateTotals(assetList);

    return {
      assetList,
      totalEarning,
      totalAssetValue,
      tokenBalances,
      exchangeRates: exchangeRatesData,
      integratedChains: walletsData.filter(w => w.type === ASSET_TYPES.CRYPTO),
    };
  }, [walletsData, tokenBalances, exchangeRatesData]);

  return {
    isLoading: !processedData,
    data: processedData,
  };
};

export default useWallet;
