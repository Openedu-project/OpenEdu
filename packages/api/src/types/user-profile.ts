import type { IBlog } from './blog';
import type { ICertificateUser } from './certificate';
import type { ICourse } from './course/course';
import type { IFileResponse } from './file';
import type { IDataPagination, IPagination } from './pagination';
import type { IUser, IUserRoleInOrg, IUserSettingsOption } from './user';

export type TSettingsType = 'courses' | 'blogs' | 'certificates';

export type TProfilePlatform = 'facebook' | 'github' | 'linkedin' | 'telegram' | 'twitter' | 'gmail' | 'website';

export interface IMeSettingContent<T> {
  is_show: boolean;
  count: number;
  results: T[];
}

export interface IUserRole {
  role_id: string;
  org_id: string;
  org_name: string;
  org_domain: string;
}

export interface IUserProfile extends IUser {
  about: string;
  phone: string;
  position: string;
  following: number;
  followers: number;
  props: IUserSettingsOption;
  status: 'followed' | 'blocked';
  cover_photo: string;
  skills: string[] | null;
  total_courses: number;
  certificate: IMeSettingContent<ICertificateMyProfile>;
  course: IMeSettingContent<ICourseMyProfile>;
  blog: IMeSettingContent<IBlogMyProfile>;
  total_blogs: number;
  writer_in_orgs: IWriterInOrg[];
}

export interface IWriterInOrg {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user: null;
  thumbnail: null | IFileResponse;
  schema: string;
  name: string;
  domain: string;
  alt_domain: string;
  active: boolean;
  create_by: null;
}

export interface IMeSettings<T> {
  settings: T[];
  enable: boolean;
  pagination: IPagination;
}

export interface ICourseMyProfile extends ICourse {
  is_show: boolean;
}
export interface IBlogMyProfile extends IBlog {
  is_show: boolean;
}
export interface ICertificateMyProfile extends ICertificateUser {
  is_show?: boolean;
}

export interface IMeSettingPayload<T> {
  type: TSettingsType;
  enable: boolean;
  value: T;
}

export interface IMyCourseSetting {
  course_ids: string[];
}

export interface IMyCertificateSetting {
  certificate_ids: string[];
}

export interface IMyBlogSetting {
  blog_ids: string[];
}

export interface IMyProfileResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  username: string;
  email: string;
  phone: string;
  password: string;
  active: true;
  blocked: false;
  roles: null;
  props: IUserSettingsOption;
  cover_photo: string;
  skills: string[] | null;
  avatar: string;
  display_name: string;
  headline: string;
  about: string;
  position: string;
  following: number;
  followers: number;
  require_set_password: boolean;
}

export interface IMyProfilePayload {
  about?: string;
  avatar?: string;
  cover_photo?: string;
  display_name?: string;
  headline?: string;
  phone?: string;
  props?: IUserSettingsOption;
  skill?: string[];
  username?: string;
}

export interface IChangeMyPswPayload {
  new_password: string;
  old_password: string;
}

export interface IBlockingUser {
  id: string;
  username: string;
  display_name: string;
  email: string;
  active: boolean;
  blocked: boolean;
  roles: IUserRoleInOrg[];
  avatar: string;
}

export interface IAddUserToBlockPayload {
  user_ids: string[];
}

export interface IUserResponse {
  message: string;
}

export interface IListUserProfileRes extends IDataPagination<IUserProfile[]> {}
