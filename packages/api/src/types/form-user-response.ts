import type { IFileResponse } from './file';
import type { TQuestionType } from './form';
import type { IUser } from './user';
export interface IFormUserResponseAnswerItem {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  session_id: string;
  form_id: string;
  question_id: string;
  question_uid: string;
  sub_question_id: null;
  answer_text: string;
  files?: IFileResponse[];
  key: string;
  question_type: TQuestionType;
  // New field
  option_id?: string;
  option_uid?: string; // Get value by uid
  option_text?: string;
}

export interface IFormUserResponseAnswer {
  [key: string]: IFormUserResponseAnswerItem;
}

export interface IFormUserResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: null;
  form_id: string;
  form_uid: string;
  form_relation_id: string;
  status: string; // reviewing approved rejected
  answers: IFormUserResponseAnswer | IFormUserResponseAnswerItem[];
  note: string;
  user?: IUser;
}

export interface IQuestionSummaries {
  question_uid: string;
  title: string;
  description: string;
  type: string;
  total_count: number;
}

export interface IFormSummary {
  total_responses: number;
  question_summaries: IQuestionSummaries[];
}

export interface IFormUserResponseAnswerStatsItem {
  question_uid: string;
  sub_question_uid: string;
  option_uid: string;
  file_ids: string;
  text: string;
  count: number;
  create_at: number;
  update_at: number;
}
