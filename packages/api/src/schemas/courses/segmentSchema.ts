import { z } from '@oe/api/utils/zod';
import { fileResponseScheme } from '#types/file';

const baseContentSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['video', 'pdf', 'text', 'embedded']),
  title: z.string(),
  note: z.string().optional(),
  free: z.boolean().optional(),
  order: z.number().optional(),
  status: z.string().optional(),
  duration: z.number().optional(),
});

export const textContentSchema = baseContentSchema.extend({
  type: z.literal('text'),
  content: z.string().min(1, { message: 'courses.formValidation.contentRequired' }),
});

export const videoContentSchema = baseContentSchema.extend({
  type: z.literal('video'),
  file_id: z.string().optional(),
  files: z
    .array(fileResponseScheme)
    .nullable()
    .default([])
    .transform(files => files || [])
    .refine(files => files.length > 0, {
      message: 'courses.formValidation.videoRequired',
    }),
});

export const pdfContentSchema = baseContentSchema.extend({
  type: z.literal('pdf'),
  file_id: z.string().optional(),
  files: z
    .array(fileResponseScheme)
    .nullable()
    .default([])
    .transform(files => files || [])
    .refine(files => files.length > 0, {
      message: 'courses.formValidation.pdfRequired',
    }),
});

export const embeddedContentSchema = baseContentSchema.extend({
  type: z.literal('embedded'),
  content: z.string().min(1, { message: 'courses.formValidation.embeddedRequired' }),
});

export const lessonContentSchema = z.discriminatedUnion('type', [
  textContentSchema,
  videoContentSchema,
  pdfContentSchema,
  embeddedContentSchema,
]);

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'courses.formValidation.lessonTitleRequired' }),
  note: z.string().optional(),
  order: z.number().optional(),
  free: z.boolean().optional(),
  status: z.string().optional().default('draft'),
  contents: z.array(lessonContentSchema),
  course_id: z.string().optional(),
  user_id: z.string().optional(),
});

export const segmentSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'courses.formValidation.sectionTitleRequired' }),
  note: z.string().optional(),
  order: z.number().optional(),
  free: z.boolean().optional(),
  status: z.string().optional().default('draft'),
  course_id: z.string().optional(),
  user_id: z.string().optional(),
  lessons: z.array(lessonSchema).nullable().optional(),
});

export const sectionSchema = segmentSchema.extend({
  lessons: z.array(lessonSchema).nullable().optional(),
});

// Interfaces matching the schemas
export type ILessonContentSchema = z.infer<typeof lessonContentSchema>;
export interface ILessonSchema extends z.infer<typeof lessonSchema> {}
export interface ISegmentSchema extends z.infer<typeof segmentSchema> {}
export interface ISectionSchema extends z.infer<typeof sectionSchema> {}
