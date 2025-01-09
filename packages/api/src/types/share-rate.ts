import type { IAffiliateCampaignItem } from './affiliate-campaign';
import type { ICommissionItem } from './commission';

export interface IShareRateRes {
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

export interface IShareRatePayload extends Pick<IShareRateRes, 'share_rate'> {
  campaignId?: string;
}
