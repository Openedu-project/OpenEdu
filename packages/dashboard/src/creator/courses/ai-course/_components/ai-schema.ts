import { fileResponseScheme } from '@oe/api/types/file';
import { z } from '@oe/api/utils/zod';

export const courseOutlineSchema = z.object({
  learner_info: z.string(),
  content_info: z.string(),
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

export type IAICourseOutlineForm = z.infer<typeof courseOutlineSchema>;
