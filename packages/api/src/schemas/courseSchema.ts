import { z } from '#utils/zod';

export const courseSchema = z.object({
  id: z.string(),
  create_at: z.number(),
  update_at: z.number(),
  delete_at: z.number(),
  cuid: z.string(),
  version: z.number(),
  name: z.string(),
  description: z.string(),
  learn_method: z.string(),
  user_id: z.string(),
  is_pay: z.boolean(),
  is_enrolled: z.boolean(),
  is_paid: z.boolean(),
  price: z.number(),
  discount_price: z.number(),
  currency: z.string(),
  section_count: z.number(),
  lesson_count: z.number(),
  active_lesson: z.number(),
  medias: z.array(z.string()).nullable(),

  learner_count: z.number(),
  rating: z.number(),
  slug: z.string(),
  pub_date: z.number(),
  pub_root_date: z.number(),
  pub_reject_date: z.number(),
  pub_root_reject_date: z.number(),
  latest: z.boolean(),
  enable: z.boolean(),
  start_date: z.number(), // default = 0
  end_date: z.number(), // similar with start_date
  docs: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'Doc ID is required' }),
      })
    )
    .default([]),
});

export type ICourseType = z.infer<typeof courseSchema>;

export const baseSegmentSchema = z.object({
  uid: z.string().optional(),
  org_id: z.string().optional(),
  course_id: z.string().optional(),
  user_id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  note: z.string().optional(),
  order: z.number().optional(),
  free: z.boolean().optional(),
  status: z.string().optional(),
  parent_id: z.string().optional(),
  section_id_v2: z.string().optional(),
  lesson_id_v2: z.string().optional(),
  lesson_count: z.number().optional(),
  active_lesson: z.number().optional(),
  user: z.null().optional(),
  course: z.null().optional(),
  section: z.null().optional(),
  contents: z.null().optional(),
  is_certificate_condition: z.boolean().optional(),
  id: z.string().optional(),
  create_at: z.number().optional(),
  update_at: z.number().optional(),
  delete_at: z.number().optional(),
  count_text_lesson: z.number().optional(),
  count_video_lesson: z.number().optional(),
  count_pdf_lesson: z.number().optional(),
  count_pp_lesson: z.number().optional(),
  count_doc_lesson: z.number().optional(),
  count_quiz_lesson: z.number().optional(),
  count_embed_lesson: z.number().optional(),
  count_active_text_lesson: z.number().optional(),
  count_active_video_lesson: z.number().optional(),
  count_active_pdf_lesson: z.number().optional(),
  count_active_pp_lesson: z.number().optional(),
  count_active_doc_lesson: z.number().optional(),
  count_active_quiz_lesson: z.number().optional(),
  count_active_embed_lesson: z.number().optional(),
});

// Lesson Schema
export const lessonSchema = baseSegmentSchema.extend({
  lessons: z.null().optional(),
});

// Course Schema
export const sectionSchema = baseSegmentSchema.extend({
  lessons: z.array(lessonSchema).optional(),
});

// Inferred TypeScript types
export type ILesson = z.infer<typeof lessonSchema>;
export type ISection = z.infer<typeof sectionSchema>;
