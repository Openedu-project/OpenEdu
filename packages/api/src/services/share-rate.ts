import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, putAPI } from '#utils/fetch';
import type { IShareRatePayload, IShareRateRes } from '../types/share-rate';

export async function getShareRateByCodeService(
  url: string,
  { params, init }: { params: IFilter & { code: string }; init?: RequestInit }
): Promise<IShareRateRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.REFERRAL_LINKS_BY_CODE_CODE,
      params: {
        code: params.code,
      },
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IShareRateRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export const putShareRateService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IShareRatePayload; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.REFERRAL_LINKS_ID,
      params: {
        id: payload.campaignId || '',
      },
    });
  }

  const response = await putAPI<IShareRateRes, IShareRatePayload>(endpointKey, payload, init);
  return response.data;
};
