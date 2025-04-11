// TODO: Optimize
import { DEFAULT_CURRENCY, buildUrl, formatCurrency } from '@oe/core';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useExchangeRates } from '#hooks/useExchangeRates';
import { getAvailBalance } from '#services/avail';
import { fetchNearNFTs, getNearTokens } from '#services/near';
import { getBankAccountsService, getWalletRequestWithdraw } from '#services/wallet';
import type { HTTPPagination, HTTPResponse } from '#types/fetch';
import type { IBankAccount, IWallet, TRequestWithdrawHistory, TTokenBalances } from '#types/wallet';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';
import {
  ASSET_TYPES,
  CHAIN,
  CRYPTO_CURRENCIES,
  SUPPORTED_EXCHANGE_RATES,
  SWR_WALLET_KEY,
  currencyConverter,
} from '#utils/wallet';

const useNearTokens = (address: string | null) => {
  const { data: nearTokensData } = useSWR(address ? SWR_WALLET_KEY.NEAR_TOKENS(address) : null, () =>
    getNearTokens(address || '')
  );

  return {
    nearTokens: nearTokensData,
    isLoading: address && !nearTokensData,
  };
};

const useAvailBalance = (address: string | null) => {
  const { data: availBalance } = useSWR(
    address ? SWR_WALLET_KEY.AVAIL_BALANCE(address) : null,
    () => getAvailBalance(address || '')
    // SWR_CONFIG.fast
  );

  return {
    availBalance: availBalance ? Number(availBalance) : 0,
    isLoading: address && !availBalance,
  };
};

export const useWallet = () => {
  // const config = isRefresh !== false ? SWR_CONFIG.fast : SWR_CONFIG.noRefresh;
  const {
    data: walletsData,
    isLoading,
    mutate,
  } = useSWR<HTTPResponse<IWallet[]>>(API_ENDPOINT.USERS_ME_WALLETS, (endpoint: string) => fetchAPI(endpoint), {
    // revalidateIfStale: true,
    revalidateOnFocus: true,
    // revalidateOnMount: true,
    // refreshInterval: 60_000,
  });

  // Memoize empty array để tránh tạo reference mới
  // const emptyArray = useMemo(() => [], []);
  // const wallets = walletsData || emptyArray;

  return {
    wallets: walletsData?.data,
    walletsLoading: isLoading,
    mutateWallets: mutate,
  };
};

export const useEstimatedTotalValue = (currency?: string) => {
  const { wallets } = useWallet();
  const { exchangeRates } = useExchangeRates();

  const calculateTotalValue = useMemo(() => {
    if (!(wallets && exchangeRates)) {
      return Object.keys(currencyConverter).reduce(
        (acc, currency) => {
          acc[currency] = 0;
          return acc;
        },
        {} as Record<string, number>
      );
    }

    const totalUSD = wallets.reduce((sum, wallet) => {
      const balance = Number(wallet.balance);
      const currency = wallet.currency;

      if (!(currency in SUPPORTED_EXCHANGE_RATES)) {
        return sum;
      }

      if (currency === DEFAULT_CURRENCY) {
        return sum + balance;
      }
      const rate = exchangeRates[`${currency}_${DEFAULT_CURRENCY}`];
      return sum + (rate ? balance * rate : 0);
    }, 0);

    return Object.entries(currencyConverter).reduce(
      (acc, [currency, converter]) => {
        acc[currency] = converter.fromUSD(totalUSD, exchangeRates);
        return acc;
      },
      {} as Record<string, number>
    );
  }, [wallets, exchangeRates]);

  const displayCurrency = currency ?? DEFAULT_CURRENCY;
  const finalCurrency = currencyConverter[displayCurrency] ? displayCurrency : DEFAULT_CURRENCY;

  if (!calculateTotalValue[finalCurrency]) {
    return formatCurrency(0, { currency: finalCurrency });
  }
  return formatCurrency(calculateTotalValue[finalCurrency], {
    currency: finalCurrency,
  });
};

