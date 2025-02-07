import type { HTTPPagination } from './fetch';

export interface IReferrerItem {
  id: string;
  email: string;
  type: 'kol' | 'user' | 'agency';
  enable: boolean;
}

export interface IReferrerListRes extends HTTPPagination<IReferrerItem> {}

export interface ICreateReferrersPayload {
  campaign_id: string;
  referrers: {
    email: string;
    type: 'kol' | 'user' | 'agency';
    enable: boolean;
  }[];
}
