import { z } from '#utils/zod';

export const createCreatorSchema = z.object({
  email: z.string().email({ message: 'creatorManagement.createCreatorModal.errors.invalidEmail' }),
  display_name: z.string().min(3, 'creatorManagement.createCreatorModal.errors.minDisplayName'),
  phone: z.string().min(10, 'creatorManagement.createCreatorModal.errors.invalidPhone'),
});

export type ICreateCreatorSchemaType = z.infer<typeof createCreatorSchema>;

export const inviteCreatorSchema = z.object({
  creator_emails: z
    .array(z.string().email({ message: 'creatorManagement.inviteCreator.errors.invalidEmail' }))
    .min(1, 'creatorManagement.inviteCreator.errors.isRequiredEmail'),
});

export type IInviteCreatorSchemaType = z.infer<typeof inviteCreatorSchema>;

export const rejectCreatorSchema = z.object({
  note: z.string().min(5, {
    message: 'creatorManagement.rejectCreatorModal.errors.note',
  }),
});

export type IRejectCreatorSchemaType = z.infer<typeof rejectCreatorSchema>;
