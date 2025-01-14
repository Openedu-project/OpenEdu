import { useCallback } from 'react';
import useSWR from 'swr';
import { CHAIN, SWR_WALLET_KEY } from '#utils/wallet';
import useWalletBase from './useWalletBase';

const useWalletRefresh = () => {
  const { wallets } = useWalletBase();

  // Find wallet addresses
  const nearAddress = wallets.find(w => w.network === CHAIN.NEAR)?.address;
  const availAddress = wallets.find(w => w.network === CHAIN.AVAIL)?.address;

  // Get mutate functions with correct keys
  const { mutate: mutateWallets } = useSWR(SWR_WALLET_KEY.WALLETS);
  const { mutate: mutateRates } = useSWR(SWR_WALLET_KEY.EXCHANGE_RATES);
  const { mutate: mutateNearTokens } = useSWR(nearAddress ? SWR_WALLET_KEY.NEAR_TOKENS(nearAddress) : null);
  const { mutate: mutateAvailBalance } = useSWR(availAddress ? SWR_WALLET_KEY.AVAIL_BALANCE(availAddress) : null);

  return useCallback(async () => {
    const refreshPromises = [mutateWallets(), mutateRates()];

    // Only refresh tokens if we have addresses
    if (nearAddress) {
      refreshPromises.push(mutateNearTokens());
    }
    if (availAddress) {
      refreshPromises.push(mutateAvailBalance());
    }

    await Promise.all(refreshPromises);
  }, [mutateWallets, mutateRates, mutateNearTokens, mutateAvailBalance, nearAddress, availAddress]);
};

export default useWalletRefresh;
