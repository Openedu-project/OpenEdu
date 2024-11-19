import { z } from '#utils/zod';

export const forgotPasswordSchema = z.object({
  email: z.string().min(1).max(100).email({
    message: 'Please enter a valid email address.',
  }),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
