import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getCertNFTFeesService, postMintCertNFTService } from '#services/certificate-nft';
import type { IMintCertNftRequest } from '#types/certificate-nft';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetCertNFTFees(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.CERTIFICATES_ID_NFT_FEES,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) => getCertNFTFeesService(url, { id }));

  return {
    dataCertNftFees: data,
    isLoadingCertNftFees: isLoading,
    errorCertNftFees: error,
    mutateCertNftFees: mutate,
  };
}

export function useMintCertNft(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.CERTIFICATES_ID_NFT,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (url: string, { arg }: { arg: IMintCertNftRequest }) => postMintCertNFTService(url, { payload: arg, id })
  );

  return {
    triggerMintCertNft: trigger,
    isLoadingMintCertNft: isMutating,
    errorMintCertNft: error,
  };
}
