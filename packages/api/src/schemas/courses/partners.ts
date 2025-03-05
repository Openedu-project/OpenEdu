import { z } from '@oe/api/utils/zod';

export const partnerSchema = z.object({
  email: z.string().email(),
  role: z.array(z.enum(['mentor', 'co-creator', 'supervisor'])).min(1),
  enable: z.boolean().optional(),
});

export const addPartnerSchema = z.object({
  partners: z.array(partnerSchema).min(1),
});

export type IAddPartnerSchema = z.infer<typeof addPartnerSchema>;
export type IPartnerSchema = z.infer<typeof partnerSchema>;
