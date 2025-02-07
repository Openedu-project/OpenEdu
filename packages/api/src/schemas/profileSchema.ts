import { PASSWORD_REGEX, USERNAME_REGEX } from '@oe/core/utils/constants';
import { z } from '#utils/zod';

export const editProfileFormSchema = z.object({
  display_name: z.string().min(3, 'userProfile.profileForm.errors.minDisplayName'),
  headline: z.string().optional(),
  about: z.string().optional(),
  props: z.array(z.string().optional()),
});

export const editAccountFormSchema = z.object({
  username: z
    .string()
    .min(4, 'userProfile.account.errors.usernameRequireAtLeast')
    .regex(USERNAME_REGEX, 'userProfile.account.errors.isValidUsername'),
  id: z.string(),
  email: z.string(),
  phone: z.string().optional(),
});

export const changePaswordFormSchema = z
  .object({
    old_password: z
      .string()
      .min(8, {
        message: 'userProfile.myPassword.errors.passwordLength',
      })
      .regex(PASSWORD_REGEX, {
        message: 'userProfile.myPassword.errors.passwordInvalid',
      }),
    new_password: z
      .string()
      .min(8, {
        message: 'userProfile.myPassword.errors.passwordLength',
      })
      .regex(PASSWORD_REGEX, {
        message: 'userProfile.myPassword.errors.passwordInvalid',
      }),
    confirmPassword: z.string().min(8, {
      message: 'userProfile.myPassword.errors.passwordLength',
    }),
  })
  .refine(data => data.new_password === data.confirmPassword, {
    message: 'userProfile.myPassword.errors.passwordMissMatch',
    path: ['confirmPassword'],
  });

export const privacyProfileFormSchema = z.object({
  user_ids: z.array(z.string()).min(1),
});

export type IEditProfileFormSchemaType = z.infer<typeof editProfileFormSchema>;
export type IEditAccountFormSchemaType = z.infer<typeof editAccountFormSchema>;
export type IChangePaswordFormSchemaType = z.infer<typeof changePaswordFormSchema>;
export type IPrivacyProfileFormSchemaType = z.infer<typeof privacyProfileFormSchema>;
