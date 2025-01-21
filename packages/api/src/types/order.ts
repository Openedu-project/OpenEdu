import type { ICouponItem } from './coupon';
import type { IPaymentMethodItem } from './payment';

export interface IOrderPayload {
  course_id: string;
  course_cuid: string;
  referral_code: string;
  source?: string;
}
export interface IOrderChangeMethodPayload {
  payment_method_id: string;
  currency?: string;
}
export interface IOrderPaymentSuccessPayload extends Omit<IOrderChangeMethodPayload, 'currency'> {}

export interface IOrderSuccessPayload extends Omit<IOrderChangeMethodPayload, 'currency'> {}

export interface IOrderStatusRes {
  status: 'new' | 'insufficient' | 'success' | 'failed';
}
export interface IOrderRes {
  order: IOrderItem;
  payment_url: string;
  payment_method: IPaymentMethodItem;
}
export interface IOrderPaymentWithWalletPayload {
  wallet_id: string;
}
export interface IOrderPaymentWithWalletRes {
  message: string;
}

export interface IOrderItem {
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
  coupon: ICouponItem;
  status: string;
  currency: string;
  payment_method_id: string;
  referral_discount_amount: number;
  order_number: number;
}
