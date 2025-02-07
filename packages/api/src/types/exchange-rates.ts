export interface IExchangeRates {
  AVAIL_USD: number;
  NEAR_USD: number;
  USDC_USD: number;
  USDT_USD: number;
  USD_VND: number;
  USD_VND_last_update_at: number;
  USD_VND_next_update_at: number;
  VND_USD: number;
  VND_USD_last_update_at: number;
  VND_USD_next_update_at: number;
  [key: string]: number;
}
