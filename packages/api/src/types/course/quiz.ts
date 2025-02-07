import type { IFilePayload } from '#types/file';

export type QuizType = 'single_choice' | 'multiple_choice';
export type QuizQuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'text'
  | 'matching'
  | 'ordering'
  | 'fill_in_blanks';
export type QuizRelationType = 'is' | 'triggered_by';
export type QuizPassCriteriaType = 'correct_answers' | 'percentage';
export type QuizzTimeLimitType = 'overall' | 'per_question';
export type TimeLimitType = 'per_question' | 'overall';
export type StreakBonusType = 'percentage';
export type RelatedEntityType = 'lesson_content';

export interface IQuizContent {
  id: number;
  content: IQuizQuestion;
}

export interface IQuizQuestion {
  create_at?: number;
  update_at?: number;
  delete_at?: number;
  quiz_id?: string;
  order?: number;
  id: string | null;
  title: string;
  description?: string;
  text?: string;
  type: QuizQuestionType;
  files?: IFilePayload[] | null;
  explanation: string;
  hasMedia?: boolean;
  points: number;
  items: IQuizAns[];
  correct_item_sets: IQuizAns[][];
  settings: IQuestionSettings;
}

export interface IQuestionSettings {
  time_limit: string;
}

export interface IQuizItemResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  uid: string;
  version: number;
  title: string;
  description: string;
  creator_id: string;
  files: null;
  settings: IQuizSettings;
  questions: IQuizQuestion[];
  related_entity_type: RelatedEntityType;
  related_entity_id: string;
  relation_type: QuizRelationType;
  trigger_conditions: ITriggerConditions;
}

export interface IQuizAns {
  id?: string;
  type?: string;
  text?: string;
  file_id?: string;
  order?: number;
  side?: number;
}

export interface IQuizPayload {
  id?: string;
  type: string;
  relation_type: QuizRelationType;
  trigger_conditions?: ITriggerConditions;
  title: string;
  description?: string;
  settings: IQuizSettings;
  questions: IQuizQuestion[];
  related_entity_type?: RelatedEntityType;
  related_entity_id?: string;
}

export interface ITriggerConditions {
  is_triggered_by_timestamp: boolean;
  timestamp?: string;
  is_trigger_by_reach_page_number: boolean;
  page_number?: number;
}

export interface IQuizSettings {
  show_correct_answers_enabled: boolean;
  shuffle_questions_enabled: boolean;
  shuffle_choices_enabled: boolean;
  time_limit_enabled: boolean;
  time_limit_type: TimeLimitType;
  time_limit: string;
  submission_limit_enabled: boolean;
  submission_limit?: number;
  pass_criteria: QuizPassCriteriaType;
  min_correct_answers_to_pass?: number;
  min_percentage_to_pass?: number;
  time_bonus_points_enabled: boolean;
  time_bonus_points_per_second?: number;
  streak_bonus_enabled: boolean;
  streak_bonus_type: StreakBonusType;
  streak_bonus_percentage_increment?: number;
  streak_bonus_max_percentage?: number;
  penalty_points_enabled: boolean;
  penalty_points_per_wrong_answer?: number;
}
