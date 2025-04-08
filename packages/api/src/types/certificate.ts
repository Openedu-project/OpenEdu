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

export interface ICertificate extends ICertificateData {
  id: string;
  conditions?: ICertificateConditions;
  props: Styles;
  files: IFileResponse[];
  name?: string; //name of template
  date?: number;
  create_at: number;
  update_at: number;
  delete_at: number;
  type: string; // certificate_template | certificate_layer
  html: string;
  user_id: string;
  is_default: boolean;
  course_cuid: string;
  org_id: string;
  enable: boolean;
  enable_project?: boolean;
  root_layer: IFounder;
  org_layer?: IFounder;
  template: ICertificateTemplate;
  creator_name: string;
  // learner_name?: string;
  // issue_date?: number;
  // course_name: string;
  // organizations?: ICertificateOrganization[];
  // signatures?: ISignature[];
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

export interface ICertificateRequest extends Omit<Partial<ICertificate>, 'root_layer' | 'id' | 'org_layer' | 'files'> {
  // root_layer: {
  //   signature_name?: string;
  //   logo_id: string;
  //   signature_file_id?: string;
  //   position?: string;
  // };
  // org_layer: {
  //   signature_name?: string;
  //   logo_id: string;
  //   signature_file_id?: string;
  //   position?: string;
  // };
  // file_id: string;
  // template: CertificateTemplate;
}

export interface ICertificateUpdate extends Omit<ICertificate, 'type'> {}

export interface IReceiveCertificateRequest {
  file: {
    id: string;
  };
  image?: {
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

export interface IBaseStyles {
  x?: number;
  y?: number;
  right?: number;
  bottom?: number;
  width?: number;
  height?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ITextStyles extends IBaseStyles {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface ICertificateTextElement {
  id: string;
  type: 'text';
  content?: string;
  styles?: ITextStyles;
  visible?: boolean;
}

export interface ICertificateRichTextElement {
  id: string;
  type: 'rich-text';
  content?: string;
  styles?: IBaseStyles;
  visible?: boolean;
}

export interface ICertificateImageElement {
  id: string;
  type: 'image';
  file?: IFileResponse;
  styles?: IBaseStyles;
  visible?: boolean;
}

export interface ICertificateSignatureElement {
  id: string;
  type: 'signature';
  signature?: string | IFileResponse;
  signatureStyles?: ITextStyles & IBaseStyles;
  position?: string;
  positionStyles?: ITextStyles;
  lineStyles?: Pick<IBaseStyles, 'x' | 'y' | 'height'> & {
    backgroundColor?: string;
  };
  order?: number; // begin from 0
  visible?: boolean;
  styles?: IBaseStyles;
}

export interface ICertificateOrganizationElement {
  id: string;
  type: 'organization';
  file?: IFileResponse;
  logoStyles?: Omit<IBaseStyles, 'x' | 'y'>;
  name?: string;
  nameStyles?: Omit<ITextStyles, 'x' | 'y'>;
  order?: number; // begin from 0
  orientation?: 'horizontal' | 'vertical';
  showName?: boolean;
  visible?: boolean;
  styles?: IBaseStyles & { right?: number; align?: 'left' | 'center' | 'right' };
}

export type ICertificateElement =
  | ICertificateTextElement
  | ICertificateImageElement
  | ICertificateRichTextElement
  | ICertificateSignatureElement
  | ICertificateOrganizationElement;

export interface ICertificateFrame {
  id?: string;
  file?: IFileResponse;
  width?: number;
  height?: number;
  backgroundColor?: string;
  visible?: boolean;
}

export interface ICertificateTemplate {
  id?: string;
  name?: string;
  elements?: ICertificateElement[];
  frame?: ICertificateFrame;
}

export interface ISignature {
  id?: string;
  creator_name: string;
  signature?: IFileResponse;
  position: string;
}

export interface ICertificateOrganization {
  id?: string;
  name: string;
  logo: IFileResponse;
}

export interface ICertificateData {
  id?: string;
  learner_name: string;
  course_name?: string;
  issue_date: number;
  enable_project?: boolean;
  project_name?: string;
  organizations?: ICertificateOrganization[];
  signatures?: ISignature[];
}
