import type { IFileResponse } from './file';

export interface ICertificateUser {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  course_id: string;
  org_id: string;
  org_schema: string;
  files: IFileResponse[];
  course_name: string;
}
