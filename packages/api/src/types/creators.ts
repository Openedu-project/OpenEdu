import type { IPagination } from './fetch';

export interface IInviteCreatorPayload {
  creator_emails: string[];
}

export interface ICreatorResponse {
  message: string;
}
export interface ICreatorAcceptResponse {
  about: string;
  active: boolean;
  avatar: string;
  blocked: boolean;
  create_at: number;
  delete_at: number;
  display_name: string;
  email: string;
  followers: number;
  following: number;
  headline: string;
  id: string;
  password: string;
  phone: string;
  position: string;
  props: {
    github: string;
    linkedin: string;
    locale: string;
    website: string;
  };
  require_set_password: boolean;
  roles: null;
  token: string;
  update_at: number;
  username: string;
}

export interface IAcceptInvitePayload {
  token: string;
}

export interface ICreatorSocial {
  github: string;
  linkedin: string;
  locale: string;
  website: string;
}

export interface ICreator {
  id: string;
  create_at: number;
  update_at?: number;
  delete_at?: number;
  username: string;
  email: string;
  phone?: string;
  password?: string;
  active?: boolean;
  blocked?: boolean;
  roles?: null;
  props?: ICreatorSocial;
  avatar?: string;
  display_name: string;
  headline?: string;
  about?: string;
  position?: string;
  following?: number;
  followers?: number;
  require_set_password?: boolean;
}

export interface IAcceptInviteResponse extends ICreator {
  token: string;
}

export interface ICreatorListResponse {
  results: ICreator[];
  pagination: IPagination;
}

export interface ICreatorPayload {
  form_session_id?: string; // optional
  email: string;
  display_name: string;
  phone: string;
}

export interface IDeleteCreatorsPayload {
  creator_ids: string[];
  org_id?: string;
}
