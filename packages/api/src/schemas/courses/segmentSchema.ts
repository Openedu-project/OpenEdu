import { z } from '@oe/api/utils/zod';
import { fileResponseScheme } from '#types/file';

export const lessonContentSchema = z.object({
  content: z.string(),
  type: z.enum(['video', 'pdf', 'text', 'quiz', 'embedded']),
  files: z.array(fileResponseScheme),
});

export const lessonSchema = z.object({
  title: z.string(),
  contents: z.array(lessonContentSchema).min(1, { message: 'Lesson must have at least one content' }).nullable(),
});

export const segmentSchema = z.object({
  title: z.string(),
  lessons: z.array(lessonSchema).nullable(),
});

export interface ILessonSchema extends z.infer<typeof lessonSchema> {}
