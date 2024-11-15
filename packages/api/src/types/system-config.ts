import type { systemConfigKeys } from '#utils/system-config';

export type ISystemConfigKey = (typeof systemConfigKeys)[keyof typeof systemConfigKeys];

export interface IThemeConfig<ThemeData, ColorVars> {
  themeData: ThemeData;
  colorVars: ColorVars;
}

export interface ISystemConfigPayload<T> {
  key: ISystemConfigKey;
  value: T | string;
  org_id?: string;
  domain?: string;
  data_type?: 'jsonb' | 'json_array' | 'string';
}

export interface ISystemConfigRes<T> {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  key: ISystemConfigKey;
  value: T;
  org_id: string;
  data_type: string;
}
