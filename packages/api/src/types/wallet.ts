import { CHAIN, CURRENCY_SYMBOLS, type TAssetType, type TChain, type TCurrencySymbol } from '#utils/wallet';

export type TAssetList = {
  wallet_id: string;
  type: TAssetType;
  symbol: TCurrencySymbol;
  amount: number;
  value: number;
  exchangeValue?: TBalanceValue;
  earningBalance?: TBalanceValue;
};

export type TBalanceValue = {
  vnd: number;
  usd: number;
};

export type TBankAccounts = {
  id?: string;
  bank_name: string;
  account_name: string;
  account_number: string;
};

export type TBankAccountsRequest = {
  pagination: {
    page: number;
    per_paege: number;
    total_items: number;
    total_pages: number;
  };
  results: {
    id: string;
    value: TBankAccounts[];
  };
};

export type TChainData = {
  chainName: {
    symbol: string;
    name: string;
    explorerTx: string;
    explorerAddr: string;
  };
};

export type TCryptoWithdrawFormData = TWithdrawFormData & {
  network: TChain;
  address: string;
  token: TCurrencySymbol;
};

export type TExchangeRates = {
  VND_USD: number;
  USDC_USD: number;
  USDT_USD: number;
  NEAR_USD: number;
  AVAIL_USD: number;
};

export type TFiatWithdrawFormData = TWithdrawFormData & {
  fiatType: string;
  bankAccount: string;
};

export type THistory = {
  create_at: string;
  type: string;
  amount: number;
  status: string;
  to_address?: string;
  tx_hash?: string;
  network: string;
  currency: string;
  currency_type: string;
  files?: {
    url: string;
  }[];
  note?: string;
};

export type TNFTItem = {
  metadata: {
    title: string;
    media: string;
    description: string;
  };
  token_id: string;
  chain: TChain;
  contract: string;
};

export type TNFTData = Record<string, TNFTItem[]>;

export type TPaginationResponse<T> = {
  code: number;
  msg: string;
  data: {
    pagination: {
      page: number;
      per_page: number;
      total_pages: number;
      total_items: number;
    };
    results: T[];
  };
};

export type TRequestWithdrawHistory = {
  create_at: number;
  entity: {
    currency: string;
  };
  request_value: number;
  status: string;
  note?: string;
};

export type TTokenBalance = {
  balance: number;
  earning_balance?: number;
};

export type TTokenBalances = {
  near: {
    balance: number;
  };
  totalNFTSupply: number;
  tokens: TTokenBalancesMap;
};

export type TTokenBalancesMap = {
  USDT?: TTokenBalance;
  USDC?: TTokenBalance;
  AVAIL: TTokenBalance;
  POINT?: TTokenBalance;
};

export type TWallet = {
  id: string;
  type: TAssetType;
  currency: TCurrencySymbol;
  network: TChain;
  address: string;
  balance: string;
  available_balance: string;
  earning_balance: string;
};

export type TWalletHistoryResponse = TPaginationResponse<THistory>;

export type TWalletRequestWithdrawResponse = TPaginationResponse<TRequestWithdrawHistory>;

export type TWithdrawFormData = {
  amount: number;
};

export type TBaseHistoryItem = {
  create_at: string;
  currency: string;
  amount: number;
  status: string;
  type?: string;
  note?: string;
  network?: string;
  tx_hash?: string;
  files?: Array<{ url: string }>;
};

export type TContracts = {
  [key: string]: string;
};

export type TTokenContracts = {
  [key: string]: {
    id: string;
    decimals: number;
  };
};

export interface IWalletItem {
  user_id: string;
  balance: string;
  type: string;
  currency: string;
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
}

export interface IWalletRes extends Array<IWalletItem> {}

export type TTokenOption = {
  value: TCurrencySymbol;
  label: string;
};

export const NETWORK_OPTIONS = [
  { value: CHAIN.NEAR, label: 'Near' },
  { value: CHAIN.AVAIL, label: 'Avail' },
] as const;

export const TOKEN_OPTIONS: Record<TChain, TTokenOption[]> = {
  [CHAIN.NEAR]: [
    { value: CURRENCY_SYMBOLS.NEAR, label: 'NEAR' },
    { value: CURRENCY_SYMBOLS.USDT, label: 'USDT' },
    { value: CURRENCY_SYMBOLS.USDC, label: 'USDC' },
  ],
  [CHAIN.AVAIL]: [{ value: CURRENCY_SYMBOLS.AVAIL, label: 'AVAIL' }],
  [CHAIN.ETHEREUM]: [],
} as const;
