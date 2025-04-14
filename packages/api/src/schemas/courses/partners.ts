import { z } from '#utils/zod';

export const partnerSchema = z.object({
  email: z.string().email(),
  roles: z.array(z.enum(['mentor', 'co-creator', 'supervisor'])).min(1),
  enable: z.boolean().optional(),
});

export const addPartnerItemSchema = z.object({
  id: z.string(),
  roles: z.array(z.enum(['mentor', 'co-creator', 'supervisor'])).min(1),
  enable: z.boolean().optional(),
  email: z.string().optional(),
});

export const addPartnerSchema = z.object({
  partners: z.array(addPartnerItemSchema).min(1),
});

export type IAddPartnerSchema = z.infer<typeof addPartnerSchema>;
export type IPartnerSchema = z.infer<typeof partnerSchema>;
