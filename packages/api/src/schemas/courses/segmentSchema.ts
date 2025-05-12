import { fileResponseSchema } from '#types/file';
import { z } from '#utils/zod';
import { quizSchema } from './quizSchema';

export const validationMessages = {
  lesson: {
    title: 'course.validation.lessonTitle',
    content: 'course.validation.content.required',
    video: 'course.validation.content.videoRequired',
    pdf: 'course.validation.content.pdfRequired',
    embedded: 'course.validation.content.embeddedRequired',
    url: 'course.validation.invalidUrl',
  },
  section: {
    title: 'course.validation.sectionTitleRequired',
  },
};

const baseContentSchema = z.object({
  id: z.string().optional(),
  type: z
    .enum(['video', 'pdf', 'text', 'embedded', 'quiz'])
    .nullable()
    .default('video')
    .transform(val => val || 'video'),
  title: z.string(),
  note: z.string().optional(),
  free: z.boolean().optional(),
  order: z.number().optional(),
  status: z.string().optional(),
  duration: z.number().optional(),
  quizzes: z.array(quizSchema).nullable().optional(),
});

export const textContentSchema = baseContentSchema.extend({
  type: z.literal('text'),
  content: z.string().refine(
    value => {
      // Strip HTML tags and count only text content
      const plainText = value.replace(/<[^>]*>/g, '');
      return plainText.length > 0;
    },
    {
      message: validationMessages.lesson.content,
    }
  ),
});

export const videoContentSchema = baseContentSchema.extend({
  type: z.literal('video'),
  file_id: z.string().optional(),
  files: z
    .array(fileResponseSchema)
    .nullable()
    .default([])
    .transform(files => files || [])
    .refine(files => files.length > 0, {
      message: validationMessages.lesson.video,
    }),
});

export const pdfContentSchema = baseContentSchema.extend({
  type: z.literal('pdf'),
  file_id: z.string().optional(),
  files: z
    .array(fileResponseSchema)
    .nullable()
    .default([])
    .transform(files => files || [])
    .refine(files => files.length > 0, {
      message: validationMessages.lesson.pdf,
    }),
});

export const embeddedContentSchema = baseContentSchema.extend({
  type: z.literal('embedded'),
  content: z.string().min(1, { message: validationMessages.lesson.embedded }),
});

export const quizContentSchema = baseContentSchema.extend({
  type: z.literal('quiz'),
  quizzes: z.array(quizSchema),
});

export const lessonContentSchema = z.discriminatedUnion('type', [
  textContentSchema,
  videoContentSchema,
  pdfContentSchema,
  embeddedContentSchema,
  quizContentSchema,
]);

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: validationMessages.lesson.title }),
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
  title: z.string().min(1, { message: validationMessages.section.title }),
  note: z.string().optional(),
  order: z.number().optional(),
  free: z.boolean().optional(),
  status: z.string().optional().default('draft'),
  course_id: z.string().optional(),
  user_id: z.string().optional(),
  lessons: z.any().optional(),
});

export const sectionSchema = segmentSchema.extend({});

// Interfaces matching the schemas
export type ILessonContentSchema = z.infer<typeof lessonContentSchema>;
export interface ILessonSchema extends z.infer<typeof lessonSchema> {}
export interface ISegmentSchema extends z.infer<typeof segmentSchema> {}
export interface ISectionSchema extends z.infer<typeof sectionSchema> {}
export type TQuizContent = z.infer<typeof quizContentSchema>;
