import type { IClaimPointPayload, IMyPointProfileRes } from '#types/point';
import { API_ENDPOINT } from '#utils/endpoints';
import { postAPI } from '#utils/fetch';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

export const getMyPointProfileService = async (
  endpoint: string | null | undefined,
  { id, init }: { id: string; init?: RequestInit }
) => {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.USER_ME_POINT, params: { id } });
  const response = await fetchAPI<IMyPointProfileRes>(endpointKey ?? endpoint, init);

  return response.data;
};

export const postClaimNewPointService = async (url: string, payload: IClaimPointPayload, init: RequestInit = {}) => {
  const response = await postAPI<IMyPointProfileRes, IClaimPointPayload>(
    url ?? API_ENDPOINT.USER_ME_CLAIM_POINT,
    payload,
    init
  );

  return response.data;
};
