import { isAfter } from 'date-fns';
import { z } from '#utils/zod';

export const createAffiliateCampaignSchema = z
  .object({
    name: z.string().min(1, 'affiliateCampaignFormModal.errors.isRequired'),
    start_date: z.date({
      required_error: 'affiliateCampaignFormModal.errors.isRequiredStartDate',
      invalid_type_error: 'affiliateCampaignFormModal.errors.isValidStartDate',
    }),
    has_end_date: z.boolean(),
    end_date: z
      .date({
        invalid_type_error: 'affiliateCampaignFormModal.errors.isValidEndDate',
      })
      .optional(),
    enable: z.boolean(),
  })
  .refine(
    data => {
      if (!data.has_end_date) {
        return true;
      }
      return data.end_date && isAfter(data.end_date, data.start_date);
    },
    {
      message: 'affiliateCampaignFormModal.errors.startEndDate',
      path: ['end_date'],
    }
  );

export const addCoursesCampaignSchema = z.object({
  course_cuids: z.array(z.string()).min(1, 'affiliateDetailCourseModal.errors.isRequired'),
});

export const addReferrersCampaignSchema = z.object({
  emails: z
    .array(z.string().email({ message: 'affiliateDetailReferrerFormModal.errors.invalidEmail' }))
    .min(1, 'affiliateDetailReferrerFormModal.errors.isRequiredEmail'),
  type: z.enum(['kol', 'agency']),
});

const bonusSchema = z.object({
  id: z.string().optional(),
  type: z.literal('min_quantity').default('min_quantity'),
  qty1: z.union([z.number().min(1), z.literal('')]),
  ref1_rate: z.union([z.number().min(0).max(100), z.literal('')]),
  enable: z.boolean().default(true),
  newId: z.string().optional(),
});

export const createBaseRateCommissionSchema = z
  .object({
    ref1_rate: z.union([z.number().min(0).max(100), z.literal('')]).refine(val => val !== '', {
      message: 'affiliateCommissionFormModal.errors.isRequired',
    }),
    ref2_rate: z.union([z.number().min(0).max(100), z.literal('')]).refine(val => val !== '', {
      message: 'affiliateCommissionFormModal.errors.isRequired',
    }),
    ref3_rate: z.union([z.number().min(0).max(100), z.literal('')]).refine(val => val !== '', {
      message: 'affiliateCommissionFormModal.errors.isRequired',
    }),
    enable: z.boolean(),
    bonuses: z.array(bonusSchema).superRefine((bonuses, ctx) => {
      for (let i = 1; i < bonuses.length; i++) {
        const prevQty = bonuses[i - 1]?.qty1;
        const currentQty = bonuses[i]?.qty1;

        // Skip validation if either value is an empty string
        if (prevQty === '' || currentQty === '') {
          continue;
        }

        // Check if current quantity is less than or equal to previous
        if (currentQty !== undefined && prevQty !== undefined && currentQty <= prevQty) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'affiliateCommissionFormModal.errors.quantityOrder',
            path: [i, 'qty1'], // This will target the specific bonus item
          });
        }
      }
    }),
  })
  .refine(
    data => Number(data.ref3_rate) <= Number(data.ref2_rate) && Number(data.ref2_rate) <= Number(data.ref1_rate),
    {
      message: 'affiliateCommissionFormModal.errors.rateOrder',
      path: ['ref3_rate'],
    }
  )
  .refine(
    data => {
      let sum = 0;

      if (typeof data.ref1_rate === 'number') {
        sum += data.ref1_rate;
      }
      if (typeof data.ref2_rate === 'number') {
        sum += data.ref2_rate;
      }
      if (typeof data.ref3_rate === 'number') {
        sum += data.ref3_rate;
      }

      return sum <= 100;
    },
    {
      message: 'affiliateCommissionFormModal.errors.rateSumExceeded',
      path: ['ref1_rate'],
    }
  );

