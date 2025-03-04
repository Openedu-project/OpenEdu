import type { ICertNftFees, IMintCertNftRequest } from '#types/certificate-nft';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';

export async function getCertNFTFeesService(
  url: string | undefined | null,
  { id, init }: { id?: string; init?: RequestInit }
): Promise<ICertNftFees | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.CERTIFICATES_ID_NFT_FEES,
      params: { id },
    });
  }

  try {
    const response = await fetchAPI<ICertNftFees>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function postMintCertNFTService(
  url: string | null | undefined,
  { payload, id, init }: { payload: IMintCertNftRequest; id: string; init?: RequestInit }
) {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.CERTIFICATES_ID_NFT_FEES,
      params: { id },
    });
  }

  const response = await postAPI<string, IMintCertNftRequest>(endpointKey, payload, init);

  return response.data;
}
