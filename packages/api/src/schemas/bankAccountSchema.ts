import { z } from '#utils/zod';

export const bankAccountSchema = z.object({
  bank_name: z
    .string()
    .min(1, { message: 'bankAccountPage.form.errors.bankNameRequired' })
    .max(100, { message: 'bankAccountPage.form.errors.bankNameRequired' }),
  account_name: z
    .string()
    .min(1, { message: 'bankAccountPage.form.errors.accountNameRequired' })
    .max(100, { message: 'bankAccountPage.form.errors.accountNameRequired' }),
  account_number: z
    .string()
    .min(1, { message: 'bankAccountPage.form.errors.accountNumberRequired' })
    .regex(/^\d+$/, { message: 'bankAccountPage.form.errors.accountNumberRequired' })
    .min(5, { message: 'bankAccountPage.form.errors.accountNumberRequired' })
    .max(20, { message: 'bankAccountPage.form.errors.accountNumberRequired' }),
  id: z.string().optional(),
});

export type TBankAccountSchema = z.infer<typeof bankAccountSchema>;
