import type { ICommissionItem } from './commission';
import type { IOrganization } from './organizations';
import type { IDataPagination } from './pagination';
import type { IShareRateRes } from './share-rate';

export interface ICampaginReferralLink {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  org_id: string;
  campaign_id: string;
  commission_id: string;
  ref_code: string;
  ref_level1: string;
  ref_level2: string;
  share_rate: number;
  enable: boolean;
  is_extend: boolean;
  campaign: IAffiliateCampaignItem;
  commission: ICommissionItem;
}

export interface ICampaginExtendReferralLink extends ICampaginReferralLink {}
export interface IValidateRefCodePayload {
  course_cuid: string;
}
export interface ICanApplicableComm extends ICommissionItem {
  referral_link_by_user: ICampaginReferralLink | null;
  user_extend_link?: IShareRateRes | null;
  minBonusRate?: number;
  maxBonusRate?: number;
  minRate?: number;
  maxRate?: number;
  canCopyLink?: boolean;
}
export interface IExtendCommission extends ICommissionItem {
  referral_link_by_user: ICampaginReferralLink | null;
}
export interface IAffiliateCampaignPayload {
  id?: string;
  name: string;
  start_date: number;
  end_date: number;
  create_at: number;
  update_at: number;
  delete_at: number;
  enable: boolean;
  user_id: string;
  org_id: string;
  org?: IOrganization;
  can_applicable_comms?: ICanApplicableComm[] | null;
  extend_commission?: IExtendCommission | null;
}

export interface IAffiliateCampaignItem extends IAffiliateCampaignPayload {
  id: string;
  created_at?: number;
  updated_at?: number;
  bought_from?: IShareRateRes | null;
  user_extend_link?: IShareRateRes | null;
  commissions?: ICanApplicableComm[];
}

export interface IAffiliateCampaignListRes extends IDataPagination<IAffiliateCampaignItem[]> {}
export interface IUserAffiliateCampaignItem {
  id: string;
  name: string;
  create_at: number;
  start_date: number;
  end_date: number;
  user_id: string;
  org_id: string;
  course_slug: string;
  course_cuid: string;
  course_name: string;
  price: string;
  org_domain: string;
  course_owner_id: string;
  thumbnail_id: string;
  currency: string;
  base_rate_min: number;
  base_rate_max: number;
  base_rate_ref2: number;
  learner_rate_min: number;
  learner_rate_max: number;
  premium_rate_min: number;
  premium_rate_max: number;
  premium_share_rate_max: number;
}
export interface IUserAffiliateCampaignListRes extends IDataPagination<IUserAffiliateCampaignItem[]> {}

export interface IAffiliateCampaignLinkRes {
  referral_link: ICampaginReferralLink;
  referral_extend_link: ICampaginExtendReferralLink;
}
