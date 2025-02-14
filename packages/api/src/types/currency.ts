export type TCurrency = 'fiat' | 'crypto';

export interface ICurrencyValue {
  name: string;
  symbol: string;
  type: TCurrency;
}

export interface ICurrencyListResponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  key: string; //'currency'
  value: ICurrencyValue[];
  org_id: string;
  data_type: string;
  domain: string;
}

export interface IExchangeRate {
  VND_USD: number;
  VND_USD_last_update_at: number;
  VND_USD_next_update_at: number;
  USD_VND: number;
  USD_VND_last_update_at: number;
  USD_VND_next_update_at: number;
  NEAR_USD: number;
  USDT_USD: number;
  USDC_USD: number;
}
