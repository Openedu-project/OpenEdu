import type { IDataPagination } from './pagination';

export interface IUserSetting<T> {
  user_id: string;
  org_id: string;
  type: string;
  enable: boolean;
  value: T;
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
}

export interface IUserSettingRes<T> extends Array<IUserSetting<T>> {}

export interface IUserSettingListRes<T> extends IDataPagination<IUserSettingRes<T>> {}

export interface IUserSettingPayload<T> {
  settings: {
    id?: string;
    type: string;
    enable: boolean;
    value: T;
  }[];
}
