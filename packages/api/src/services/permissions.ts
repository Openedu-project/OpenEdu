import { buildUrl } from '@oe/core';
import type { IFilter } from '#types/filter';
import type {
  IPermissionAccessPayload,
  IPermissionAccessRes,
  IPermissionConfigPayload,
  IPermissionConfigRes,
  IPermissionMyAccessRes,
} from '#types/permissions';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI, postAPI } from '#utils/fetch';

// Permission Page Config
export async function getPermissionPageConfigService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IPermissionConfigRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.PAGE_CONFIGS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IPermissionConfigRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export const postPermissionConfigService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IPermissionConfigPayload; init?: RequestInit }
) => {
  const response = await postAPI<IPermissionConfigRes, IPermissionConfigPayload>(
    endpoint ?? API_ENDPOINT.PAGE_CONFIGS,
    payload,
    init
  );

  return response.data;
};

// Permission Page Access
export async function getPermissionAccessService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IPermissionAccessRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.PAGE_ACCESSES,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IPermissionAccessRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}
export async function getPermissionMyAccessService(
  url: string,
  { params, init }: { params?: IFilter; init?: RequestInit }
): Promise<IPermissionMyAccessRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.USERS_ME_PERMISSIONS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IPermissionMyAccessRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export const postPermissionAccessService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IPermissionAccessPayload; init?: RequestInit }
) => {
  const response = await postAPI<IPermissionAccessRes, IPermissionAccessPayload>(
    endpoint ?? API_ENDPOINT.PAGE_ACCESSES,
    payload,
    init
  );

  return response.data;
};
