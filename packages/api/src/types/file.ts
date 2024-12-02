import { z } from '../utils/zod';

export const fileResponseScheme = z.object({
  name: z.string(),
  mime: z.string(),
  ext: z.string(),
  url: z.string(),
  thumbnail_url: z.string(),
  id: z.string(),
  create_at: z.number(),
  update_at: z.number(),
  delete_at: z.number(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  bunny_video_id: z.string().optional(),
  duration: z.number(),
  // status: z.literal('done'),
});

export type IFileResponse = z.infer<typeof fileResponseScheme>;
