import { z } from '#utils/zod';

export const rejectCreatorSchema = z.object({
  note: z.string().min(5, {
    message: 'creatorManagement.rejectCreatorModal.errors.note',
  }),
});

export type IRejectCreatorSchemaType = z.infer<typeof rejectCreatorSchema>;
