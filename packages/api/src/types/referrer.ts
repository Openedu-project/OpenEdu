import type { IDataPagination } from './pagination';

export interface IReferrerItem {
  id: string;
  email: string;
  type: 'kol' | 'user' | 'agency';
  enable: boolean;
}

export interface IReferrerListRes extends IDataPagination<IReferrerItem[]> {}

export interface ICreateReferrersPayload {
  campaign_id: string;
  referrers: {
    email: string;
    type: 'kol' | 'user' | 'agency';
    enable: boolean;
  }[];
}
