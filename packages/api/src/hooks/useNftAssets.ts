import useWalletBase from '@oe/api/hooks/useWalletBase';
import { fetchNearNFTs } from '@oe/api/services/near';
import { CURRENCY_SYMBOLS } from '@oe/api/utils/wallet';
import { useMemo } from 'react';
import useSWR from 'swr';

const useNFTAssets = () => {
  const { wallets, isLoading: isLoadingWallets } = useWalletBase({
    isRefresh: false,
  });

  const nearAddress = useMemo(
    () => wallets.find(wallet => wallet.currency === CURRENCY_SYMBOLS.NEAR)?.address || null,
    [wallets]
  );

  const {
    data: nftData,
    error,
    isValidating,
    mutate,
  } = useSWR(nearAddress ? ['nftAssets', nearAddress] : null, ([, address]) => fetchNearNFTs(address), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    nftAssets: nftData || null,
    error,
    isLoading: isLoadingWallets || !(error || nftData),
    isValidating,
    refetch: mutate,
  };
};

export default useNFTAssets;
