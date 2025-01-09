import type { IDataPagination } from './pagination';

export type RefType = 'kol' | 'user' | 'agency' | 'purchased_user' | 'specific_referrer' | 'downline' | null;

export interface ICommissionPayload {
  id?: string;
  newId?: string;
  campaign_id: string;
  ref1_rate: number;
  ref2_rate: number;
  ref3_rate: number;
  referrer_types?: RefType[];
  referrer_ids?: string[];
  type: 'no_limit_qty';
  enable: boolean;
  is_base_rate: boolean;
  bonuses: ICommissionBonus[];
}

export interface ICommissionBonus {
  id?: string;
  type: 'min_quantity';
  qty1: number;
  ref1_rate: number;
  order: number;
  enable: boolean;
}

export interface ICommissionBonusRes extends ICommissionBonus {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  org_id: string;
  campaign_id: string;
  ref2_rate: number;
  qty2: number;
  ref3_rate: number;
  qty3: number;
  parent_id: string;
  referrer_types: null;
  referrer_ids: string[];
  bonuses: null;
  qty1_from?: number;
  qty1_to?: number;
}

export interface ICommissionItem extends ICommissionPayload {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  org_id: string;
  parent_id: string;
  qty1?: number;
  qty2?: number;
  qty3?: number;
  bonuses: ICommissionBonusRes[];
}

export interface ICommissionListRes extends IDataPagination<ICommissionItem[]> {}
