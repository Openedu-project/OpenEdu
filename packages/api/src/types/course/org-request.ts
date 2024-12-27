import type { IFileResponse } from '#types/file';
import type { TCourseAprrovalStatus } from './basic';
import type { IDiscussion } from './discuss';

export interface ICourseOrganizationRequestProps {
  is_admin_feedback: boolean;
  is_include_change: boolean;
  discussion: IDiscussion[];
  setting_id: string;
  setting_value?: string;
  admin_id?: string;
  pre_id?: string;
  pre_version?: number;
}
export interface ICourseOrganizationRequest {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  org_id: string;
  entity_type: string;
  entity_id: string;
  entity_version: number;
  entity_schema: string;
  requester_id: string;
  request_date: number;
  status: TCourseAprrovalStatus;
  type: string;
  note: string;
  props: ICourseOrganizationRequestProps;
  request_value: string;
  approve_value: string;
  files?: IFileResponse;
  request_uid: string;
  re_review: boolean;
  confirm_date: number; // new field
  confirm_by_id: string; //new field
}
