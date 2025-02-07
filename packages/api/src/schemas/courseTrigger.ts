import { z } from '#utils/zod';

export const formTriggerConditionSchema = z.enum([
  // 'enrolled_course',
  // 'specific_time',
  // 'completed_course',
  // 'n_days_after_course_enrollment',
  'started_lesson',
  'completed_lesson',
  'completed_section',
  'clicked_on',
  // 'n_days_after_setting_trigger',
  // 'reach_num_submissions',
  // 'completed_quiz',
]);

export const formTriggerEntityTypeSchema = z.enum(['section', 'lesson']);

export const formTriggerConfirmSchema = z.object({
  enabled: z.boolean().default(false),
  title: z.string().min(1, 'The title at least one character'),
  description: z.string().optional(),
  buttons: z
    .array(
      z.object({
        type: z.string().optional(),
        text: z.string().default('Submit'),
        variant: z.string().default('primary'),
      })
    )
    .nullable(),
  auto_close_enabled: z.boolean().optional(),
  auto_close_after_seconds: z.number().optional().default(5),
  is_default: z.boolean().default(true),
  display_on_detail: z.boolean().default(false),
});

export const courseTriggerTypeSchema = z.enum(['form', 'notification']);

export const formTriggerResquestSchema = z.object({
  form_id: z.string().optional(),
  related_entity_id: z.string(),
  related_entity_type: z.string(),
  start_when: z.object({
    type: formTriggerConditionSchema,
    entity_id: z.string(),
    entity_type: formTriggerEntityTypeSchema.optional(),
  }),
  end_when: z
    .object({
      type: formTriggerConditionSchema,
      time: z.number(),
    })
    .optional(),
  confirmation_settings: formTriggerConfirmSchema.nullable().optional(),
  type: courseTriggerTypeSchema,
});

export type TFormTriggerConfirmationSettings = z.infer<typeof formTriggerConfirmSchema>;
export type FormTriggerEntityType = z.infer<typeof formTriggerEntityTypeSchema>;

export type CourseTriggerType = z.infer<typeof courseTriggerTypeSchema>;

export type CourseTrigger = z.infer<typeof formTriggerResquestSchema>;
