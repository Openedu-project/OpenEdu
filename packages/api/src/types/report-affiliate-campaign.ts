import type { IAffiliateCampaignItem } from './affiliate-campaign';

export interface IReportAffiliateCampaign {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  org_id: string;
  course_cuid: string;
  course_id: string;
  campaign_id: string;
  commission_id: string;
  order_id: string;
  order_amount: string;
  ref1_user_id: string;
  currency?: string;
  ref1_link_id: string;
  ref1_rate: number;
  ref1_amount: string;
  share_rate: number;
  share_amount: string;
  bonus_commission_id: string;
  bonus_rate: number;
  bonus_amount: string;
  ref2_user_id: string;
  ref2_link_id: string;
  ref2_rate: number;
  ref2_amount: string;
  ref3_user_id: string;
  ref3_link_id: string;
  ref3_rate: number;
  ref3_amount: string;
  pub_course: IReportAffilicateCampaignPubcourse;
  campaign: IAffiliateCampaignItem;
  ref1_user: IRefUser;
  ref2_user: IRefUser | null;
  ref3_user: IRefUser | null;
  ref1_link: null;
  ref2_link: null;
  ref3_link: null;
}

export interface IRefUser {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  username: string;
  email: string;
  phone: string;
  password: string;
  active: boolean;
  blocked: boolean;
  roles: null;
  props: { locale: string; linkedin: string; github: string; website: string };
  avatar: string;
  display_name: string;
  headline: string;
  about: string;
  position: string;
  following: number;
  followers: number;
  require_set_password: boolean;
}

interface IReportAffilicateCampaignPubcourse {
  org_id: string;
  org_schema: string;
  org_domain: string;
  user_id: string;
  course_cuid: string;
  course_slug: string;
  name: string;
  is_pay: boolean;
  price: string;
  description: string;
  thumbnail_id: string;
  course_id: string;
  pub_date: number;
  is_root: boolean;
  enable: boolean;
  start_date: number;
  end_date: number;
  props: IReportAffiliateCampaginHistories;
  user: null;
  thumbnail: null;
  categories: null;
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
}

interface IReportAffiliateCampaginHistories {
  histories: IReportAffiliateCampaginHistory[];
}

interface IReportAffiliateCampaginHistory {
  date: number;
  id: string;
  version: number;
}

export type IReportUserAffiliateCampaign = IReportAffiliateCampaign;

export interface IReportAffiliateCampaignDetail {
  rate: number;
  order_amount: string;
  amount: string;
  userRef: IRefUser | null;
}
