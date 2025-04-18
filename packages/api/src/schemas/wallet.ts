import { z } from '#utils/zod';

export const bankAccountSchema = z.object({
  bank_name: z
    .string()
    .min(1, {
      message: 'wallets.bankAccountPage.form.errors.bankName.required',
    })
    .max(100, {
      message: 'wallets.bankAccountPage.form.errors.bankName.invalid',
    }),
  account_name: z
    .string()
    .min(1, {
      message: 'wallets.bankAccountPage.form.errors.accountName.required',
    })
    .max(100, {
      message: 'wallets.bankAccountPage.form.errors.accountName.invalid',
    }),
  account_number: z
    .string()
    .min(1, {
      message: 'wallets.bankAccountPage.form.errors.accountNumber.required',
    })
    .regex(/^\d+$/, {
      message: 'wallets.bankAccountPage.form.errors.accountNumber.pattern',
    })
    .min(5, {
      message: 'wallets.bankAccountPage.form.errors.accountNumber.invalid',
    })
    .max(20, {
      message: 'wallets.bankAccountPage.form.errors.accountNumber.invalid',
    }),
  id: z.string().optional(),
});

export type IBankAccountValue = z.infer<typeof bankAccountSchema>;
export interface IBankAccountPayload {
  id?: string;
  type: 'bank_account';
  enable: boolean;
  value: IBankAccountValue;
}
