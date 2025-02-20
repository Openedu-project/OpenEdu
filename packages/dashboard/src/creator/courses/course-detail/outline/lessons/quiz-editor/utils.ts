import type {
  IQuizAns,
  IQuizPayload,
  IQuizQuestion,
  IQuizSettings,
  ITriggerConditions,
  QuizPassCriteriaType,
  QuizQuestionType,
  TimeLimitType,
} from '@oe/api/types/course/quiz';
import { uniqueID } from '@oe/core/utils/unique';

export const QUESTION_TYPES: { value: QuizQuestionType; label: string; id: string }[] = [
  { value: 'single_choice', label: 'types.singleChoice', id: 'single_choice' },
  { value: 'multiple_choice', label: 'types.multipleChoice', id: 'multiple_choice' },
];

export const TIME_LIMIT_TYPES: { value: TimeLimitType; label: string }[] = [
  { value: 'per_question', label: 'timeLimit.perQuestion' },
  { value: 'overall', label: 'timeLimit.overall' },
];

export const PASS_CRITERIA_TYPES: { value: QuizPassCriteriaType; label: string }[] = [
  { value: 'correct_answers', label: 'passCriteria.correctAnswers' },
  { value: 'percentage', label: 'passCriteria.percentage' },
];

export const DEFAULT_QUIZ_SETTINGS: IQuizSettings = {
  shuffle_questions_enabled: false,
  shuffle_choices_enabled: false,
  time_limit_enabled: false,
  time_limit_type: 'per_question',
  time_limit: '00:00:00',
  submission_limit_enabled: false,
  submission_limit: 0,
  pass_criteria: 'correct_answers',
  min_percentage_to_pass: 0,
  min_correct_answers_to_pass: 1,
  time_bonus_points_enabled: false,
  time_bonus_points_per_second: 0,
  streak_bonus_enabled: false,
  streak_bonus_type: 'percentage',
  streak_bonus_percentage_increment: 0,
  streak_bonus_max_percentage: 0,
  penalty_points_enabled: false,
  penalty_points_per_wrong_answer: 0,
  show_correct_answers_enabled: true,
};

export const DEFAULT_QUIZ_ANSWER: IQuizAns = {
  answer_id: `answer_${uniqueID()}`,
  text: '',
};

export const DEFAULT_QUIZ_QUESTION: IQuizQuestion = {
  id: null,
  question_id: `question_${uniqueID()}`,
  title: '',
  explanation: '',
  points: 0,
  type: 'single_choice',
  items: [],
  correct_item_sets: [],
  settings: {
    time_limit: '00:00:00',
  },
};

export const DEFAULT_QUIZ_TRIGGER_CONDITIONS: ITriggerConditions = {
  is_triggered_by_timestamp: false,
  timestamp: '',
  is_trigger_by_reach_page_number: false,
  page_number: 0,
  show_at_percentage: 0,
};

export const createQuizWithDefaultValues = (quiz?: IQuizPayload, lessonId?: string) => {
  return {
    id: quiz?.id,
    type: quiz?.type,
    relation_type: quiz?.relation_type ?? 'is',
    trigger_conditions: {
      ...DEFAULT_QUIZ_TRIGGER_CONDITIONS,
      ...quiz?.trigger_conditions,
    },
    title: quiz?.title ?? '',
    description: quiz?.description,
    settings: {
      ...DEFAULT_QUIZ_SETTINGS,
      ...quiz?.settings,
    },
    questions: quiz?.questions ?? [],
    related_entity_type: quiz?.related_entity_type ?? 'lesson_content',
    related_entity_id: quiz?.related_entity_id ?? lessonId,
  };
};
