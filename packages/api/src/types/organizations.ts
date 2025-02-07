import type { IFileResponse } from './file';
import type { IUserProfile } from './user-profile';

export interface IOrganizationUser extends IUserProfile {
  blocking_reason: string;
}

export interface IOrganization {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user: IOrganizationUser;
  thumbnail: IFileResponse | null;
  schema: string;
  name: string;
  alt_domain: string;
  domain: string;
  active: boolean;
  user_id: string;
  settings: null;
  sub_domains: null;
}

export interface IOrganizationPayload {
  full_name?: string;
  name?: string;
  domain?: string;
  email?: string;
  thumbnail_id?: string | null;
  phone?: string;
  user_id?: string;
  active?: boolean;
  form_session_id?: string;
}

export interface IOrganizationParams {
  page: number;
  per_page: number;
  active?: boolean;
}
