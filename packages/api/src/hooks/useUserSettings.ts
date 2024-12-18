import useSWRMutation from 'swr/mutation';

import useSWR, { mutate } from 'swr';
import { API_ENDPOINT } from '#utils/endpoints';
import type { HTTPError } from '#utils/http-error';

import { createUserSetting, deleteUserSetting, getUserSettings, updateUserSetting } from '#services/user-settings';
import type { IUserSetting, IUserSettingListRes, IUserSettingPayload } from '#types/user-settings';
import { objectToQueryParams } from '#utils/helpers';

type QueryParams = { [key: string]: unknown };

export function useGetUserSettings<T>(params: QueryParams) {
  const settingsEndpoint = API_ENDPOINT.USER_SETTINGS;
  const url = params ? `${settingsEndpoint}?${objectToQueryParams(params)}` : settingsEndpoint;

  const { data, isLoading, error } = useSWR<IUserSettingListRes<T>, HTTPError>(url, getUserSettings);

  return {
    dataUserSettings: data,
    isLoadingUserSettings: isLoading,
    errorUserSettings: error,
    mutateUserSettings: () => mutate(url),
  };
}

export function useCreateUserSetting<T>() {
  const { trigger, error, isMutating } = useSWRMutation<IUserSetting<T>, HTTPError, string, IUserSettingPayload<T>>(
    API_ENDPOINT.USER_SETTINGS,
    (url, { arg }) => createUserSetting(url, arg)
  );

  return {
    triggerCreateUserSetting: trigger,
    isLoadingCreatingUserSetting: isMutating,
    errorCreateUserSetting: error,
  };
}

export function useUpdateUserSetting<T>() {
  const { trigger, error, isMutating } = useSWRMutation<IUserSetting<T>, HTTPError, string, IUserSettingPayload<T>>(
    API_ENDPOINT.USER_SETTINGS,
    (url, { arg }) => updateUserSetting(url, arg)
  );

  return {
    triggerUpdateUserSetting: trigger,
    isLoadingUpdatingUserSetting: isMutating,
    errorUpdateUserSetting: error,
  };
}

export function useDeleteUserSetting() {
  const { trigger, error, isMutating } = useSWRMutation<IUserSetting<unknown>, HTTPError, string, string>(
    API_ENDPOINT.USER_SETTINGS,
    (url, { arg }) => deleteUserSetting(`${url}?ids=${arg}`)
  );

  return {
    triggerDeleteUserSetting: trigger,
    isLoadingDeleteUserSetting: isMutating,
    errorDeleteUserSetting: error,
  };
}
