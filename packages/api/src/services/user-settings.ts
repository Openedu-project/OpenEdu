import type { IUserSetting, IUserSettingListRes, IUserSettingPayload } from '#types/user-settings';
import { type RequestInitAPI, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

export const getUserSettings = async <T>(url: string, init: RequestInitAPI = {}) => {
  const response = await fetchAPI<IUserSettingListRes<T>>(url, init);

  return response.data;
};

export const getUserSettingDetail = async <T>(url: string, init: RequestInitAPI = {}) => {
  const response = await fetchAPI<IUserSetting<T>>(url, init);

  return response.data;
};

export const createUserSetting = async <T>(url: string, payload: IUserSettingPayload<T>, init: RequestInitAPI = {}) => {
  const response = await postAPI<IUserSetting<T>, IUserSettingPayload<T>>(url, payload, init);

  return response.data;
};

export const updateUserSetting = async <T>(url: string, payload: IUserSettingPayload<T>, init: RequestInitAPI = {}) => {
  const response = await putAPI<IUserSetting<T>, IUserSettingPayload<T>>(url, payload, init);

  return response.data;
};

export const deleteUserSetting = async <T>(
  url: string,
  payload?: IUserSettingPayload<T>,
  init: RequestInitAPI = {}
) => {
  const response = await deleteAPI<IUserSetting<T>, IUserSettingPayload<T>>(url, payload, init);

  return response.data;
};
