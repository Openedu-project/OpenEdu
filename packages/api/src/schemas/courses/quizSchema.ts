import { fileResponseSchema } from '#types/file';
import { z } from '#utils/zod';

export const quizValidationMessages = {
  title: 'course.validation.quiz.titleRequired',
  question: {
    points: 'course.validation.quiz.pointsMin',
    items: 'course.validation.quiz.itemsMin',
    questionTitle: 'course.validation.quiz.questionTitleRequired',
    correctAnswer: 'course.validation.quiz.correctAnswerRequired',
    questionRequired: 'course.validation.quiz.questionRequired',
  },
};

const quizQuestionTypeEnum = z.enum([
  'single_choice',
  'multiple_choice',
  'text',
  'matching',
  'ordering',
  'fill_in_blanks',
]);

const quizRelationTypeEnum = z.enum(['is', 'triggered_by']);
const quizPassCriteriaTypeEnum = z.enum(['correct_answers', 'percentage']);
const timeLimitTypeEnum = z.enum(['per_question', 'overall']);
const streakBonusTypeEnum = z.enum(['percentage']);
const relatedEntityTypeEnum = z.enum(['lesson_content']);

// Schema cho quiz answer
const quizAnswerSchema = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  text: z.string().optional(),
  file_id: z.string().optional(),
  order: z.number().optional(),
  side: z.number().optional(),
});

// Schema cho question settings
const questionSettingsSchema = z.object({
  time_limit: z.string(),
});

// Schema cho quiz question
export const quizQuestionSchema = z.object({
  id: z.string().nullable(),
  question_id: z.string().nullable().optional(),
  title: z.string().min(1, quizValidationMessages.question.questionTitle),
  description: z.string().optional(),
  text: z.string().optional(),
  type: quizQuestionTypeEnum,
  files: z.array(fileResponseSchema).nullable().optional(),
  explanation: z.string(),
  hasMedia: z.boolean().optional(),
  points: z.number().min(0, quizValidationMessages.question.points),
  items: z.array(quizAnswerSchema).min(1, quizValidationMessages.question.items),
  correct_item_sets: z
    .array(z.array(quizAnswerSchema).min(1, quizValidationMessages.question.correctAnswer))
    .min(1, quizValidationMessages.question.correctAnswer),
  settings: questionSettingsSchema,
});

// Schema cho quiz settings
const quizSettingsSchema = z.object({
  show_correct_answers_enabled: z.boolean(),
  shuffle_questions_enabled: z.boolean(),
  shuffle_choices_enabled: z.boolean(),
  time_limit_enabled: z.boolean(),
  time_limit_type: timeLimitTypeEnum,
  time_limit: z.string(),
  submission_limit_enabled: z.boolean(),
  submission_limit: z.number().optional(),
  pass_criteria: quizPassCriteriaTypeEnum,
  min_correct_answers_to_pass: z.number().optional(),
  min_percentage_to_pass: z.number().optional(),
  time_bonus_points_enabled: z.boolean(),
  time_bonus_points_per_second: z.number().optional(),
  streak_bonus_enabled: z.boolean(),
  streak_bonus_type: streakBonusTypeEnum,
  streak_bonus_percentage_increment: z.number().optional(),
  streak_bonus_max_percentage: z.number().optional(),
  penalty_points_enabled: z.boolean(),
  penalty_points_per_wrong_answer: z.number().optional(),
});

// Schema cho trigger conditions
const triggerConditionsSchema = z.object({
  is_triggered_by_timestamp: z.boolean(),
  timestamp: z.string().optional(),
  is_trigger_by_reach_page_number: z.boolean(),
  page_number: z.number().optional(),
  show_at_percentage: z.number().optional(),
});

// Schema chính cho quiz
export const quizSchema = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  relation_type: quizRelationTypeEnum,
  trigger_conditions: triggerConditionsSchema.optional(),
  title: z.string().min(1, quizValidationMessages.title),
  description: z.string().optional(),
  settings: quizSettingsSchema,
  questions: z.array(quizQuestionSchema).min(1, quizValidationMessages.question.questionRequired).nullable(),
  related_entity_type: relatedEntityTypeEnum.optional(),
  related_entity_id: z.string().optional(),
});

export type TQuizAnswer = z.infer<typeof quizAnswerSchema>;
export type TQuestionSettings = z.infer<typeof questionSettingsSchema>;
export type TQuizQuestion = z.infer<typeof quizQuestionSchema>;
export type TQuizSettings = z.infer<typeof quizSettingsSchema>;
export type TTriggerConditions = z.infer<typeof triggerConditionsSchema>;
export type TQuiz = z.infer<typeof quizSchema>;

// Các type enums từ schema
export type TQuizQuestionType = z.infer<typeof quizQuestionTypeEnum>;
export type TQuizRelationType = z.infer<typeof quizRelationTypeEnum>;
export type TQuizPassCriteriaType = z.infer<typeof quizPassCriteriaTypeEnum>;
export type TTimeLimitType = z.infer<typeof timeLimitTypeEnum>;
export type TStreakBonusType = z.infer<typeof streakBonusTypeEnum>;
export type TRelatedEntityType = z.infer<typeof relatedEntityTypeEnum>;
