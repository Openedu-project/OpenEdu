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
  description: z.string().refine(
    value => {
      // Strip HTML tags and count only text content
      const plainText = value.replace(/<[^>]*>/g, '');
      return plainText.length >= 20 && plainText.length <= 10000;
    },
    {
      message: 'course.validation.minMaxCourseDescription--min:20--max:10000',
    }
  ),
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

export const priceSettingsSchema = z
  .object({
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
  })
  .superRefine((val, ctx) => {
    if (!!val?.is_pay && Number(val.fiat_price) <= 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['fiat_price'],
        message: 'course.validation.finalPriceLargeZero',
      });
    }

    if (!!val?.is_pay && Number(val.fiat_discount_price) > Number(val.fiat_unit_cost)) {
      ctx.addIssue({
        code: 'custom',
        path: ['fiat_discount_price'],
        message: 'course.validation.discountPriceLessUnitCost',
      });
    }
  });

export const courseFormSchema = z.object({
  description: z.string().refine(
    value => {
      // Strip HTML tags and count only text content
      const plainText = value.replace(/<[^>]*>/g, '');
      return plainText.length >= 20 && plainText.length <= 10000;
    },
    {
      message: 'course.validation.minMaxCourseDescription--min:20--max:10000',
    }
  ),
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
  mark_as_completed: z.boolean().default(false).optional(),
});

export interface IPriceSettings extends z.infer<typeof priceSettingsSchema> {}

export interface ICreateCourse extends z.infer<typeof courseFormSchema> {}

export const courseOutlineSchema = z.object({
  learner_info: z.string().min(1, { message: 'course.validation.leanerInfo' }),
  content_info: z.string().min(1, { message: 'course.validation.contentInfo' }),
  material_file: fileResponseSchema.optional(),
  level_id: z.string().optional(),
  language: z.string(),
  duration_type: z.enum(['day', 'week']),
  duration: z.preprocess(
    Number,
    z.number().int('course.validation.duration').min(1, 'course.validation.durationMin--min:1')
  ),

  study_load: z.preprocess(
    Number,
    z
      .number()
      .int('course.validation.studyLoad')
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

export const courseCertificateSchema = z
  .object({
    has_certificate: z.boolean().default(false),
    // completed_all_quiz: z.boolean().default(false),
    // completed_course: z.boolean().default(false),
    // course_completion_percentage: z.number().default(0),
    // completed_final_quiz: z.boolean().default(false),
    // final_quiz_completion_percentage: z.number().default(0),
    // completed_required_lesson: z.boolean().default(false),
    // required_lesson_uid: z.string().default(''),
    props: z
      .object({
        certificate_condition: z
          .object({
            completed_all_quiz: z.boolean().default(false),
            completed_course: z.boolean().default(false),
            completed_final_quiz: z.boolean().default(false),
            course_completion_percentage: z.number().default(0),
            final_quiz_completion_percentage: z.number().default(0),
          })
          .nullable()
          .optional(),
        mint_cert_nft_settings: z
          .object({
            enabled: z.boolean().default(false),
            gas_fee_payer: z.string().default('creator'),
          })
          .nullable()
          .optional(),
      })
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

export type ICreateCourseCertificate = z.infer<typeof courseCertificateSchema>;
