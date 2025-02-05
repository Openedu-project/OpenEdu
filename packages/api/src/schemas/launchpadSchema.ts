import { z } from '#utils/zod';

export const rejectLaunchpadSchema = z.object({
  note: z.string().min(1, 'errors.isRequired'),
});

export type IRejectLaunchpadSchemaType = z.infer<typeof rejectLaunchpadSchema>;
