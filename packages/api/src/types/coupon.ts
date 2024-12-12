import type { IDataPagination } from './pagination';

export interface ICouponPayload {
  id: string;
  name: string;
  org_id: string;
  coupon_code: string;
  type: string;
  method: string;
  start_date: number;
  end_date: number;
  discount_amount?: number;
  discount_percentage?: number;
  maximum_total_usage: number;
  allow_maximum_discount?: number;
  min_amount_to_use?: number;
  description: string;
  allow_courses: string[];
  is_available?: boolean;
  is_active: boolean;
  create_at?: number;
  update_at?: number;
  delete_at?: number;
  courses?: null;
  created_by?: string;
  allow_teams: string[] | null;
  fiat_discount_enabled: boolean;
  fiat_discount_percentage: number;
  fiat_allow_maximum_discount: number;
  crypto_discount_enabled: boolean;
  crypto_discount_percentage: number;
  crypto_allow_maximum_discount: number;
}

export interface ICouponItem extends ICouponPayload {}

export type ICouponItemRes = ICouponItem;

export interface ICouponListRes extends IDataPagination<ICouponItem[]> {}

export interface IUseCouponPayload extends Pick<ICouponPayload, 'coupon_code'> {
  course_id: string;
}
