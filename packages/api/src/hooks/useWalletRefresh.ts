import { useCallback } from 'react';
import useSWR from 'swr';
import { SWR_WALLET_KEY } from '#utils/wallet';

const useWalletRefresh = () => {
  const { mutate: mutateWallets } = useSWR(SWR_WALLET_KEY.WALLETS);
  const { mutate: mutateRates } = useSWR(SWR_WALLET_KEY.EXCHANGE_RATES);
  const { mutate: mutateNearTokens } = useSWR(SWR_WALLET_KEY.NEAR_TOKENS());
  const { mutate: mutateAvailBalance } = useSWR(SWR_WALLET_KEY.AVAIL_BALANCE());

  return useCallback(async () => {
    await Promise.all([mutateWallets(), mutateRates(), mutateNearTokens(), mutateAvailBalance()]);
  }, [mutateWallets, mutateRates, mutateNearTokens, mutateAvailBalance]);
};

export default useWalletRefresh;
