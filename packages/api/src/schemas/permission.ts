import { z } from '#utils/zod';

export const permissionActionConfigSchema = z.object({
  name: z.string({ message: 'permissionActionFormModal.errors.nameRequired' }),
  description: z.string().optional(),
});

export type IPermissionActionConfigSchema = z.infer<typeof permissionActionConfigSchema>;
