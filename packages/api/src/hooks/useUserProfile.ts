import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import {
  addUserToBlockService,
  changeMyPasswordService,
  followUserService,
  getListUserActionService,
  getMeSettingsService,
  getUserProfileService,
  unblockUserService,
  unfollowUserService,
  updateMeSettingsService,
  updateMyProfileService,
} from '../services/user-profile';
import type {
  IAddUserToBlockPayload,
  IChangeMyPswPayload,
  IMeSettingPayload,
  IMyProfilePayload,
} from '../types/user-profile';

export function useGetUserProfile(userId: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ID,
    params: { id: userId },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getUserProfileService(url, { params: { id: userId } })
  );

  return {
    dataUserProfile: data,
    isLoadingUserProfile: isLoading,
    errorUserProfile: error,
    mutateUserProfile: mutate,
  };
}

export function useGetMeSettings<T>(params: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ME_SETTINGS,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getMeSettingsService<T>(url, { params })
  );

  return {
    dataMeSettings: data,
    isLoadingMeSettings: isLoading,
    errorMeSettings: error,
    mutateMeSettings: mutate,
  };
}

export function useUpdateMeSettings<T>() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USERS_ME_SETTINGS,
    async (url: string, { arg }: { arg: IMeSettingPayload<T> }) => updateMeSettingsService(url, { payload: arg })
  );

  return {
    triggerMeSettings: trigger,
    isLoadingMeSettings: isMutating,
    errorMeSettings: error,
  };
}

export function useUpdateMyProfile() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USERS_ME,
    async (url: string, { arg }: { arg: IMyProfilePayload }) => updateMyProfileService(url, { payload: arg })
  );

  return {
    triggerMyProfile: trigger,
    isLoadingMyProfile: isMutating,
    errorMyProfile: error,
  };
}

export function useChangeMyPassword() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USERS_ME_CHANGE_PASSWORD,
    async (url: string, { arg }: { arg: IChangeMyPswPayload }) => changeMyPasswordService(url, { payload: arg })
  );

  return {
    triggerChangePassword: trigger,
    isLoadingChangePassword: isMutating,
    errorChangePassword: error,
  };
}

export function useGetListUserAction<T>(params: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ME_ACTIONS,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getListUserActionService<T>(url, { params })
  );

  return {
    dataUserList: data,
    isLoadingUserList: isLoading,
    errorUserList: error,
    mutateUserList: mutate,
  };
}

export function useAddUserToBlock() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.USERS_BLOCK,
    async (url: string, { arg }: { arg: IAddUserToBlockPayload }) => addUserToBlockService(url, { payload: arg })
  );

  return {
    triggerAddToBlock: trigger,
    isLoadingAddToBlock: isMutating,
    errorAddToBlock: error,
  };
}

export function useUnblockUser(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ID_BLOCK,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(endpointKey, async (url: string) =>
    unblockUserService(url, { params: { id } })
  );

  return {
    triggerUnblock: trigger,
    isLoadingUnblock: isMutating,
    errorUnblock: error,
  };
}

export function useFollowUser(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ID_FOLLOW,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(endpointKey, async (url: string) =>
    followUserService(url, { params: { id } })
  );

  return {
    triggerFollow: trigger,
    isLoadingFollow: isMutating,
    errorFollow: error,
  };
}

export function useUnfollowUser(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ID_FOLLOW,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(endpointKey, async (url: string) =>
    unfollowUserService(url, { params: { id } })
  );

  return {
    triggerUnfollow: trigger,
    isLoadingUnfollow: isMutating,
    errorUnfollow: error,
  };
}
