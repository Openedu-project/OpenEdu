import type { IQuizPayload } from './course/quiz';
import type { IFileResponse } from './file';

export type TQuestion = 'single_choice' | 'multiple_choice';
export type TQuizAnswer = 'choice_item';
export type TQuizSubmissionStatus = 'in-progress' | 'done';

export interface ILessonContentQuiz extends IQuizPayload {
  id: string;
  create_at: number;
}

export interface ICreateQuizSubmissionResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  quiz_id: string;
  user_id: string;
  status: number;
  passed: boolean;
  start_at: number;
  end_at: number;
  deadline_at: number;
  archived_points: number;
  num_questions: number;
}

export interface ICreateQuizSubmissionPayload {
  quiz_id: string;
  course_id: string;
}

export interface IQuizFile extends IFileResponse {}

export interface IQuizAnswer {
  id: string;
  type: TQuizAnswer;
  text: string;
  order: number;
  file_id: string;
  file: IQuizFile;
}

export interface IQuestion {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  quiz_id: string;
  title: string;
  description: string;
  text: string;
  files: IQuizFile[];
  type: TQuestion;
  items: IQuizAnswer[];
  explanation?: string;
  points: number;
  order: number;
  settings: {
    time_limit: string;
  };
}

export interface ICurrentQuestion {
  current_question_index: number;
  has_next_question: boolean;
  question: IQuestion;
  start_at: number;
}

export interface IAnswerItemSet {
  id: string;
  type?: string;
  text?: string;
  order?: number;
}

export interface ISubmitAnswerPayload {
  question_id: string;
  answered_item_sets: IAnswerItemSet[][];
}

export interface ISubmitAnswerResponse {
  message: string;
}

export interface IQuizSubmissionQuestions {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  quiz_id: string;
  title: string;
  description: string;
  text: string;
  files: null;
  type: TQuestion;
  items: IAnswerItemSet[];
  correct_item_sets: IAnswerItemSet[][];
  explanation: string;
  points: number;
  order: number;
  settings: {
    time_limit: string;
  };
}

export interface IQuizSubmissionAnswer {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  submission_id: string;
  quiz_id: string;
  user_id: string;
  question_id: string;
  order: number;
  answered_item_sets: IAnswerItemSet[][];
  start_at: number;
  end_at: number;
  correct: boolean;
  archived_points: number;
  questions: IQuizSubmissionQuestions | null;
}

export interface IQuizSubmissionResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  quiz_uid: string;
  quiz_id: string;
  user_id: string;
  status: TQuizSubmissionStatus;
  passed: true;
  start_at: number;
  end_at: number;
  deadline_at: number;
  time_to_complete_in_milli_seconds: number;
  archived_points: number;
  highest_points_on_single_question: number;
  highest_streak: number;
  answers: IQuizSubmissionAnswer[];
  num_questions: number;
  num_correct_answers: number;
}
