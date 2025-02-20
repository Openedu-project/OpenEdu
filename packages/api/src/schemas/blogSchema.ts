import { fileResponseSchema } from '#types/file';
import { z } from '#utils/zod';

export const blogSchema = z.object({
  title: z.string().min(2, {
    message: 'blogForm.titleMessage',
  }),
  locale: z.string(),
  thumbnail: z.preprocess(
    val => (val === undefined || (Array.isArray(val) && val.length === 0) ? null : val),
    z
      .union([z.array(fileResponseSchema), fileResponseSchema])
      .nullable()
      .refine(data => data !== null, {
        message: 'blogForm.isRequiredThumbnail',
      })
  ),
  image_description: z.string().optional(),
  description: z.string().optional(),
  content: z.string().min(20, { message: 'blogForm.contentMessage' }),
  category_ids: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
  hashtag_names: z.array(z.string()).optional(),
  is_ai_generated: z.boolean(),
});

export type IBlogFormType = z.infer<typeof blogSchema>;
