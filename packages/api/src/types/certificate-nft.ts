export type TPayer = 'learner' | 'creator' | 'plaform';

export interface ICertNftFees {
  mint_nft_enabled: boolean;
  gas_fee_payer_in_setting: TPayer;
  actual_gas_fee_payer: TPayer;
  estimated_fee: string;
  sponsor_balance: string;
}

export interface IMintCertNftRequest {
  gas_fee_payer: TPayer;
}

export interface IEstimatedFee {
  currency: string;
  sponsor_balance: string;
  estimated_fee: string;
}

export interface ISponsorGasCourseRequest {
  amount: string;
}
