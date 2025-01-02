import type { IFileResponse } from './file';
import type { IOrganization } from './organizations';
import type { IDataPagination } from './pagination';
import type { IUserProfile } from './user';

export interface IApproval<T, R> {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  org_id: string;
  org: IOrganization;
  entity_type: string;
  entity_id: string;
  // entity: ICourse;
  files?: IFileResponse[];
  entity: T;
  props: R;
  entity_schema: string;
  requester_id: string;
  requester: IUserProfile;
  request_date: number;
  request_value?: string;
  confirm_id_by?: string;
  confirm_by?: IUserProfile;
  confirm_date?: number;
  status: string;
  type: string;
  note: string;
}

export interface IListApproval<T, R> extends IDataPagination<IApproval<T, R>[]> {}

export interface IApprovalPayload {
  note: string;
  amount?: number;
  value?: string;
  files?: IFileResponse | IFileResponse[];
}
export type IApprovalRes = IApprovalPayload;

export interface IRejectPayload extends Pick<IApprovalPayload, 'note'> {}

export type IRejectRes = IApprovalRes;

export interface IFeedbackPayload {
  content: string;
}
