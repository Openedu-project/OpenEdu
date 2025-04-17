import type { HTTPPagination } from './fetch';

export type IEntitiesReferralProgram = Record<string, never>;

export interface ICompleteCourseBonusReferralProgram {
  amount: string;
  type: 'fixed' | 'percentage';
}

export interface ITimeBaseRewardsReferralProgram {
  end_date: number;
  reward: ICompleteCourseBonusReferralProgram;
  start_date: number;
}

export interface IRefCountBonus {
  enable: boolean;
  order: number;
  reach_count: number;
  reward: ICompleteCourseBonusReferralProgram;
}

export interface IMonthlyStreakBonusReferralProgram {
  enable: boolean;
  reward: ICompleteCourseBonusReferralProgram;
  threshold: number;
}

export interface ISettingReferralProgram {
  complete_course_bonus: ICompleteCourseBonusReferralProgram;
  deposit_crypto_bonus: ICompleteCourseBonusReferralProgram;
  deposit_fiat_bonus: ICompleteCourseBonusReferralProgram;
  featured_discover: boolean;
  milestone_bonus: boolean;
  monthly_streak_bonus: IMonthlyStreakBonusReferralProgram;
  ref_count_bonus: IRefCountBonus[];
  referee_reward: ICompleteCourseBonusReferralProgram;
  referrer_reward: ICompleteCourseBonusReferralProgram;
  streak_bonus: boolean;
  time_base_rewards: ITimeBaseRewardsReferralProgram;
  time_based: boolean;
  trigger: string;
  weekly_streak_bonus: IMonthlyStreakBonusReferralProgram;
}

export interface IReferralProgram {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  program: string;
  name: string;
  scope: string;
  enabled: boolean;
  entities: IEntitiesReferralProgram[];
  start_date: number;
  end_date: number;
  total_reward: number;
  setting: ISettingReferralProgram;
}

export interface IReferralProgramRes extends HTTPPagination<IReferralProgram> {}
export type IReferralProgramPayload = IReferralProgram;
export interface IInviteReferrerPayload {
  referral_type: 'ref-user';
  emails: string[];
}
