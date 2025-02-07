import type { HTTPPagination } from './fetch';

export interface IUserAffiliateReportItem {
  campaign_id: string;
  name: string;
  currency: string;
  create_at: number;
  price: string;
  course_slug: string;
  course_cuid: string;
  course_name: string;
  org_domain: string;
  course_owner_id: string;
  thumbnail_id: string;
  max_share_rate: number;
  ref1_amount: string;
  ref2_amount: string;
  ref3_amount: string;
  total_amount: string;
  share_amount: string;
}

export interface IUserAffiliateSummariesReportRes {
  total_amount: string;
  user_id: string;
}

export interface IUserAffiliateReportRes extends HTTPPagination<IUserAffiliateReportItem> {}

interface IHistory {
  date: number;
  id: string;
  version: number;
}

interface IProps {
  histories: IHistory[];
}

interface IPubcourse {
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
  version: number;
  course_id: string;
  pub_date: number;
  enable: boolean;
  pub_root_date: number;
  enable_root: boolean;
  is_root: boolean;
  start_date: number;
  end_date: number;
  mark_as_completed: boolean;
  props: IProps;
  user: null;
  thumbnail: null;
  categories: null;
  total_user_enrollment: number;
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
}

interface IOrder {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  amount: string;
  actual_amount: string;
  paid: string;
  missing_amount: string;
  discount_amount: string;
  code: string;
  status: string;
  currency: string;
  payment_method_id: string;
  order_number: number;
  referral_code: string;
  referral_discount_amount: string;
  org_id: string;
  pay_from_org_id: string;
  coupon: null;
}

interface ICampaign {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  org_id: string;
  name: string;
  start_date: number;
  end_date: number;
  enable: boolean;
  can_applicable_comms: null;
  bought_from: null;
  user_extend_link: null;
  org: null;
}

export interface IUserAffiliateReportDetailItem {
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
  currency: string;
  ref1_user_id: string;
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
  pub_course: IPubcourse;
  campaign: ICampaign;
  order: IOrder;
  ref1_user: null;
  ref2_user: null;
  ref3_user: null;
  ref1_link: null;
  ref2_link: null;
  ref3_link: null;
}

export interface IUserAffiliateReportDetailRes extends HTTPPagination<IUserAffiliateReportDetailItem> {}
