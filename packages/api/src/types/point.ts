export interface IWeeklystreakPoint {
  amount: string;
  count: number;
  total_count: number;
}

export interface IFeaturedPoint {
  amount: string;
  count: number;
  fiat_count: number;
  crypto_count: number;
  course_count: number;
}

export interface IMilestoneDetailPoint {
  id: string;
  create_at: number;
  amount: string;
  user_id: string;
  campaign_id: string;
  source: string;
  claim_date: number;
  milestone_reached: number;
}
export interface IMilestonePoint {
  amount: string;
  count: number;
  milestones: IMilestoneDetailPoint[];
}

export interface IReferralPoint {
  amount: string;
  count: number;
}

export interface INewPoints {
  referral: IReferralPoint;
  milestone: IMilestonePoint;
  featured: IFeaturedPoint;
  timebase: IReferralPoint;
  weekly_streak: IWeeklystreakPoint;
  monthly_streak: IWeeklystreakPoint;
  referee: IReferralPoint;
}

export interface IRefcodeProgram {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  code: string;
  user_id: string;
  type: string;
  campaign_id: string;
  referrer: null;
  user: null;
  campaign: null;
}

export interface IPointReferralProgram {
  amount: string;
  used: string;
  remaining: string;
}

export interface IPointwallet {
  user_id: string;
  balance: string;
  available_balance: string;
  earning_balance: string;
  type: string;
  currency: string;
  default: boolean;
  network: string;
  address: string;
  public_key: string;
  blockchain_wallet_id: string;
  parent_id: string;
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
}

export interface IMyPointProfileRes {
  point: IPointReferralProgram;
  ref_code: IRefcodeProgram;
  new_points: INewPoints;
  point_wallets: IPointwallet[];
  total_reward: number;
}

export interface IClaimPointPayload {
  sources:
    | [
        | 'referral_user'
        | 'referee_user'
        | 'referral_milestone'
        | 'referral_weekly_streak'
        | 'referral_monthly_streak'
        | 'referral_feature_course_discovery'
        | 'referral_feature_fiat_discovery'
        | 'referral_feature_crypto_discovery'
        | 'referral_time_base_bonus',
      ]
    | [];
}
