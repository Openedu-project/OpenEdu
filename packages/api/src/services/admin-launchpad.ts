import type {
  IAdminLaunchpadDetailRes,
  IAdminLaunchpadInvestmentRes,
  IAdminLaunchpadItem,
  IAdminLaunchpadsListRes,
  IAdminPublishLaunchpadPayload,
  IDecideVotingLaunchpadPayload,
  IStartFundingTimeLaunchpadPayload,
} from '#types/admin-launchpad';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';

export async function getAdminLaunchpadsService(
  url: string | null,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IAdminLaunchpadsListRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS,
      queryParams: { ...params },
    });
  }

  try {
    const response = await fetchAPI<IAdminLaunchpadsListRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}
export async function getAdminLaunchpadDetailService(
  url: string | null,
  { params, queryParams = {}, init }: { params: { id: string }; queryParams?: IFilter; init?: RequestInit }
): Promise<IAdminLaunchpadDetailRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_ID,
      params: {
        id: params.id,
      },
      queryParams: { ...queryParams },
    });
  }

  try {
    const response = await fetchAPI<IAdminLaunchpadDetailRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}
export async function getAdminLaunchpadInvestmentService(
  url: string | null,
  { params, queryParams = {}, init }: { params: { id: string }; queryParams?: IFilter; init?: RequestInit }
): Promise<IAdminLaunchpadInvestmentRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_ID_INVESTMENTS,
      params: {
        id: params.id,
      },
      queryParams: { ...queryParams },
    });
  }

  try {
    const response = await fetchAPI<IAdminLaunchpadInvestmentRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export const postAdminPublishLaunchpadsService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IAdminPublishLaunchpadPayload & { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_PUBLISH_LAUNCHPAD_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await postAPI<IAdminLaunchpadItem, IAdminPublishLaunchpadPayload>(
    endpointKey ?? API_ENDPOINT.LAUNCHPADS_PUBLISH_LAUNCHPAD_ID,
    payload,
    init
  );
  return response.data;
};

export const postAdminCancelLaunchpadsService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_CANCEL_LAUNCHPAD_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await postAPI<IAdminLaunchpadItem, null>(
    endpointKey ?? API_ENDPOINT.LAUNCHPADS_CANCEL_LAUNCHPAD_ID,
    null,
    init
  );
  return response.data;
};

export const postAdminStartVotingLaunchpadsService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string; milestoneId: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_START_VOTING_ID,
      params: {
        id: payload.id,
        milestone_id: payload.milestoneId,
      },
    });
  }

  const response = await postAPI<IAdminLaunchpadItem, null>(
    endpointKey ?? API_ENDPOINT.LAUNCHPADS_START_VOTING_ID,
    null,
    init
  );
  return response.data;
};

export const putAdminCancelPublishLaunchpadsService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_PUBLISH_LAUNCHPAD_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await putAPI<IAdminLaunchpadItem, null>(endpointKey, null, init);
  return response.data;
};

export const putAdminStartFundingTimeLaunchpadsService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IStartFundingTimeLaunchpadPayload & { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_FUNDING_TIME_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await putAPI<IAdminLaunchpadItem, IStartFundingTimeLaunchpadPayload>(endpointKey, payload, init);
  return response.data;
};

export const postAdminDecideVotingLaunchpadsService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IDecideVotingLaunchpadPayload & { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_DECIDE_VOTING_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await postAPI<IAdminLaunchpadItem, IDecideVotingLaunchpadPayload>(
    endpointKey ?? API_ENDPOINT.LAUNCHPADS_DECIDE_VOTING_ID,
    payload,
    init
  );
  return response.data;
};
