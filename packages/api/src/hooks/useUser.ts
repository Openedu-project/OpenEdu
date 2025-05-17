import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { buildUrl } from '@oe/core';
import {
  followUserService,
  getListUserService,
  getTopAuthorService,
  getUserInvitationsListService,
  postAcceptUserInvitationService,
  postInviteUserService,
  postUserEmailService,
  postUserRolesService,
  putResendInvitationsUserService,
} from '#services/user';
import type { IFilter } from '#types/filter';
import type {
  IAcceptUserInvitePayload,
  IAcceptUserInviteRes,
  IUserInvitationItem,
  IUserInvitationPayload,
  IUserInvitePayload,
  IUserRoleAction,
} from '#types/user';
import { API_ENDPOINT } from '#utils/endpoints';

// export function useGetUserProfile(id: string, shouldFetch = true) {
//   const endpointKey = buildUrl({ endpoint: API_ENDPOINT.USERS_ID, params: { id } });
//   const { data, isLoading, error, mutate } = useSWR(shouldFetch ? endpointKey : null, (endpoint: string) =>
//     getUserProfileService(endpoint, { id })
//   );

//   return {
//     profile: data,
//     profileError: error,
//     mutateProfile: mutate,
//     profileLoading: isLoading,
//   };
// }

export const useGetListUser = (params: IFilter) => {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.USERS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getListUserService(endpoint, { params })
  );

  return {
    users: data,
    isUsersLoading: isLoading,
    mutate,
    error,
  };
};

export function useInviteUser() {
  // const {
  //   trigger: inviteUser,
  //   error,
  //   isMutating: loading,
  // } = useSWRMutation<HTTPResponse<{ message: string }>, HTTPError, string, IUserInvite>(
  //   `${API_ENDPOINT.userInvite()}`,
  //   (url, { arg }) => postAPI(url, arg)
  // );

  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USERS_INVITE,
    async (endpoint: string, { arg }: { arg: IUserInvitePayload }): Promise<{ message: string }> =>
      postInviteUserService(endpoint, { payload: arg })
  );
  return {
    inviteUser: trigger,
    loading: isMutating,
    error,
  };
}
export function useAcceptUserInvitation() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USERS_ACCEPT,
    async (endpoint: string, { arg }: { arg: IAcceptUserInvitePayload }): Promise<IAcceptUserInviteRes> =>
      postAcceptUserInvitationService(endpoint, { payload: arg })
  );
  return {
    triggerAcceptUserInvitation: trigger,
    isLoading: isMutating,
    error,
  };
}

export function usePostUserRoles() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USERS_ROLES,
    async (endpoint: string, { arg }: { arg: IUserRoleAction }): Promise<{ message: string }> =>
      postUserRolesService(endpoint, { payload: arg })
  );
  return {
    isLoading: isMutating,
    triggerRoles: trigger,
    error,
  };
}

export const useGetTopAuthor = (params: IFilter) => {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.USERS_TOP_BLOG_VIEWED, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getTopAuthorService(endpoint, { params })
  );

  return {
    topAuthor: data,
    isLoading: isLoading,
    mutateTopAuthor: mutate,
    error,
  };
};
export const useGetUserInvitationsList = ({ params }: { params: IFilter }) => {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.USER_INVITATIONS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getUserInvitationsListService(endpoint, { params })
  );

  return {
    isLoading,
    inviteUserError: error,
    mutateInviteUserList: mutate,
    inviteUserList: data,
  };
};

export function useResendInvitationsUser() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USER_INVITATIONS,
    async (endpoint: string, { arg }: { arg: IUserInvitationPayload }): Promise<IUserInvitationItem> =>
      putResendInvitationsUserService(endpoint, { payload: arg })
  );
  return {
    isLoading: isMutating,
    triggerResendInvitationUser: trigger,
    error,
  };
}

export function usePostUserEmail() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.NEWSLETTERS,
    async (endpoint: string, { arg }: { arg: { email: string } }): Promise<{ message: string }> =>
      postUserEmailService(endpoint, { payload: arg })
  );
  return {
    loading: isMutating,
    triggerEmail: trigger,
    error,
  };
}

export function useTriggerFollowUser(type: 'follow' | 'unfollow', id: string) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.USERS_ID_FOLLOW, params: { id } });
  const { trigger, isMutating, error } = useSWRMutation(endpointKey, (url: string) => followUserService(type, url));
  return {
    loading: isMutating,
    triggerFollowUser: trigger,
    error,
  };
}
