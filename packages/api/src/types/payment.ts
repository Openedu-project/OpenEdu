import type { IDataPagination } from './pagination';
import type { IPaymentSocket, ISocketRes } from './socket';

export interface IPaymentMethodItem {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  course_id: string;
  organize_id: string;
  service: string;
  account: string;
  account_number: string;
  account_name: string;
  network: string;
  enable: boolean;
  payment_type: string;
}

export interface IPaymentMethodRes extends IDataPagination<IPaymentMethodItem[]> {}

export interface IPaymentSocketRes extends ISocketRes<IPaymentSocket> {}
