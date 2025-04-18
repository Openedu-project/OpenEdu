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

export interface IMilestonePoint {
  amount: string;
  count: number;
  milestones: {
    id: string;
    create_at: number;
    amount: number;
    user_id: string;
    campaign_id: string;
    source: string;
    claim_date: number;
    claim_dmilestone_reachedate: number;
  };
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

export interface IMyPointProfileRes {
  point: IPointReferralProgram;
  ref_code: IRefcodeProgram;
  new_points: INewPoints;
}

export interface IClaimPointPayload {
  sources: string[];
}
