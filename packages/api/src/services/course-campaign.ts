import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, postAPI } from '#utils/fetch';
import type { IAddCoursesPayload, IAffiliateCampaignCourseListRes } from '../types/campaign-course';

export const postCoursesToAffiliateCampaignService = async (
  endpoint: string | null | undefined,
  {
    params,
    payload,
    init,
  }: {
    params: { campaignId: string };
    payload: IAddCoursesPayload;
    init?: RequestInit;
  }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_COURSES,
      params: {
        id: params.campaignId,
      },
    });
  }

  const response = await postAPI<IAffiliateCampaignCourseListRes, IAddCoursesPayload>(endpointKey, payload, init);
  return response.data;
};

export const deleteCoursesFromAffiliateCampaignService = async (
  endpoint: string | null | undefined,
  {
    params,
    payload,
    init,
  }: {
    params: { campaignId: string };
    payload: { courseIds: string[] };
    init?: RequestInit;
  }
) => {
  let endpointKey = endpoint;
  const queryParams = new URLSearchParams();
  for (const id of payload.courseIds) {
    queryParams.append('ids', id);
  }

  if (endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: endpointKey,
      queryParams: {
        ids: payload.courseIds.toString(),
      },
    });
  } else {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_COURSES,
      params: {
        id: params.campaignId,
      },
      queryParams: queryParams as unknown as Record<string, unknown>,
    });
  }

  const response = await deleteAPI<void, RequestInit>(endpointKey, init);
  return response.data;
};
