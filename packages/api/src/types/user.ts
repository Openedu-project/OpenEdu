import type { ICreatorAcceptResponse } from './creators';
import type { IFileResponse } from './file';
import type { IDataPagination } from './pagination';

export interface IUserSettingsOption {
  facebook?: string;
  github?: string;
  gmail?: string;
  linkedin?: string;
  locale?: string;
  notification?: string;
  telegram?: string;
  website?: string;
  x?: string;
}

export interface IUserRole {
  create_at?: number;
  default?: boolean;
  delete_at?: number;
  description?: string;
  id?: string;
  level?: number;
  name?: string;
  org_id?: string;
  update_at?: number;
}

export interface IUserRoleOrg {
  create_at?: number;
  delete_at?: number;
  id?: string;
  org_domain?: string;
  org_id?: string;
  role?: IUserRole;
  role_id?: string;
  update_at?: number;
  user?: IUser;
  user_id?: string;
}

export interface IUser {
  about?: string;
  active?: boolean;
  avatar?: string;
  blocked?: boolean;
  cover_photo?: string;
  create_at?: number;
  delete_at?: number;
  display_name: string;
  email: string;
  followers?: number;
  following?: number;
  headline?: string;
  id?: string;
  password?: string;
  phone?: string;
  position?: string;
  props?: IUserSettingsOption;
  require_set_password?: boolean;
  roles?: IUserRoleOrg[];
  skills?: string[];
  update_at?: number;
  username: string;
}
export interface IUsersRes extends IDataPagination<IUser[]> {}

interface IWriterInOrg {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user: null;
  thumbnail: IFileResponse | null;
  schema: string;
  name: string;
  domain: string;
  alt_domain: string;
  active: boolean;
  create_by: null;
}

export interface IUserProfile extends IUser {
  total_blogs: number;
  writer_in_orgs?: IWriterInOrg[];
  is_following?: boolean;
}

export interface IListUserProfileRes extends IDataPagination<IUserProfile[]> {}

export interface IUserInvite {
  user_emails: string[];
  event: string;
  object_type?: string;
  object_id?: string;
}

export interface IUserInvitePayload extends IUserInvite {}

interface IUserRoleParams {
  role_id: string[];
  user_id: string;
}

export interface IUserRoleAction {
  add_ids?: IUserRoleParams[];
  remove_ids?: IUserRoleParams[];
}

export interface IAcceptUserInvitePayload {
  token: string;
}

export interface IAcceptUserInviteRes extends ICreatorAcceptResponse {}

export interface IUserInvitationItem {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user: null;
  user_id: null;
  org_id: string;
  email: string;
  token: string;
  event: string;
  is_expired: boolean;
  is_verified: boolean;
  send_email: number;
  redirect_url: string;
}

export interface IUserInvitationRes extends IDataPagination<IUserInvitationItem[]> {}

export interface IUserInvitationPayload {
  user_token_ids: string[];
}