// partner
export const createPartnerCommissionSchema = z
  .object({
    ref1_rate: z.union([z.number().min(0).max(100), z.literal('')]).refine(val => val !== '', {
      message: 'affiliateCommissionFormModal.errors.isRequired',
    }),
    ref2_rate: z.union([z.number().min(0).max(100), z.literal('')]),
    ref3_rate: z.union([z.number().min(0).max(100), z.literal('')]),
    enable: z.boolean(),
    bonuses: z.array(bonusSchema).superRefine((bonuses, ctx) => {
      for (let i = 1; i < bonuses.length; i++) {
        const prevQty = bonuses[i - 1]?.qty1;
        const currentQty = bonuses[i]?.qty1;

        // Skip validation if either value is an empty string
        if (prevQty === '' || currentQty === '') {
          continue;
        }

        // Check if current quantity is less than or equal to previous
        if (currentQty !== undefined && prevQty !== undefined && currentQty <= prevQty) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'affiliateCommissionFormModal.errors.quantityOrder',
            path: [i, 'qty1'], // This will target the specific bonus item
          });
        }
      }
    }),
  })
  .refine(
    data => Number(data.ref3_rate) <= Number(data.ref2_rate) && Number(data.ref2_rate) <= Number(data.ref1_rate),
    {
      message: 'affiliateCommissionFormModal.errors.rateOrder',
      path: ['ref3_rate'],
    }
  )
  .refine(data => Number(data.ref1_rate) + Number(data.ref2_rate) + Number(data.ref3_rate) <= 100, {
    message: 'affiliateCommissionFormModal.errors.rateSumExceeded',
    path: ['ref1_rate'],
  });

// special referrer
export const createSpecialReferrerCommissionSchema = z
  .object({
    ref1_rate: z.union([z.number().min(0).max(100), z.literal('')]).refine(val => val !== '', {
      message: 'affiliateCommissionFormModal.errors.isRequired',
    }),
    ref2_rate: z.union([z.number().min(0).max(100), z.literal('')]),
    ref3_rate: z.union([z.number().min(0).max(100), z.literal('')]),
    referrer_ids: z.array(z.string()).min(1, 'affiliateCommissionFormModal.errors.atLeastReferrer'),
    enable: z.boolean(),
    bonuses: z.array(bonusSchema).superRefine((bonuses, ctx) => {
      for (let i = 1; i < bonuses.length; i++) {
        const prevQty = bonuses[i - 1]?.qty1;
        const currentQty = bonuses[i]?.qty1;

        // Skip validation if either value is an empty string
        if (prevQty === '' || currentQty === '') {
          continue;
        }

        // Check if current quantity is less than or equal to previous
        if (currentQty !== undefined && prevQty !== undefined && currentQty <= prevQty) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'affiliateCommissionFormModal.errors.quantityOrder',
            path: [i, 'qty1'], // This will target the specific bonus item
          });
        }
      }
    }),
  })
  .refine(
    data => Number(data.ref3_rate) <= Number(data.ref2_rate) && Number(data.ref2_rate) <= Number(data.ref1_rate),
    {
      message: 'affiliateCommissionFormModal.errors.rateOrder',
      path: ['ref3_rate'],
    }
  )
  .refine(data => Number(data.ref1_rate) + Number(data.ref2_rate) + Number(data.ref3_rate) <= 100, {
    message: 'affiliateCommissionFormModal.errors.rateSumExceeded',
    path: ['ref1_rate'],
  });

export type CreateAffiliateCampaignSchemaType = z.infer<typeof createAffiliateCampaignSchema>;
export type AddCoursesCampaignSchemaType = z.infer<typeof addCoursesCampaignSchema>;
export type AddReferrersCampaignSchemaType = z.infer<typeof addReferrersCampaignSchema>;
export type CreateBaseRateCommissionSchemaType = z.infer<typeof createBaseRateCommissionSchema>;
export type CreatePartnerCommissionSchemaType = z.infer<typeof createPartnerCommissionSchema>;
export type CreateSpecialReferrerCommissionSchemaType = z.infer<typeof createSpecialReferrerCommissionSchema>;
