import type { IPagination } from './pagination';

export interface ICreatorAnswerItem {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  session_id: string;
  question_id: string;
  sub_question_id: null;
  answer_text: string;
  files: null;
  key: string;
}

export interface ICreatorAnswer {
  [key: string]: ICreatorAnswerItem;
}

export interface ICreatorRequest {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: null;
  form_id: string;
  status: string;
  answers: ICreatorAnswerItem[];
  note: string;
}

export interface ICreatorRequestResponse {
  results: ICreatorRequest[];
  pagination: IPagination;
}
