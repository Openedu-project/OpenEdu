import { fileResponseScheme } from '#types/file';
import { z } from '#utils/zod';

export const courseNameSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: 'courses.formValidation.courseName--minimum:5--maximum:100',
    })
    .max(100, {
      message: 'courses.formValidation.courseName--minimum:5--maximum:100',
    }),
});

export const createBaseCourseSchema = courseNameSchema.extend({
  description: z
    .string()
    .min(20, { message: 'courses.formValidation.courseDescription--minimum:20--maximum:1000' })
    .max(1000, { message: 'courses.formValidation.courseDescription--minimum:20--maximum:1000' }),
});
export interface ICourseNameSchema extends z.infer<typeof courseNameSchema> {}
export interface ICreateBaseCourse extends z.infer<typeof createBaseCourseSchema> {}

export const createYoutubeCourseSchema = z.object({
  playlist_link: z
    .string()
    .min(1, { message: 'courses.formValidation.playlistLink' })
    .url({ message: 'courses.formValidation.invalidPlaylistLink' }),
  language: z.string().min(1, { message: 'courses.formValidation.language' }),
  summary_included: z.boolean(),
  tone: z.string().optional(),
  quiz_included: z.boolean(),
  quiz_type: z.string().optional(),
  number_of_question: z.string().transform(Number).optional(),
  type: z.enum(['youtube_playlist', 'learner_description']),
});

export interface ICreateYoutubeCourse extends z.infer<typeof createYoutubeCourseSchema> {}

export const courseFormSchema = z.object({
  description: z
    .string()
    .min(20, {
      message: 'courses.formValidation.courseDescription--minimum:20--maximum:100',
    })
    .max(1000, {
      message: 'courses.formValidation.courseDescription--minimum:20--maximum:100',
    }),
  thumbnail: fileResponseScheme,
  levels: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .min(1, { message: 'courses.formValidation.levelMin' }),

  categories: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .min(1, { message: 'courses.formValidation.categoryMin' }),
  docs: z.array(fileResponseScheme).default([]).optional(),
  props: z.object({
    preview_lessons: z
      .array(
        z.object({
          title: z.string(),
          content: z.string().default(''),
          order: z.number().default(0),
          content_type: z.string().default('video'),
          file_id: z.string().optional(),
          video: fileResponseScheme.optional(),
        })
      )
      .default([])
      .optional(),
    support_channel: z
      .object({
        channels: z.string().array().default([]).optional(),
      })
      .optional(),
    achievements: z.string().array().default([]).optional(),
  }),
  medias: z.array(fileResponseScheme).optional(),
});

export interface ICreateCourse extends z.infer<typeof courseFormSchema> {}

export const courseOutlineSchema = z.object({
  learner_info: z.string().min(1, { message: 'courses.formValidation.leanerInfo' }),
  content_info: z.string().min(1, { message: 'courses.formValidation.contentInfo' }),
  material_file: fileResponseScheme.optional(),
  level_id: z.string().optional(),
  language: z.string(),
  duration_type: z.enum(['day', 'week']),
  duration: z.preprocess(Number, z.number().min(1, 'courses.formValidation.duration')),

  study_load: z.preprocess(
    Number,
    z.number().min(1, 'courses.formValidation.studyLoad').max(24, 'courses.formValidation.studyLoad')
  ),
});

export type ICreateAICourseOutline = z.infer<typeof courseOutlineSchema>;

export const courseInfomationSchema = z
  .object({
    title: z.string().min(1, 'courses.formValidation.title'),
    description: z.string().min(20, {
      message: 'courses.formValidation.courseDescription--minimum:20--maximum:100',
    }),
    thumbnail_included: z.boolean().default(false),
    thumbnail_id: z.string().optional().default(''),
  })
  .superRefine(({ thumbnail_included, thumbnail_id }, ctx) => {
    if (thumbnail_included && thumbnail_id?.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['thumbnail_id'],
        message: 'courses.formValidation.genThumbnail',
      });
    }
  });

export type ICreateAICourseInfo = z.infer<typeof courseInfomationSchema>;
