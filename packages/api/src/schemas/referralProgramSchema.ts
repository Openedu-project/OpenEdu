import { z } from '#utils/zod';

// Base reward schema for required rewards
const rewardSchema = z.object({
  amount: z.number().min(1, { message: 'referralProgram.dashboard.errors.amountRequired' }),
  type: z.enum(['fixed', 'percentage'], {
    errorMap: () => ({ message: 'referralProgram.dashboard.errors.typeRequired' }),
  }),
});

// Optional reward schema for conditional rewards
const optionalRewardSchema = z.object({
  amount: z.number().optional(),
  type: z.enum(['fixed', 'percentage']).optional(),
});

const milestoneItemSchema = z.object({
  enable: z.boolean(),
  order: z.number(),
  reach_count: z.number().min(1, { message: 'referralProgram.dashboard.errors.countRequired' }),
  reward: rewardSchema,
});

const streakBonusSchema = z
  .object({
    enable: z.boolean(),
    threshold: z.number().optional(),
    reward: optionalRewardSchema.optional(),
  })
  .refine(
    data => {
      // If enable is true, both threshold and reward must be provided
      if (data.enable) {
        return (
          data.threshold !== undefined &&
          data.threshold >= 1 &&
          data.reward?.amount !== undefined &&
          data.reward.amount >= 1 &&
          data.reward.type !== undefined
        );
      }
      return true;
    },
    {
      message: 'referralProgram.dashboard.errors.thresholdAndRewardRequired',
      path: ['threshold', 'reward'],
    }
  );

export const referralProgramSchema = z.object({
  id: z.string(),
  program: z.string(),
  name: z.string().min(1, { message: 'referralProgram.dashboard.errors.nameRequired' }),
  scope: z.string(),
  enabled: z.boolean(),
  start_date: z.date({
    errorMap: () => ({ message: 'referralProgram.dashboard.errors.dateInvalid' }),
  }),
  end_date: z.date({
    errorMap: () => ({ message: 'referralProgram.dashboard.errors.dateInvalid' }),
  }),
  setting: z
    .object({
      referrer_reward: rewardSchema,
      referee_reward: rewardSchema,
      trigger: z.string(),
      milestone_bonus: z.boolean(),
      ref_count_bonus: z.array(milestoneItemSchema).optional(),
      streak_bonus: z.boolean(),
      weekly_streak_bonus: streakBonusSchema,
      monthly_streak_bonus: streakBonusSchema,
      time_based: z.boolean(),
      time_base_rewards: z
        .object({
          start_date: z.date().optional(),
          end_date: z.date().optional(),
          reward: optionalRewardSchema.optional(),
        })
        .optional(),
      featured_discover: z.boolean(),
      complete_course_bonus: optionalRewardSchema.optional(),
      deposit_fiat_bonus: optionalRewardSchema.optional(),
      deposit_crypto_bonus: optionalRewardSchema.optional(),
    })
    .superRefine((data, ctx) => {
      // Milestone bonus validation
      if (data.milestone_bonus) {
        if (!data.ref_count_bonus || data.ref_count_bonus.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'referralProgram.dashboard.errors.milestoneItemsRequired',
            path: ['ref_count_bonus'],
          });
        }
      }

      // Time-based rewards validation
      if (data.time_based) {
        if (data.time_base_rewards) {
          // Validate individual fields only if time_based is true
          if (!data.time_base_rewards.start_date) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'referralProgram.dashboard.errors.startDateRequired',
              path: ['time_base_rewards', 'start_date'],
            });
          }
          if (!data.time_base_rewards.end_date) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'referralProgram.dashboard.errors.endDateRequired',
              path: ['time_base_rewards', 'end_date'],
            });
          }
          if (
            !data.time_base_rewards.reward ||
            data.time_base_rewards.reward.amount === undefined ||
            data.time_base_rewards.reward.amount < 1
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'referralProgram.dashboard.errors.rewardAmountRequired',
              path: ['time_base_rewards', 'reward', 'amount'],
            });
          }
          if (!data.time_base_rewards.reward || data.time_base_rewards.reward.type === undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'referralProgram.dashboard.errors.rewardTypeRequired',
              path: ['time_base_rewards', 'reward', 'type'],
            });
          }
        } else {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'referralProgram.dashboard.errors.timeBasedRewardsRequired',
            path: ['time_base_rewards'],
          });
        }
      }

      // Featured discovery rewards validation
      if (data.featured_discover) {
        const validateReward = (
          reward: { amount?: number; type?: 'fixed' | 'percentage' } | undefined,
          fieldName: string
        ) => {
          if (!reward) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'referralProgram.dashboard.errors.rewardRequired',
              path: [fieldName],
            });
            return;
          }

          if (reward.amount === undefined || reward.amount < 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'referralProgram.dashboard.errors.rewardAmountRequired',
              path: [fieldName, 'amount'],
            });
          }

          if (reward.type === undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'referralProgram.dashboard.errors.rewardTypeRequired',
              path: [fieldName, 'type'],
            });
          }
        };

        validateReward(data.complete_course_bonus, 'complete_course_bonus');
        validateReward(data.deposit_fiat_bonus, 'deposit_fiat_bonus');
        validateReward(data.deposit_crypto_bonus, 'deposit_crypto_bonus');
      }

      // Weekly streak bonus validation
      if (data.streak_bonus && data.weekly_streak_bonus?.enable) {
        if (!data.weekly_streak_bonus.threshold || data.weekly_streak_bonus.threshold < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'referralProgram.dashboard.errors.weeklyThresholdRequired',
            path: ['weekly_streak_bonus', 'threshold'],
          });
        }

        if (!data.weekly_streak_bonus.reward?.amount || data.weekly_streak_bonus.reward.amount < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'referralProgram.dashboard.errors.weeklyRewardAmountRequired',
            path: ['weekly_streak_bonus', 'reward', 'amount'],
          });
        }

        if (!data.weekly_streak_bonus.reward?.type) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'referralProgram.dashboard.errors.weeklyRewardTypeRequired',
            path: ['weekly_streak_bonus', 'reward', 'type'],
          });
        }
      }

      // Monthly streak bonus validation
      if (data.streak_bonus && data.monthly_streak_bonus?.enable) {
        if (!data.monthly_streak_bonus.threshold || data.monthly_streak_bonus.threshold < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'referralProgram.dashboard.errors.monthlyThresholdRequired',
            path: ['monthly_streak_bonus', 'threshold'],
          });
        }

        if (!data.monthly_streak_bonus.reward?.amount || data.monthly_streak_bonus.reward.amount < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'referralProgram.dashboard.errors.monthlyRewardAmountRequired',
            path: ['monthly_streak_bonus', 'reward', 'amount'],
          });
        }

        if (!data.monthly_streak_bonus.reward?.type) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'referralProgram.dashboard.errors.monthlyRewardTypeRequired',
            path: ['monthly_streak_bonus', 'reward', 'type'],
          });
        }
      }
    }),
});

export type IReferralProgramFormSchema = z.infer<typeof referralProgramSchema>;
