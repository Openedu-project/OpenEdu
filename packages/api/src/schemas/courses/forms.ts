import { z } from '#utils/zod';

export const courseTriggerConditionSchema = z.enum([
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

export const courseTriggerEntityTypeSchema = z.enum(['section', 'lesson', 'course']);

export const courseTriggerButtonSchema = z.object({
  type: z.string().optional(),
  text: z.string().default('Submit'),
  variant: z.string().default('primary'),
});

export const courseTriggerConfirmSchema = z.object({
  enabled: z.boolean().default(false),
  title: z.string().optional(),
  description: z.string().optional(),
  buttons: z.array(courseTriggerButtonSchema).nullable().optional(),
  auto_close_enabled: z.boolean().optional(),
  auto_close_after_seconds: z.number().optional().default(5),
  is_default: z.boolean().default(true),
  display_on_detail: z.boolean().default(false),
});

export const courseTriggerTypeSchema = z.enum(['form', 'notification']);

export const courseQuestionSettingsSchema = z.object({
  is_default: z.boolean(),
  required: z.boolean(),
  other_option_enabled: z.boolean(),
  base_domain: z.string(),
  validate_domain_enabled: z.boolean(),
  props: z.any().nullable(),
});

export const courseQuestionSchema = z.object({
  id: z.string(),
  create_at: z.number(),
  update_at: z.number(),
  delete_at: z.number(),
  uid: z.string(),
  parent_id: z.string().nullable(),
  form_id: z.string(),
  title: z.string(),
  description: z.string(),
  question_type: z.string(),
  order: z.number(),
  sub_questions: z.any().nullable(),
  options: z.any().nullable(),
  settings: courseQuestionSettingsSchema,
});

const courseFormSchema = z.object({
  id: z.string(),
  create_at: z.number(),
  update_at: z.number(),
  delete_at: z.number(),
  uid: z.string(),
  latest: z.boolean(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  event: z.string(),
  type: z.string(),
  status: z.string(),
  start_date: z.number(),
  end_date: z.number(),
  org_id: z.string(),
  creator_id: z.string(),
  questions: z.array(courseQuestionSchema),
  auth_required: z.boolean(),
  is_template: z.boolean(),
});

export const courseTriggerStartWhenSchema = z.object({
  type: courseTriggerConditionSchema,
  entity_id: z.string().min(1, { message: 'course.form.entityIdRequired' }),
  entity_type: courseTriggerEntityTypeSchema.optional(),
});

export const courseTriggerEndWhenSchema = z.object({
  type: courseTriggerConditionSchema,
  time: z.number(),
});

export const baseEntitySchema = z.object({
  id: z.string().optional(),
  create_at: z.number().optional(),
  update_at: z.number().optional(),
  delete_at: z.number().optional(),
});

export const courseFormTriggerSchema = baseEntitySchema
  .extend({
    enabled: z.boolean().default(true),
    type: courseTriggerTypeSchema,
    name: z.string().optional(),

    // Form related fields
    form_id: z.string().optional(),
    form_uid: z.string().optional(),
    form: courseFormSchema.optional(),

    // Entity relation fields
    related_entity_id: z.string().optional(),
    related_entity_uid: z.string().optional(),
    related_entity_type: z.string().optional(),

    // Organization fields
    org_id: z.string().optional(),
    org_schema: z.string().optional(),

    // Trigger conditions
    start_when: courseTriggerStartWhenSchema,
    end_when: courseTriggerEndWhenSchema.nullable().optional(),

    // UI settings
    confirmation_settings: courseTriggerConfirmSchema.nullable().optional(),

    add_date: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    // Form type validation
    if (data.type === 'form') {
      if (!data.form_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'course.form.formIdRequired',
          path: ['form_id'],
        });
      }
    }

    // Notification type validation
    if (data.type === 'notification') {
      if (!data.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'course.form.nameRequired',
          path: ['name'],
        });
      }
    }

    // Confirmation settings validation (common for both types)
    if (data.confirmation_settings?.enabled || data.type === 'notification') {
      if (!data.confirmation_settings?.title) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'course.form.confirmationTitleRequired',
          path: ['confirmation_settings.title'],
        });
      }

      if (!data.confirmation_settings?.description) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'course.form.confirmationDescriptionRequired',
          path: ['confirmation_settings.description'],
        });
      }

      if (
        data.confirmation_settings?.auto_close_enabled &&
        (data.confirmation_settings?.auto_close_after_seconds ?? 0) <= 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'course.form.confirmationAutoCloseRequired',
          path: ['confirmation_settings.auto_close_after_seconds'],
        });
      }
    }
  });

export interface ICourseForm extends z.infer<typeof courseFormSchema> {}
export interface ICourseFormTrigger extends z.infer<typeof courseFormTriggerSchema> {}
