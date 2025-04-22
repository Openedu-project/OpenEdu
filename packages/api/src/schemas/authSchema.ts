import { PASSWORD_REGEX } from '@oe/core';
import { z } from '#utils/zod';

export const displayNameSchema = z
  .string()
  .min(6, {
    message: 'formValidation.too_small.string.inclusive--type:display_name--minimum:6',
  })
  .max(100, {
    message: 'formValidation.too_big.string.inclusive--type:display_name--maximum:100',
  });

export const emailSchema = z
  .string()
  .min(1, {
    message: 'formValidation.too_small.string.inclusive--type:email--minimum:1',
  })
  .max(100, {
    message: 'formValidation.too_big.string.inclusive--type:email--maximum:100',
  })
  .email({
    message: 'formValidation.invalid_string.email',
  });

export const passwordSchema = z
  .string()
  .min(8, {
    message: 'themePage.auth.errors.passwordInvalid--minimum:8--maximum:20',
  })
  .max(20, {
    message: 'themePage.auth.errors.passwordInvalid--minimum:8--maximum:20',
  })
  .refine(val => PASSWORD_REGEX.test(val), {
    message: 'themePage.auth.errors.passwordInvalid--minimum:8--maximum:20',
  });

export const passwordConfirmSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    display_name: displayNameSchema,
    email: emailSchema,
    isAgree: z.boolean(),
    ref_code: z.string().optional(),
  })
  .merge(passwordConfirmSchema)
  .refine(data => data.password === data.confirmPassword, {
    message: 'themePage.auth.errors.passwordMissMatch',
    path: ['confirmPassword'],
  });

export const setPasswordSchema = passwordConfirmSchema.refine(data => data.password === data.confirmPassword, {
  message: 'themePage.auth.errors.passwordMissMatch',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type SignUpSchemaType = z.infer<typeof signUpSchema> & { next_path?: string };
export type LoginSchemaType = z.infer<typeof loginSchema> & { next_path?: string };
export type SetPasswordSchemaType = z.infer<typeof setPasswordSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
