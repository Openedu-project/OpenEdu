import { PASSWORD_REGEX } from '@oe/core/utils/constants';
import { z } from '#utils/zod';

export const setPaswordFormSchema = z
  .object({
    password: z.string().superRefine((val, ctx) => {
      if (val.length < 8 || !PASSWORD_REGEX.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'setPassword.errors.passwordInvalid',
        });
      }
    }),
    confirmPassword: z.string().superRefine((val, ctx) => {
      if (val.length < 8 || !PASSWORD_REGEX.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'setPassword.errors.passwordInvalid',
        });
      }
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'setPassword.errors.passwordMissMatch',
    path: ['confirmPassword'],
  });

export type SetPasswordSchemaType = z.infer<typeof setPaswordFormSchema>;
