import { z } from '#utils/zod';

export const loginSchema = z.object({
  email: z.string().min(1).max(100).email(),
  password: z.string().min(6).max(100),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
