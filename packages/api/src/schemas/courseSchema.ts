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
