import { z } from '#utils/zod';

export const loginSchema = z.object({
  email: z.string().min(1).max(100).email({
    message: 'auth.signin.errors.emailInvalid',
  }),
  password: z
    .string()
    .min(8, {
      message: 'auth.signin.errors.passwordLength',
    })
    .max(100),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
