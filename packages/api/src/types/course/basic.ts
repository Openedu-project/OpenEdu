import type { IPagination } from '#types/fetch';
import type { IFileResponse } from '#types/file';
import type { IOrganization } from '#types/organizations';

export type TSort = 'create_at desc' | 'create_at asc' | 'order asc' | 'order desc';

export type TCourseDefaultLang = 'vi';

export type TCourseLearnMethod = 'default';

export type TLessonContent = 'video' | 'pdf' | 'text' | 'quiz' | 'embedded';

export type TCourseAprrovalStatus = 'new' | 'pending' | 'approved' | 'rejected' | 'cancelled';

export type TCourseStatus =
  | 'draft'
  | 'publish'
  | 'un-publish'
  | 'cancelled'
  | 'reject'
  | 'reviewing'
  | 'publish_root'
  | 'preview';

// the excluded fields when requesting
export type TExcludedFieldRequest = 'id' | 'create_at' | 'delete_at' | 'update_at';

export type StatusValue =
  | 'rejected_file_type'
  | 'rejected_max_files'
  | 'preparing'
  | 'error_file_size'
  | 'error_validation'
  | 'ready'
  | 'started'
  | 'getting_upload_params'
  | 'error_upload_params'
  | 'uploading'
  | 'exception_upload'
  | 'aborted'
  | 'restarted'
  | 'removed'
  | 'error_upload'
  | 'headers_received'
  | 'done';

export type TCourseRoles = 'owner' | 'co-creator' | 'mentor' | 'supervisor' | 'sponsor';

export interface ICourseParams extends IPagination {
  sort?: TSort;
  preloads?: string | string[];
  latest?: boolean;
  status?: TCourseStatus;
  role_id?: string; //used to API get user
  search_term?: string;
  search_categories?: string;
  email?: string;
  is_verified?: boolean;
  active?: boolean;
  org_id?: string;
  type?: string;
  user_id?: string;
  currency?: string;
  is_template?: boolean; // used to API get forms
  is_pay?: boolean; // used to API get forms
  //   group?: TMyCourseStatus;
  tracking_date_start?: number; //used to API tracking
  all_versions?: boolean; // used to API get form responses
}

export interface ICourseProps {
  support_channel: {
    channels: string[];
  };
  previous_version: number;
  previous_id: string;
  reject_org_reason: string;
  reject_root_reason: string;
  approval_uid: string;
  request_id: string;
  request_version: number;
  pre_approval_uid: string;
  certificate_condition: ICourseCertCondition;
  achievements: string[];
  private_channels: string[];
  default_language: TCourseDefaultLang;
  telegram_channel: string;
  preview_lessons: ICoursePreviewVideo[] | null;
  is_affiliate: boolean;
}

export interface ICourseCertCondition {
  completed_all_quiz: boolean;
  completed_course: boolean;
  course_completion_percentage: number;
  completed_final_quiz: boolean;
  final_quiz_completion_percentage: number;
  completed_required_lesson: boolean;
  required_lesson_uid: string;
}

export interface ICourseVersion {
  id: string;
  end_date: number;
  is_root: boolean;
  latest: boolean;
  mark_as_completed: boolean;
  name: string;
  org_id: string;
  pub_date: number;
  pub_reject_date: number;
  pub_root_date: number;
  pub_root_reject_date: number;
  start_date: number;
  status: TCourseStatus;
  version: number;
}

export interface ICourseOrganization extends Omit<IOrganization, 'user_id' | 'settings' | 'sub_domains'> {
  create_by: null;
}

export interface ICourseOwner {
  id: string;
  username: string;
  display_name: string;
  email: string;
  active: boolean;
  blocked: boolean;
  roles: [];
  avatar: string;
  headline: string;
}

export interface ICoursePriceSettings {
  course_id: string;
  is_pay: boolean;
  fiat_currency: string;
  fiat_price: string;
  fiat_discount_price: string;
  fiat_unit_cost: string;
  crypto_payment_enabled: boolean;
  crypto_currency: string;
  crypto_price: string;
  crypto_discount_price: string;
  crypto_unit_cost: string;
}

export interface ICoursePreviewVideo {
  title: string;
  content: string;
  video?: IFileResponse;
  order: number;
  content_type: string;
  file_id?: string;
}
