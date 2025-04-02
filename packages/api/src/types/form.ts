import type { QUESTION_TYPE } from '@oe/core/utils/constants';
import type { IPagination } from './fetch';
export type TSort = 'create_at desc' | 'create_at asc' | '"order" asc';

type Timestamp = number;

export type TFormStatus = 'draft' | 'published_org' | 'published_all' | 'unpublished';
export type TFormEvent = 'register_course' | 'others' | 'contact_organization';
export type TFormType = 'page' | 'slide';
export type TQuestionType = keyof typeof QUESTION_TYPE;

export interface IBaseEntity {
  id: string;
  create_at?: Timestamp;
  update_at?: Timestamp;
  delete_at?: Timestamp;
}

export interface IFormOption {
  id: string;
  question_id?: string;
  text: string;
  order: number;
}

export interface IFormSettings {
  is_default?: boolean;
  required: boolean;
  validate_domain_enabled?: boolean;
  other_option_enabled: boolean;
  base_domain: string;
  key?: string;
  props?: Record<string, unknown>;
}

export interface IFormQuestion extends IBaseEntity {
  title: string;
  description?: string;
  question_type: TQuestionType;
  sub_questions?: IFormSubquestion[];
  order: number;
  options?: IFormOption[];
  settings?: IFormSettings; //maybe undefined
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  props?: Record<string, any>;
}

export interface IFormSubquestion extends IFormQuestion {
  parent_id?: string;
  form_id?: string;
  total_responses?: number;
}

export interface IFormAnswer {
  options?: string[];
  answer_text?: string;
  answer_file?: string[];
}

export interface IAnswerParams extends IFormAnswer {
  question_id: string;
  sub_question_id?: string;
}

export interface IRegisterOrgRequest {
  form_relation_id?: string;
  answers: IAnswerParams[];
}

export interface IFormResponse extends IBaseEntity {
  title: string;
  description: string;
  slug?: string;
  event: TFormEvent;
  type: TFormType;
  status?: TFormStatus;
  start_date?: Timestamp;
  end_date?: Timestamp;
  org_id?: string;
  creator_id?: string;
  questions: IFormQuestion[];
  course_id?: string;
  auth_required?: boolean;
  uid: string;
}

export interface IFormParams {
  id?: string;
  title: string;
  description: string;
  event: TFormEvent;
  type: TFormType;
  start_date?: Timestamp;
  end_date?: Timestamp;
  questions?: IQuestionParam[];
  is_template?: boolean;
}

export interface ISettingsFormParams extends IPagination {
  status_in?: TFormStatus[];
  org_id: string;
  sort?: TSort;
}

export interface IQuestionParam {
  title: string;
  description?: string;
  question_type: string;
  settings: IFormSettings;
  options?: IFormOption[] | null;
  sub_questions?: IFormSubquestion[] | null;
  props?: Record<string, unknown>;
}

export interface IValidateFormPayload {
  domain: string;
}

export interface IRejectFormPayload {
  note: string;
}

export type IRejectFormRegisterCreatorPayload = IRejectFormPayload;
export type IRejectFormRegisterCreatorRes = IRejectFormRegisterCreatorPayload;
export type IRejectFormRegisterOrgPayload = IRejectFormPayload;
export type IRejectFormRegisterOrgRes = IRejectFormPayload;

export type TQuestionTypeResponse = Omit<TQuestionType, 'heading' | 'space' | 'paragraph' | 'submitButton'>;
