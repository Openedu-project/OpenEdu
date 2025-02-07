import { z } from '#utils/zod';

export const rejectLaunchpadSchema = z.object({
  note: z.string().min(1, 'adminLaunchpadRequest.rejectModal.errors.isRequired'),
});

export const startFundingSchema = z.object({
  funding_start_date: z.date({ invalid_type_error: 'adminLaunchpadRequest.startFundingModal.errors.isValidDate' }),
});

export type IRejectLaunchpadSchemaType = z.infer<typeof rejectLaunchpadSchema>;

export type IStartFundingSchemaType = z.infer<typeof startFundingSchema>;
