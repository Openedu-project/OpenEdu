import { fileResponseScheme } from '#types/file';
import { CHAIN, CURRENCY_SYMBOLS } from '#utils/wallet';
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
  network: z.nativeEnum(CHAIN), // sử dụng TChain
  address: z
    .string()
    .min(1, { message: 'withdrawPage.form.errors.requiredAddress' })
    .transform(val => val.trim())
    .refine(val => val.length > 0, { message: 'withdrawPage.form.errors.invalidAddress' }),
  token: z.string(),
  amount: z
    .string()
    .min(1, { message: 'withdrawPage.form.errors.requiredAmount' })
    .transform(val => val.trim())
    .refine(val => !Number.isNaN(Number(val)), { message: 'withdrawPage.form.errors.invalidAmount' })
    .refine(val => Number(val) > 0, { message: 'withdrawPage.form.errors.positiveAmount' }),
  note: z
    .string()
    .optional()
    .transform(val => val?.trim() || undefined),
});

export type ICryptoWithdrawType = z.infer<typeof cryptoWithdrawSchema>;

export const fiatWithdrawSchema = z.object({
  fiatType: z.nativeEnum(CURRENCY_SYMBOLS), // sử dụng TCurrencySymbol
  bankAccount: z.string().min(1, { message: 'withdrawPage.form.errors.requiredBankAccount' }),
  amount: z
    .string()
    .min(1, { message: 'withdrawPage.form.errors.requiredAmount' })
    .transform(val => val.trim())
    .refine(val => !Number.isNaN(Number(val)), { message: 'withdrawPage.form.errors.invalidAmount' })
    .refine(val => Number(val) > 0, { message: 'withdrawPage.form.errors.positiveAmount' }),
  note: z
    .string()
    .optional()
    .transform(val => val?.trim() || undefined),
});

export type IFiatWithdrawType = z.infer<typeof fiatWithdrawSchema>;

export const rejectWithdrawSchema = z.object({
  value: z.string(),
  note: z.string().min(1, 'errors.isRequired'),
});

export type IRejectWithdrawType = z.infer<typeof rejectWithdrawSchema>;
