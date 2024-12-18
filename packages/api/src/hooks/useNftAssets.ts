import { fetchNearNFTs } from '@oe/api/services/near';
import type { TNFTData } from '@oe/api/types/wallet';
import useSWR from 'swr';

const useNFTAssets = ({ nearAddress }: { nearAddress: string }) => {
  const { data, error, isValidating, mutate } = useSWR<TNFTData, Error>(
    nearAddress ? ['nftAssets', nearAddress] : null,
    ([, address]) => fetchNearNFTs(address as string),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    nftAssets: data || null,
    error,
    isLoading: !(error || data),
    isValidating,
    refetch: mutate,
  };
};

export default useNFTAssets;
