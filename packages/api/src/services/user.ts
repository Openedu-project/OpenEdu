import type { IFilter } from '#types/filter';
import type { IListUserProfileRes, IUserProfile } from '#types/user-profile';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';
import type {
  IAcceptUserInvitePayload,
  IAcceptUserInviteRes,
  IUserInvitationItem,
  IUserInvitationPayload,
  IUserInvitationRes,
  IUserInvitePayload,
  IUserRoleAction,
  IUsersRes,
} from '../types/user';

export async function getUserProfileService(
  url?: string,
  { id, init }: { id?: string; init?: FetchOptions } = {}
): Promise<IUserProfile | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ID,
      params: {
        id,
      },
    });
  }
  try {
    const response = await fetchAPI<IUserProfile>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getListUserService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IUsersRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IUsersRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export const postInviteUserService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IUserInvitePayload; init?: RequestInit }
) => {
  const response = await postAPI<{ message: string }, IUserInvitePayload>(
    endpoint ?? API_ENDPOINT.USERS_INVITE,
    payload,
    init
  );

  return response.data;
};

export const postAcceptUserInvitationService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IAcceptUserInvitePayload; init?: RequestInit }
) => {
  const response = await postAPI<IAcceptUserInviteRes, IAcceptUserInvitePayload>(
    endpoint ?? API_ENDPOINT.USERS_ACCEPT,
    payload,
    init
  );

  return response.data;
};

export const postUserRolesService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IUserRoleAction; init?: RequestInit }
) => {
  const response = await postAPI<{ message: string }, IUserRoleAction>(
    endpoint ?? API_ENDPOINT.USERS_ROLES,
    payload,
    init
  );

  return response.data;
};

export async function getTopAuthorService(
  url?: string,
  { params, init }: { params?: IFilter; init?: FetchOptions } = {}
): Promise<IListUserProfileRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_TOP_BLOG_VIEWED,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IListUserProfileRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}
export async function getUserInvitationsListService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IUserInvitationRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USER_INVITATIONS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IUserInvitationRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export const putResendInvitationsUserService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IUserInvitationPayload; init?: RequestInit }
) => {
  const response = await putAPI<IUserInvitationItem, IUserInvitationPayload>(
    endpoint ?? API_ENDPOINT.USER_INVITATIONS,
    payload,
    init
  );

  return response.data;
};

export const postUserEmailService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: { email: string }; init?: RequestInit }
) => {
  const response = await postAPI<{ message: string }, { email: string }>(
    endpoint ?? API_ENDPOINT.NEWSLETTERS,
    payload,
    init
  );

  return response.data;
};

export const followUserService = async (
  type: 'follow' | 'unfollow',
  endpoint?: string | undefined,
  id?: string,
  { payload, init }: { payload?: Record<string, unknown>; init?: RequestInit } = {}
) => {
  const endpointKey = endpoint ?? createAPIUrl({ endpoint: API_ENDPOINT.USERS_ID_FOLLOW, params: { id } });
  const response = type === 'follow' ? await postAPI(endpointKey, payload, init) : await deleteAPI(endpointKey, init);

  return response.data;
};

export const unfollowUserService = async (endpoint?: string | undefined, id?: string, init?: RequestInit) => {
  const endpointKey = endpoint ?? createAPIUrl({ endpoint: API_ENDPOINT.USERS_ID_FOLLOW, params: { id } });
  const response = await deleteAPI(endpointKey, init);

  return response.data;
};