export const useTotalEarnings = (currency: string = DEFAULT_CURRENCY) => {
  const { wallets } = useWallet();
  const { exchangeRates } = useExchangeRates();

  const calculateEarnings = useMemo(() => {
    if (!(wallets && exchangeRates)) {
      return Object.keys(currencyConverter).reduce(
        (acc, currency) => {
          acc[currency] = 0;
          return acc;
        },
        {} as Record<string, number>
      );
    }

    const totalUSD = wallets.reduce((sum, wallet) => {
      const earningBalance = Number(wallet.earning_balance || 0);
      const currency = wallet.currency;

      if (!(currency in SUPPORTED_EXCHANGE_RATES)) {
        return sum;
      }

      if (currency === DEFAULT_CURRENCY) {
        return sum + earningBalance;
      }
      const rate = exchangeRates[`${currency}_${DEFAULT_CURRENCY}`];
      return sum + (rate ? earningBalance * rate : 0);
    }, 0);

    return Object.entries(currencyConverter).reduce(
      (acc, [currency, converter]) => {
        acc[currency] = converter.fromUSD(totalUSD, exchangeRates);
        return acc;
      },
      {} as Record<string, number>
    );
  }, [wallets, exchangeRates]);

  const displayCurrency = currency ?? DEFAULT_CURRENCY;
  const finalCurrency = currencyConverter[displayCurrency] ? displayCurrency : DEFAULT_CURRENCY;

  if (!calculateEarnings[finalCurrency]) {
    return formatCurrency(0, { currency: finalCurrency });
  }
  return formatCurrency(calculateEarnings[finalCurrency], {
    currency: finalCurrency,
  });
};

export const useNFTTotalAssets = () => {
  const { wallets, walletsLoading } = useWallet();

  const nearWallet = useMemo(
    () => wallets?.find(w => w.type === ASSET_TYPES.CRYPTO && w.network === CHAIN.NEAR),
    [wallets]
  );

  const availWallet = useMemo(
    () => wallets?.find(w => w.type === ASSET_TYPES.CRYPTO && w.network === CHAIN.AVAIL),
    [wallets]
  );

  const { nearTokens, isLoading: isNearLoading } = useNearTokens(nearWallet?.address || null);
  const { availBalance, isLoading: isAvailLoading } = useAvailBalance(availWallet?.address || null);

  const tokenBalances = useMemo(() => {
    if (!nearTokens) {
      return null;
    }

    return {
      ...nearTokens,
      tokens: {
        ...nearTokens.tokens,
        AVAIL: {
          balance: availBalance,
        },
      },
    } as TTokenBalances;
  }, [nearTokens, availBalance]);

  const nftData = useMemo(() => {
    if (!(wallets && tokenBalances)) {
      return null;
    }
    const supply = tokenBalances.totalNFTSupply || 0;
    return { supply };
  }, [wallets, tokenBalances]);

  return {
    nftData,
    tokenBalances: tokenBalances,
    isLoading: walletsLoading || isNearLoading || isAvailLoading,
  };
};

export function useGetBankAccounts(params?: Record<string, unknown>) {
  const url = createAPIUrl({ endpoint: API_ENDPOINT.USER_SETTINGS, queryParams: params });

  const { data, isLoading, error, mutate } = useSWR<HTTPPagination<IBankAccount>>(url, getBankAccountsService);

  return {
    bankAccounts: data,
    isLoadingBankAccounts: isLoading,
    errorBankAccounts: error,
    mutateBankAccounts: mutate,
  };
}

export const useNearNFTAssets = () => {
  const { wallets } = useWallet();

  const nearAddress = useMemo(
    () => wallets?.find(wallet => wallet.currency === CRYPTO_CURRENCIES.NEAR.value)?.address || null,
    [wallets]
  );

  const {
    data: nftAssets,
    error,
    isLoading: isNearLoading,
    mutate,
  } = useSWR(nearAddress ? ['nftAssets', nearAddress] : null, ([, address]) => fetchNearNFTs(address));

  return {
    nftAssets,
    nftAssetsError: error,
    isNFTAssetsLoading: isNearLoading || !(error || nftAssets),
    mutateNFTAssets: mutate,
  };
};

export const useWalletRequestWithdraw = (params?: Record<string, unknown>) => {
  const apiUrl = buildUrl({ endpoint: API_ENDPOINT.USERS_ME_APPROVALS, queryParams: params });

  const { data, error, isLoading, mutate } = useSWR<HTTPPagination<TRequestWithdrawHistory>>(
    apiUrl,
    getWalletRequestWithdraw
  );

  return {
    requestWithdrawHistory: data,
    isLoadingRequestWithdrawHistory: isLoading,
    errorRequestWithdrawHistory: error,
    mutateRequestWithdrawHistory: mutate,
  };
};
