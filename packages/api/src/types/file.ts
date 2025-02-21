import { z } from '../utils/zod';

export const fileResponseSchema = z.object({
  bunny_library_id: z.string().optional(),
  bunny_video_id: z.string().optional(),
  create_at: z.number(),
  delete_at: z.number(),
  duration: z.number(),
  ext: z.string(),
  height: z.number(),
  id: z.string(),
  mime: z.string(),
  name: z.string(),
  props: z.record(z.string(), z.unknown()),
  size: z.number(),
  thumbnail_url: z.string(),
  update_at: z.number(),
  url: z.string(),
  user_id: z.string().optional(),
  width: z.number(),
});

export type IFileResponse = z.infer<typeof fileResponseSchema>;

export interface IFilePayload {
  id: string;
}
