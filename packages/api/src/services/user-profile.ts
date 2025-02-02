import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';
import { createAPIUrl } from '#utils/fetch';
import type { IDataPagination } from '../types/pagination';
import type {
  IAddUserToBlockPayload,
  IChangeMyPswPayload,
  IMeSettingPayload,
  IMeSettings,
  IMyProfilePayload,
  IMyProfileResponse,
  IUserProfile,
} from '../types/user-profile';

export async function getUserProfileService(
  url: string,
  { params, init }: { params: { id: string }; init?: RequestInit }
): Promise<IUserProfile | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ID,
      params: { ...params },
    });
  }

  try {
    const response = await fetchAPI<IUserProfile>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getMeSettingsService<T>(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IMeSettings<T> | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ME_SETTINGS,
      queryParams: { ...params },
    });
  }

  try {
    const response = await fetchAPI<IMeSettings<T>>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function updateMeSettingsService<T>(
  endpoint: string | null | undefined,
  { payload, init }: { payload: IMeSettingPayload<T>; init?: RequestInit }
) {
  const response = await putAPI<IMeSettings<T>, IMeSettingPayload<T>>(
    endpoint ?? API_ENDPOINT.USERS_ME_SETTINGS,
    payload,
    init
  );
  return response.data;
}

export async function updateMyProfileService(
  endpoint: string | null | undefined,
  { payload, init }: { payload: IMyProfilePayload; init?: RequestInit }
) {
  const response = await putAPI<IMyProfileResponse, IMyProfilePayload>(
    endpoint ?? API_ENDPOINT.USERS_ME,
    payload,
    init
  );
  return response.data;
}

export async function changeMyPasswordService(
  endpoint: string | null | undefined,
  { payload, init }: { payload: IChangeMyPswPayload; init?: RequestInit }
) {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = API_ENDPOINT.USERS_ME_CHANGE_PASSWORD;
  }

  const response = await postAPI<IMyProfileResponse, IChangeMyPswPayload>(endpointKey, payload, init);
  return response.data;
}

export async function getListUserActionService<T>(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IDataPagination<T[]> | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ME_ACTIONS,
      queryParams: { ...params },
    });
  }

  try {
    const response = await fetchAPI<IDataPagination<T[]>>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function addUserToBlockService(
  endpoint: string | null | undefined,
  { payload, init }: { payload: IAddUserToBlockPayload; init?: RequestInit }
) {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = API_ENDPOINT.USERS_BLOCK;
  }

  const response = await postAPI<{ message: string }, IAddUserToBlockPayload>(endpointKey, payload, init);
  return response.data;
}

export async function unblockUserService(
  endpoint: string | null | undefined,
  { params, init }: { params: { id: string }; init?: RequestInit }
) {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ID_BLOCK,
      params: { ...params },
    });
  }

  const response = await deleteAPI(endpointKey, init);
  return response.data;
}

export async function followUserService(
  endpoint: string | null | undefined,
  { params, init }: { params: { id: string }; init?: RequestInit }
) {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ID_FOLLOW,
      params: { ...params },
    });
  }

  const response = await postAPI<{ message: string }, null>(endpointKey, null, init);
  return response.data;
}

export async function unfollowUserService(
  endpoint: string | null | undefined,
  { params, init }: { params: { id: string }; init?: RequestInit }
) {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ID_FOLLOW,
      params: { ...params },
    });
  }

  const response = await deleteAPI(endpointKey, init);
  return response.data;
}
