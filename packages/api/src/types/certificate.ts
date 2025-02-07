import type { Style } from '@react-pdf/types';
import type { ICourse } from './course/course';
import type { IFileResponse } from './file';

export interface Styles {
  [key: string]: Style;
}
export interface IFounder {
  signature_name: string;
  logo: IFileResponse;
  signature?: IFileResponse;
  position?: string;
}

export interface ICertificateConditions {
  completed_course: boolean;
  completed_all_quiz: boolean;
  completed_final_quiz: boolean;
  course_completion_percentage: number;
  final_quiz_completion_percentage: number;
  completed_required_lesson?: boolean;
  required_lesson_uid?: string;
}

export interface ICertificate {
  id: string;
  conditions?: ICertificateConditions;
  props: Styles;
  files: IFileResponse[];
  name?: string; //name of template
  date?: number;
  learner_name?: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  type: string; // certificate_template | certificate_layer
  html: string;
  user_id: string;
  course_cuid: string;
  course_name: string;
  creator_name: string;
  org_id: string;
  enable: boolean;
  root_layer: IFounder;
  org_layer?: IFounder;
}

export interface ICertificateUser {
  id: string;
  completed_at?: number;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  course_id: string;
  org_id: string;
  org_schema: string;
  files: IFileResponse[];
  course_name: string;

  nft_network: string;
  nft_token_id: string;
  nft_tx_hash: string;
  mint_nft_enabled: boolean;
}

export interface IRequestSelectTemplate {
  certificate_layer_id: string;
}

export interface ICertificateRequest extends Omit<ICertificate, 'root_layer' | 'id' | 'org_layer' | 'files'> {
  root_layer: {
    signature_name?: string;
    logo_id: string;
    signature_file_id?: string;
    position?: string;
  };
  org_layer: {
    signature_name?: string;
    logo_id: string;
    signature_file_id?: string;
    position?: string;
  };
  file_id: string;
}

export interface ICertificateUpdate extends Omit<ICertificate, 'enable' | 'is_default' | 'type'> {}

export interface IReceiveCertificateRequest {
  file: {
    id: string;
  };
  image: {
    id: string;
  };
  course_cuid: string;
  completed_at: number;
}

interface ICertUser {
  id: string;
  username: string;
  display_name: string;
  avatar: string;
  total_points: number;
  completed_at: number;
}

export interface ICertificateDetail {
  id: string;
  user: ICertUser;
  course: ICourse;
  files: IFileResponse[];

  nft_network: string;
  nft_token_id: string;
  nft_tx_hash: string;
  mint_nft_enabled: boolean;
}
