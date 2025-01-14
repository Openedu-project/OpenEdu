import type { TContracts, TTokenContracts } from '#types/wallet';

export const CHAIN = {
  NEAR: 'near',
  ETHEREUM: 'ethereum',
  AVAIL: 'avail',
} as const;

export type TChain = (typeof CHAIN)[keyof typeof CHAIN];

export const CURRENCY_SYMBOLS = {
  VND: 'VND',
  USD: 'USD',
  POINT: 'P',
  NEAR: 'NEAR',
  USDT: 'USDT',
  USDC: 'USDC',
  AVAIL: 'AVAIL',
} as const;

export type TCurrencySymbol = (typeof CURRENCY_SYMBOLS)[keyof typeof CURRENCY_SYMBOLS];

export const ASSET_TYPES = {
  FIAT: 'fiat',
  TOKEN: 'token',
  CRYPTO: 'crypto',
  POINT: 'point',
  NFT: 'nft',
} as const;

export type TAssetType = (typeof ASSET_TYPES)[keyof typeof ASSET_TYPES];

export const INIT_PAGE_TYPE = {
  ADD_BANK: 'add-bank-account',
} as const;

export type TInitPageType = (typeof INIT_PAGE_TYPE)[keyof typeof INIT_PAGE_TYPE];

export const SWR_WALLET_KEY = {
  WALLETS: 'wallet-data',
  EXCHANGE_RATES: 'exchange-rates',
  NEAR_TOKENS: (address?: string) => ['nearTokens', address],
  AVAIL_BALANCE: (address?: string) => ['availBalance', address],
} as const;

export const TransactionType = {
  WITHDRAW: 'withdraw',
  CLAIM: 'claim',
  USE_POINT: 'use_point',
  SALE: 'sale',
  REFERRAL: 'referral',
  BUY: 'buy',
  CLAIM_EARNING: 'claim_earning',
  RETROACTIVE: 'retroactive',
  INIT_LAUNCHPAD_POOL: 'init_launchpad_pool',
  PLEDGE_LAUNCHPAD: 'pledge_launchpad',
} as const;

export type TTransactionTypeKeys = (typeof TransactionType)[keyof typeof TransactionType];

export const WITHDRAW_STATE = {
  INIT: 'init',
  SUBMIT: 'submit',
  SUCCESS: 'success',
  OUT_OF_GAS: 'out_of_gas',
} as const;

export type TWithdrawState = (typeof WITHDRAW_STATE)[keyof typeof WITHDRAW_STATE];

export const TOKEN_CONTRACTS: TTokenContracts = (() => {
  return {
    [CURRENCY_SYMBOLS.USDT]: {
      id: process.env.NEXT_PUBLIC_NEAR_USDT_CONTRACT || '',
      decimals: 6,
    },
    [CURRENCY_SYMBOLS.USDC]: {
      id: process.env.NEXT_PUBLIC_NEAR_USDC_CONTRACT || '',
      decimals: 6,
    },
  };
})();

export const NFT_CONTRACTS: TContracts = (() => {
  return {
    CERTIFICATES: process.env.NEXT_PUBLIC_NEAR_CERT_CONTRACT || '',
    BADGES: process.env.NEXT_PUBLIC_NEAR_BADGES_CONTRACT || '',
  };
})();

export const SWR_CONFIG = {
  fast: {
    revalidateOnFocus: true,
    refreshInterval: 30_000,
    dedupingInterval: 5000,
    shouldRetryOnError: true,
  },
  slow: {
    revalidateOnFocus: false,
    refreshInterval: 60_000,
    dedupingInterval: 10_000,
    shouldRetryOnError: true,
  },
  noRefresh: {
    revalidateOnFocus: false,
    refreshInterval: 0,
    dedupingInterval: 0,
    shouldRetryOnError: false,
  },
} as const;
