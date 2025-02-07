import { z } from '#utils/zod';

export const createBaseCourseSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'courses.formValidation.nameMin--minimum:5' })
    .max(100, { message: 'courses.formValidation.nameMax--maximum:100' }),
  description: z
    .string()
    .min(20, { message: 'courses.formValidation.descriptionMin--minimum:20' })
    .max(1000, { message: 'courses.formValidation.descriptionMax--maximum:1000' }),
});

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
