import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';
import type { ICommissionItem, ICommissionListRes, ICommissionPayload } from '../types/commission';

export async function getCommissionListService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ICommissionListRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COMMISSIONS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ICommissionListRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getCommissionDetailService(
  url: string,
  { params, init }: { params: { id: string }; init?: RequestInit }
): Promise<ICommissionItem | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COMMISSIONS_ID,
      params: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ICommissionItem>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export const postCommissionService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICommissionPayload; init?: RequestInit }
) => {
  const response = await postAPI<ICommissionItem, ICommissionPayload>(
    endpoint ?? API_ENDPOINT.COMMISSIONS,
    payload,
    init
  );
  return response.data;
};

export const putCommissionService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICommissionPayload; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COMMISSIONS_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await putAPI<ICommissionItem, ICommissionPayload>(endpointKey, payload, init);
  return response.data;
};

export const deleteCommissionService = async (
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

    endpointKey = `${API_ENDPOINT.COMMISSIONS}?${queryParams.toString()}`;
  }

  const response = await deleteAPI<void, unknown>(endpointKey, init);
  return response.data;
};
