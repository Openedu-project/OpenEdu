import { useMemo } from 'react';
import useSWR from 'swr';
import type { TWallet } from '#types/wallet';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';
import { SWR_CONFIG, SWR_WALLET_KEY } from '#utils/wallet';

const useWalletBase = ({ isRefresh = true }: { isRefresh?: boolean } = {}) => {
  const config = isRefresh !== false ? SWR_CONFIG.fast : SWR_CONFIG.noRefresh;
  const { data: walletsData } = useSWR<TWallet[]>(
    SWR_WALLET_KEY.WALLETS,
    async () => {
      const response = await fetchAPI(API_ENDPOINT.USERS_ME_WALLETS);
      return response.data as TWallet[];
    },
    config
  );

  // Memoize empty array để tránh tạo reference mới
  const emptyArray = useMemo(() => [], []);
  const wallets = walletsData || emptyArray;

  return {
    wallets,
    isLoading: !walletsData,
  };
};

export default useWalletBase;
