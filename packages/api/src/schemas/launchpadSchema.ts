import { fileResponseSchema } from '#types/file';
import { z } from '#utils/zod';

export const rejectLaunchpadSchema = z.object({
  note: z.string().min(1, 'adminLaunchpadRequest.rejectModal.errors.isRequired'),
});

export const startFundingSchema = z.object({
  funding_start_date: z.date({
    invalid_type_error: 'adminLaunchpadRequest.startFundingModal.errors.isValidDate',
  }),
});

export const generalInfoLaunchpadSchema = z.object({
  description: z.string().optional(),
  thumbnail: fileResponseSchema
    .nullable()
    .refine(data => !!data, {
      message: 'creatorSettingLaunchpad.generalInfo.errors.thumbnailRequired',
    })
    .optional(),
  thumbnail_id: z.string().default('').optional(),
  preview_video: fileResponseSchema
    .nullable()
    .refine(data => !!data, {
      message: 'creatorSettingLaunchpad.generalInfo.errors.previewVideoRequired',
    })
    .optional(),
  preview_video_id: z.string().default('').optional(),
  levels: z
    .array(
      z.object({
        id: z.string().min(1, {
          message: 'creatorSettingLaunchpad.generalInfo.errors.levelIdRequired',
        }),
      })
    )
    .default([]),
  categories: z
    .array(
      z.object({
        id: z.string().min(1, {
          message: 'creatorSettingLaunchpad.generalInfo.errors.categoryIdRequired',
        }),
      })
    )
    .default([]),
});

export const fundingGoalLaunchpadSchema = z.object({
  target_funding: z.number().min(1, {
    message: 'creatorSettingLaunchpad.fundingGoal.errors.validNumber',
  }),
  min_pledge: z.number().min(0),
  profit_percentage: z
    .number()
    .min(0, {
      message: 'creatorSettingLaunchpad.fundingGoal.errors.percentageRange',
    })
    .max(100, {
      message: 'creatorSettingLaunchpad.fundingGoal.errors.percentageRange',
    }),
  currency: z.string(),
  estimate_funding_days: z.number().min(0),
});

export const votingPlanLaunchpadSchema = z.object({
  clp_voting_milestones: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      estimated_open_vote_date: z.number().min(Date.now(), {
        message: 'creatorSettingLaunchpad.votingPlan.errors.futureDateRequired',
      }),
      target_section: z.number().min(4, {
        message: 'creatorSettingLaunchpad.votingPlan.errors.minimumSections',
      }),
    })
  ),
});

export const ownerCollabsLaunchpadSchema = z.object({
  telegram: z
    .string()
    .min(1, 'creatorSettingLaunchpad.ownerAndCollabs.errors.telegramRequired')
    .regex(
      /^(https?:\/\/)?(t\.me|telegram\.me)\/\+?[a-zA-Z0-9_]{5,}$/,
      'creatorSettingLaunchpad.ownerAndCollabs.errors.invalidTelegramFormat'
    ),
});

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

export type IRejectLaunchpadSchemaType = z.infer<typeof rejectLaunchpadSchema>;
export type IStartFundingSchemaType = z.infer<typeof startFundingSchema>;
export type IGeneralInfoLaunchpadSchemaType = z.infer<typeof generalInfoLaunchpadSchema>;
export type IFundingGoalLaunchpadSchemaType = z.infer<typeof fundingGoalLaunchpadSchema>;
export type IVotingPlanLaunchpadSchemaType = z.infer<typeof votingPlanLaunchpadSchema>;
export type IOwnerCollabsLaunchpadSchemaType = z.infer<typeof ownerCollabsLaunchpadSchema>;
export type IPledgeLaunchpadSchema = z.infer<typeof pledgeLaunchpadSchema>;
