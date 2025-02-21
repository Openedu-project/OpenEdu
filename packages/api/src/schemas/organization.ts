import { fileResponseSchema } from '#types/file';
import { z } from '#utils/zod';

export const createOrganizationSchema = z.object({
  email: z.string().email({ message: 'organizationsManagement.viewOrganizationModal.errors.emailInvalid' }),
  phone: z.string().optional(),
  name: z.string().min(2, { message: 'organizationsManagement.viewOrganizationModal.errors.companyInvalid' }).max(20),
  domain: z.string().min(3),
  thumbnail: fileResponseSchema.optional(),
});

export type ICreateOrganizationSchemaType = z.infer<typeof createOrganizationSchema>;
