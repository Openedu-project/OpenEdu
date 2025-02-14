import { z } from '#utils/zod';

export const rejectLaunchpadSchema = z.object({
  note: z.string().min(1, 'adminLaunchpadRequest.rejectModal.errors.isRequired'),
});
export type IRejectLaunchpadSchemaType = z.infer<typeof rejectLaunchpadSchema>;

export const startFundingSchema = z.object({
  funding_start_date: z.date({
    invalid_type_error: 'adminLaunchpadRequest.startFundingModal.errors.isValidDate',
  }),
});
export type IStartFundingSchemaType = z.infer<typeof startFundingSchema>;

export const pledgeLaunchpadSchema = z.object({
  amount: z
    .string()
    .min(1, 'launchpadDetailPage.pledgePage.form.error.required')
    .transform(val => val.trim())
    .refine(val => !Number.isNaN(Number(val)), {
      message: 'launchpadDetailPage.pledgePage.form.error.invalidNumber',
    })
    .refine(val => Number(val) >= 5, {
      message: 'launchpadDetailPage.pledgePage.form.error.minAmount',
    }),
});

export type IPledgeLaunchpadSchema = z.infer<typeof pledgeLaunchpadSchema>;
