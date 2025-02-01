import { z } from '#utils/zod';

export const bankAccountSchema = z.object({
  id: z.string().optional(),
  bank_name: z.string().min(1, 'wallets.bankAccountPage.form.errors.bankNameRequired'),
  account_name: z.string().min(1, 'wallets.bankAccountPage.form.errors.accountNameRequired'),
  account_number: z
    .string()
    .min(5, 'wallets.bankAccountPage.form.errors.accountNumberRequired')
    .max(20, 'wallets.bankAccountPage.form.errors.accountNumberRequired'),
  is_default: z.boolean().optional(),
});

export type IBankAccountValue = z.infer<typeof bankAccountSchema>;
export interface IBankAccountPayload {
  id?: string;
  type: 'bank_account';
  enable: boolean;
  value: IBankAccountValue;
}
