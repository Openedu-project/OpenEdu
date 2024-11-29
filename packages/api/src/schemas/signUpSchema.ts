import { PASSWORD_REGEX } from '@oe/core/utils/constants';
import { z } from '#utils/zod';

export const signUpSchema = z
  .object({
    display_name: z.string().min(6, {
      message: 'auth.signup.errors.usernameLength',
    }),
    email: z.string().email({
      message: 'auth.signup.errors.emailInvalid',
    }),
    password: z.string().superRefine((val, ctx) => {
      if (val.length < 8 || !PASSWORD_REGEX.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'auth.signup.errors.passwordInvalid',
        });
      }
    }),
    confirmPassword: z.string().superRefine((val, ctx) => {
      if (val.length < 8 || !PASSWORD_REGEX.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'auth.signup.errors.passwordInvalid',
        });
      }
    }),
    isAgree: z.boolean().refine(val => val === true, {
      message: 'auth.signup.errors.agreeInvalid',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'auth.signup.errors.passwordMissMatch',
    path: ['confirmPassword'],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
