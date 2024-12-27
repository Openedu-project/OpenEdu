import { fileResponseScheme } from '#types/file';
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

export const rejectWithdrawSchema = z.object({
  value: z.string(),
  note: z.string().min(1, 'errors.isRequired'),
});

export type IRejectWithdrawType = z.infer<typeof rejectWithdrawSchema>;
