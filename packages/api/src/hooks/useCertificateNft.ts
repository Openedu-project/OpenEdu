import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getCertNFTFeesService, getEstimatedFeeService, postMintCertNFTService } from '#services/certificate-nft';
import type { IMintCertNftRequest } from '#types/certificate-nft';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetCertNFTFees(id?: string) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.CERTIFICATES_ID_NFT_FEES,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (url: string) =>
    getCertNFTFeesService(url, { id })
  );

  return {
    dataCertNftFees: data,
    isLoadingCertNftFees: isLoading,
    errorCertNftFees: error,
    mutateCertNftFees: mutate,
  };
}

export function useMintCertNft(id: string) {
  const endpointKey = buildUrl({
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

export function useGetEstimatedFee(id: string) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.COURSES_ID_NFT_FEES,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (url: string) =>
    getEstimatedFeeService(url, { id })
  );

  return {
    dataEstimatedFee: data,
    isLoadingEstimatedFee: isLoading,
    errorEstimatedFee: error,
    mutateEstimatedFee: mutate,
  };
}
