import { PASSWORD_REGEX } from '@oe/core/utils/constants';
import { z } from '#utils/zod';

export const signUpSchema = z
  .object({
    display_name: z.string().min(6, {
      message: 'signUp.errors.usernameLength',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string().superRefine((val, ctx) => {
      if (val.length < 8 || !PASSWORD_REGEX.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'signUp.errors.passwordInvalid',
        });
      }
    }),
    confirmPassword: z.string().superRefine((val, ctx) => {
      if (val.length < 8 || !PASSWORD_REGEX.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'signUp.errors.passwordInvalid',
        });
      }
    }),
    isAgree: z.boolean().refine(val => val === true, {
      message: 'signUp.errors.agreeInvalid',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'signUp.errors.passwordMissMatch',
    path: ['confirmPassword'],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
