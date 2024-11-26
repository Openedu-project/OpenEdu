import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';
import type {
  IAcceptUserInvitePayload,
  IAcceptUserInviteRes,
  IListUserProfileRes,
  IUserInvitationItem,
  IUserInvitationPayload,
  IUserInvitationRes,
  IUserInvitePayload,
  IUserProfile,
  IUserRoleAction,
  IUsersRes,
} from '../types/user';

export async function getUserProfileService(
  url: string,
  { id, init }: { id: string; init?: RequestInit }
): Promise<IUserProfile | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ID,
      queryParams: {
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
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
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
