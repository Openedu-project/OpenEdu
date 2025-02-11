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
  content: z.string().min(10, { message: 'Nội dung văn bản là bắt buộc' }),
  // files: z.array(fileResponseScheme).optional(),
});

export const videoContentSchema = baseContentSchema.extend({
  type: z.literal('video'),
  file_id: z.string().optional(),
  files: z
    .array(fileResponseScheme)
    .nullable() // Cho phép giá trị null
    .default([]) // Giá trị mặc định là mảng rỗng
    .transform(files => files || []) // Transform null thành mảng rỗng
    .refine(files => files.length > 0, {
      message: 'Bài học phải có ít nhất một video',
    }),
  // content: z.string().optional(),
});

export const pdfContentSchema = baseContentSchema.extend({
  type: z.literal('pdf'),
  file_id: z.string().optional(),
  files: z
    .array(fileResponseScheme)
    .nullable() // Cho phép giá trị null
    .default([]) // Giá trị mặc định là mảng rỗng
    .transform(files => files || []) // Transform null thành mảng rỗng
    .refine(files => files.length > 0, {
      message: 'Bài học phải có ít nhất một video',
    }), // content: z.string().optional(),
});

export const embeddedContentSchema = baseContentSchema.extend({
  type: z.literal('embedded'),
  content: z.string().min(1, { message: 'Nội dung nhúng là bắt buộc' }),
});

export const lessonContentSchema = z.discriminatedUnion('type', [
  textContentSchema,
  videoContentSchema,
  pdfContentSchema,
  embeddedContentSchema,
]);

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Tiêu đề bài học là bắt buộc' }),
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
  title: z.string().min(1, { message: 'Tiêu đề chương là bắt buộc' }),
  note: z.string().optional(),
  order: z.number().optional(),
  free: z.boolean().optional(),
  status: z.string().optional().default('draft'),
  course_id: z.string().optional(),
  user_id: z.string().optional(),
  lessons: z.array(lessonSchema).nullable().optional(),
});

export const segmentsSchema = z.array(segmentSchema).min(1, { message: 'Khóa học phải có ít nhất một chương' });

export const sectionSchema = segmentSchema.extend({
  lessons: z.array(lessonSchema).nullable().optional(),
});

// Interfaces matching the schemas
export type ILessonContentSchema = z.infer<typeof lessonContentSchema>;
export interface ILessonSchema extends z.infer<typeof lessonSchema> {}
export interface ISegmentSchema extends z.infer<typeof segmentSchema> {}
export interface ISegmentsSchema extends z.infer<typeof segmentsSchema> {}
export interface ISectionSchema extends z.infer<typeof sectionSchema> {}
