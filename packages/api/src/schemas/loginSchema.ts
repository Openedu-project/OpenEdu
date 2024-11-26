import { z } from '#utils/zod';

export const loginSchema = z.object({
  email: z.string().min(1).max(100).email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long.',
    })
    .max(100),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
