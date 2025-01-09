import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, fetchAPI, postAPI } from '#utils/fetch';
import type { ICreateReferrersPayload, IReferrerListRes } from '../types/referrer';

export async function getReferrerListService(
  url: string,
  { params, id, init }: { params: IFilter; id: string; init?: RequestInit }
): Promise<IReferrerListRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_REFERRERS,
      params: {
        id,
      },
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IReferrerListRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export const postReferrerService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICreateReferrersPayload; init?: RequestInit }
) => {
  const response = await postAPI<void, ICreateReferrersPayload>(endpoint ?? API_ENDPOINT.REFERRERS, payload, init);
  return response.data;
};

export const deleteReferrerService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { ids: string[]; campaign_id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  const queryParams = new URLSearchParams();

  for (const id of payload.ids) {
    queryParams.append('ids', id);
  }
  if (endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: endpointKey,
      queryParams: {
        ids: payload.ids.toString(),
        campaign_id: payload.campaign_id,
      },
    });
  } else {
    queryParams.append('campaign_id', payload.campaign_id);

    endpointKey = `${API_ENDPOINT.REFERRERS}?${queryParams.toString()}`;
  }

  const response = await deleteAPI<void, unknown>(endpointKey, init);
  return response.data;
};
