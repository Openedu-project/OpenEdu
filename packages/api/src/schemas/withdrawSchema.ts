import { fileResponseScheme } from '#types/file';
import { CRYPTO_CURRENCIES, FIAT_CURRENCIES } from '#utils/wallet';
import { z } from '#utils/zod';

export const approveWithdrawSchema = z.object({
  value: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val => (val === '' ? undefined : val))
    .refine(val => val === undefined || !Number.isNaN(Number(val)), { message: 'errors.isValidNumber' }),
  files: z.array(fileResponseScheme.optional()).min(1, 'errors.requiredAtLeastOneFile'),
  note: z.string().optional(),
});

export type IApproveWithdrawType = z.infer<typeof approveWithdrawSchema>;

export const cryptoWithdrawSchema = z.object({
  withdraw_type: z.literal('crypto').optional(),
  network: z.enum(Object.keys(CRYPTO_CURRENCIES) as [string, ...string[]]),
  to_address: z.string().min(1, { message: 'wallets.withdrawPage.form.errors.requiredAddress' }),
  token: z.string().min(1, { message: 'wallets.withdrawPage.form.errors.requiredToken' }),
  amount: z
    .string()
    .min(1, { message: 'wallets.withdrawPage.form.errors.requiredAmount' })
    .transform(val => val.trim()),
  note: z
    .string()
    .optional()
    .transform(val => val?.trim() || undefined),
  is_mainnet: z.boolean().optional(),
  currency: z.enum(Object.keys(CRYPTO_CURRENCIES) as [string, ...string[]]).optional(),
});

export type ICryptoWithdrawPayload = z.infer<typeof cryptoWithdrawSchema>;

export const fiatWithdrawSchema = z
  .object({
    currency: z.enum(Object.keys(FIAT_CURRENCIES) as [string, ...string[]]),
    bank_account_id: z.string().min(1, { message: 'wallets.withdrawPage.form.errors.requiredBankAccount' }),
    amount: z
      .string({ required_error: 'wallets.withdrawPage.form.errors.requiredAmount' })
      .min(1, { message: 'wallets.withdrawPage.form.errors.requiredAmount' })
      .transform(val => val.trim())
      .refine(val => val.length > 0, { message: 'wallets.withdrawPage.form.errors.invalidAmount' }),
    note: z
      .string()
      .optional()
      .transform(val => val?.trim() || undefined),
  })
  .superRefine((data, ctx: z.RefinementCtx & { contextualData?: { availableBalance: number } }) => {
    const amount = Number(data.amount);
    const availableBalance = Number(ctx?.contextualData?.availableBalance ?? 0);
    if (Number.isNaN(amount) || amount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'wallets.withdrawPage.form.errors.positiveAmount',
        path: ['amount'],
      });
      return;
    }

    if (amount > availableBalance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'wallets.withdrawPage.form.errors.amountExceedsBalance',
        path: ['amount'],
      });
      return;
    }
  });

export type IFiatWithdrawPayload = z.infer<typeof fiatWithdrawSchema>;

export const rejectWithdrawSchema = z.object({
  value: z.string(),
  note: z.string().min(1, 'errors.isRequired'),
});

export type IRejectWithdrawType = z.infer<typeof rejectWithdrawSchema>;
