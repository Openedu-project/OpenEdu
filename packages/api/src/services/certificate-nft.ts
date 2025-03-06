import type {
  ICertNftFees,
  IEstimatedFee,
  IMintCertNftRequest,
  ISponsorGasCourseRequest,
} from '#types/certificate-nft';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';

// Learner

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

// Creator

export async function getEstimatedFeeService(
  url: string | undefined | null,
  { id, init }: { id?: string; init?: RequestInit }
): Promise<IEstimatedFee | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_NFT_FEES,
      params: { id },
    });
  }

  try {
    const response = await fetchAPI<IEstimatedFee>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function postDepositSponsorGasService(
  url: string | null | undefined,
  { payload, id, init }: { payload: ISponsorGasCourseRequest; id: string; init?: RequestInit }
) {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_NFT_FEES_DEPOSIT,
      params: { id },
    });
  }

  const response = await postAPI<string, ISponsorGasCourseRequest>(endpointKey, payload, init);

  return response.data;
}

export async function postWithdrawSponsorGasService(
  url: string | null | undefined,
  { payload, id, init }: { payload: ISponsorGasCourseRequest; id: string; init?: RequestInit }
) {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_NFT_FEES_WITHDRAW,
      params: { id },
    });
  }

  const response = await postAPI<string, ISponsorGasCourseRequest>(endpointKey, payload, init);

  return response.data;
}
