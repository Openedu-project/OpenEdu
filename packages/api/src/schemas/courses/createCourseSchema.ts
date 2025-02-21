import { fileResponseSchema } from '#types/file';
import { z } from '#utils/zod';

export const courseNameSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: 'course.validation.minMaxCourseName--min:5--max:100',
    })
    .max(100, {
      message: 'course.validation.minMaxCourseName--min:5--max:100',
    }),
});

export const createBaseCourseSchema = courseNameSchema.extend({
  description: z
    .string()
    .min(20, { message: 'course.validation.minMaxCourseDescription--min:20--max:1000' })
    .max(1000, { message: 'course.validation.minMaxCourseDescription--min:20--max:1000' }),
});
export interface ICourseNameSchema extends z.infer<typeof courseNameSchema> {}
export interface ICreateBaseCourse extends z.infer<typeof createBaseCourseSchema> {}

export const createYoutubeCourseSchema = z.object({
  playlist_link: z
    .string()
    .min(1, { message: 'course.validation.minPlaylistLink--min:1' })
    .url({ message: 'course.validation.invalidPlaylistLink' }),
  language: z.string().min(1, { message: 'course.validation.language' }),
  summary_included: z.boolean(),
  tone: z.string().optional(),
  quiz_included: z.boolean(),
  quiz_type: z.string().optional(),
  number_of_question: z.coerce.number().gte(1, { message: 'course.validation.questionNumber' }).optional(),
  type: z.enum(['youtube_playlist', 'learner_description']),
});

export interface ICreateYoutubeCourse extends z.infer<typeof createYoutubeCourseSchema> {}

export const priceSettingsSchema = z.object({
  is_pay: z.boolean().default(false),
  fiat_currency: z.string().default('VND'),
  fiat_price: z.string().default('0'),
  fiat_discount_price: z.string().default('0'),
  fiat_unit_cost: z.string().default('0'),
  crypto_payment_enabled: z.boolean().default(false),
  crypto_currency: z.string().default('USDT'),
  crypto_price: z.string().default('0'),
  crypto_discount_price: z.string().default('0'),
  crypto_unit_cost: z.string().default('0'),
});

export const courseFormSchema = z.object({
  description: z
    .string()
    .min(20, {
      message: 'course.validation.minMaxCourseDescription--min:20--max:1000',
    })
    .max(1000, {
      message: 'course.validation.minMaxCourseDescription--min:20--max:1000',
    }),
  thumbnail: z.union([z.array(fileResponseSchema), fileResponseSchema]).nullable(),
  levels: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .nullable()
    .default([])
    .optional(),

  categories: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .nullable()
    .default([])
    .optional(),
  docs: z.array(fileResponseSchema).nullable().default([]).optional(),
  props: z.object({
    preview_lessons: z
      .array(
        z.object({
          title: z.string(),
          content: z.string().default(''),
          order: z.number().default(0),
          content_type: z.string().default('video'),
          file_id: z.string().optional(),
          video: fileResponseSchema.optional(),
        })
      )
      .nullable()
      .default([])
      .optional(),
    support_channel: z
      .object({
        channels: z.string().array().nullable().default([]).optional(),
      })
      .nullable()
      .optional(),
    achievements: z.string().array().nullable().default([]).optional(),
  }),
  medias: z.array(fileResponseSchema).nullable().optional(),
  price_settings: priceSettingsSchema.optional(),
});

export interface IPriceSettings extends z.infer<typeof priceSettingsSchema> {}

export interface ICreateCourse extends z.infer<typeof courseFormSchema> {}

export const courseOutlineSchema = z.object({
  learner_info: z.string().min(1, { message: 'course.validation.leanerInfo' }),
  content_info: z.string().min(1, { message: 'course.validation.contentInfo' }),
  material_file: z.array(fileResponseSchema).nullable().default([]).optional(),
  level_id: z.string().optional(),
  language: z.string(),
  duration_type: z.enum(['day', 'week']),
  duration: z.preprocess(Number, z.number().min(1, 'course.validation.durationMin--min:1')),

  study_load: z.preprocess(
    Number,
    z
      .number()
      .min(1, 'course.validation.studyLoadMinMax--min:1--max:24--unit:hours')
      .max(24, 'course.validation.studyLoadMinMax--min:1--max:24--unit:hours')
  ),
});

export type ICreateAICourseOutline = z.infer<typeof courseOutlineSchema>;

export const courseInfomationSchema = z
  .object({
    title: z.string().min(1, 'course.validation.title'),
    description: z.string().min(20, {
      message: 'course.validation.minMaxCourseDescription--min:20--max:1000',
    }),
    thumbnail_included: z.boolean().default(false),
    thumbnail_id: z.string().optional().default(''),
  })
  .superRefine(({ thumbnail_included, thumbnail_id }, ctx) => {
    if (thumbnail_included && thumbnail_id?.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['thumbnail_id'],
        message: 'course.validation.genThumbnail',
      });
    }
  });

export type ICreateAICourseInfo = z.infer<typeof courseInfomationSchema>;
