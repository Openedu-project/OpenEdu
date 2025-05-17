import { buildUrl } from '@oe/core';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { deleteAPI, fetchAPI, postAPI } from '#utils/fetch';
import type {
  IBackerData,
  ICreateLaunchpadRequest,
  ILaunchpad,
  ILaunchpadResponse,
  IMyLaunchpadResponse,
  IPledgeLaunchpadPayload,
} from '../types/launchpad';

export const getLaunchpadsService = async (
  url: string | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ILaunchpadResponse | undefined> => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ILaunchpadResponse>(endpointKey, init);
    return response.data;
  } catch {
    return undefined;
  }
};

export async function getLaunchpadService(
  url: string | undefined,
  { id, init, preloads }: { id: string; init?: RequestInit; preloads?: string[] }
): Promise<ILaunchpad | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_ID,
      params: {
        id,
      },
      queryParams: {
        preloads: preloads,
      },
    });
  }

  try {
    const response = await fetchAPI<ILaunchpad>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getBackerService(
  url: string | undefined,
  { id, init, preloads }: { id: string; init?: RequestInit; preloads?: string[] }
): Promise<IBackerData | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_ID_INVESTMENTS,
      params: {
        id,
      },
      queryParams: {
        preloads: preloads,
      },
    });
  }

  try {
    const response = await fetchAPI<IBackerData>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getLaunchpadConfigService<T>(
  url: string,
  { keys, init }: { keys?: string[]; init?: RequestInit }
): Promise<T | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_CREATE,
      queryParams: {
        keys,
      },
    });
  }

  try {
    const response = await fetchAPI<T[]>(endpointKey, init);

    return response.data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getMyLaunchpadService({
  init,
  params,
}: {
  init?: RequestInit;
  params: IFilter & { status?: string };
}): Promise<IMyLaunchpadResponse | null> {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_MY_LAUNCHPAD,
    queryParams: {
      ...params,
      sort: params?.sort || 'create_at desc',
    },
  });
  try {
    const response = await fetchAPI<IMyLaunchpadResponse>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export const postPledgeLaunchpadService = async (payload?: IPledgeLaunchpadPayload) => {
  const response = await postAPI(API_ENDPOINT.LAUNCHPADS_INVESTMENTS, payload);

  return response.data;
};

export const postCreateLaunchpadService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICreateLaunchpadRequest; init?: RequestInit }
) => {
  const response = await postAPI<ILaunchpad, ICreateLaunchpadRequest>(
    endpoint ?? API_ENDPOINT.LAUNCHPADS,
    payload,
    init
  );

  return response.data;
};

export const postInitPoolLaunchpadService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string; wallet_id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_POOLS_ID,
      params: {
        id: payload.id,
      },
    });
  }

  const response = await postAPI<ILaunchpad, { wallet_id: string }>(
    endpoint ?? API_ENDPOINT.LAUNCHPADS_POOLS_ID,
    payload,
    init
  );

  return response.data;
};

export const postLaunchpadVote = async (
  endpoint: string | null | undefined,
  { milestone_id, payload, init }: { milestone_id: string; payload: { status: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_VOTE_ID,
      params: {
        milestone_id: milestone_id,
      },
    });
  }

  const response = await postAPI<ILaunchpad, { status: string }>(
    endpointKey ?? API_ENDPOINT.LAUNCHPADS_VOTE_ID,
    payload,
    init
  );

  return response.data;
};

export const postBookmarkLaunchpadService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_BOOKMARK_ID,
      params: { id: payload.id },
    });
  }

  const response = await postAPI<ILaunchpad, null>(endpointKey, null, init);

  return response.data;
};

export const removeBookmarkLaunchpadService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string }; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_BOOKMARK_ID,
      params: {
        id: payload.id,
      },
    });
  }
  const response = await deleteAPI(endpointKey, undefined, init);

  return response.data;
};
