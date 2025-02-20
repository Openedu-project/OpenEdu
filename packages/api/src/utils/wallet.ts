import { AvailIcon } from '@oe/assets/icons/currencies/avail';
import { EthIcon } from '@oe/assets/icons/currencies/eth';
import { NearIcon } from '@oe/assets/icons/currencies/near';
import { OpeneduIcon } from '@oe/assets/icons/currencies/openedu';
import { UsdIcon } from '@oe/assets/icons/currencies/usd';
import { UsdcIcon } from '@oe/assets/icons/currencies/usdc';
import { UsdtIcon } from '@oe/assets/icons/currencies/usdt';
import { VndIcon } from '@oe/assets/icons/currencies/vnd';
import { DEFAULT_CURRENCY } from '@oe/core/utils/currency';
import { languageWithCurrency } from '@oe/i18n/languages-currency';
import type { SelectboxOption } from '@oe/ui/components/selectbox';
import type { IExchangeRates } from '#types/exchange-rates';
import type { TTokenContracts } from '#types/wallet';

export const FIAT_CURRENCIES = {
  USD: {
    icon: UsdIcon,
    value: 'USD',
    name: 'usd',
  },
  VND: {
    icon: VndIcon,
    value: 'VND',
    name: 'vnd',
  },
};

export const CRYPTO_CURRENCIES = {
  NEAR: {
    icon: NearIcon,
    value: 'NEAR',
    name: 'near',
    explorerTx: 'https://nearblocks.io/txns',
    explorerAddr: 'https://nearblocks.io/address',
    explorerNFT: 'https://nearblocks.io/nft-token',
  },
  ETH: {
    icon: EthIcon,
    value: 'ETH',
    name: 'eth',
    explorerTx: 'https://etherscan.io/tx',
    explorerAddr: 'https://etherscan.io/address',
    explorerNFT: 'https://etherscan.io/nft',
  },
  AVAIL: {
    icon: AvailIcon,
    value: 'AVAIL',
    name: 'avail',
    explorerTx: 'https://avail.subscan.io/extrinsic',
    explorerAddr: 'https://avail.subscan.io/account',
    explorerNFT: 'https://avail.subscan.io/nft',
  },
  USDT: {
    icon: UsdtIcon,
    value: 'USDT',
    name: 'usdt',
    explorerTx: '',
    explorerAddr: '',
    explorerNFT: '',
  },
  USDC: {
    icon: UsdcIcon,
    value: 'USDC',
    name: 'usdc',
    explorerTx: '',
    explorerAddr: '',
    explorerNFT: '',
  },
  OPENEDU: {
    icon: OpeneduIcon,
    value: 'OPENEDU',
    name: 'openedu',
    explorerTx: '',
    explorerAddr: '',
  },
};

export const NETWORK_OPTIONS: SelectboxOption[] = [
  { value: 'NEAR', label: 'NEAR', id: 'NEAR' },
  { value: 'AVAIL', label: 'AVAIL', id: 'AVAIL' },
  { value: 'ETH', label: 'ETH', id: 'ETH' },
];

export const TOKEN_OPTIONS: Record<string, SelectboxOption[]> = {
  NEAR: [
    { value: 'NEAR', label: 'NEAR', id: 'NEAR' },
    { value: 'USDT', label: 'USDT', id: 'USDT' },
    { value: 'USDC', label: 'USDC', id: 'USDC' },
  ],
  AVAIL: [{ value: 'AVAIL', label: 'AVAIL', id: 'AVAIL' }],
  ETHEREUM: [],
};

export const WITHDRAW_TYPE = {
  FIAT: 'fiat',
  TOKEN: 'token',
} as const;

export type TWithdrawType = (typeof WITHDRAW_TYPE)[keyof typeof WITHDRAW_TYPE];
export const SUPPORTED_EXCHANGE_RATES = { ...FIAT_CURRENCIES, ...CRYPTO_CURRENCIES };
export type SupportedExchangeRate = (typeof SUPPORTED_EXCHANGE_RATES)[keyof typeof SUPPORTED_EXCHANGE_RATES];

export const currencyConverter = Object.values(languageWithCurrency).reduce(
  (acc, { currencyCode }) => {
    if (!(currencyCode in acc)) {
      acc[currencyCode] = {
        toUSD: (value: number, rates: IExchangeRates) => {
          if (!(currencyCode in SUPPORTED_EXCHANGE_RATES)) {
            return 0;
          }
          if (currencyCode === DEFAULT_CURRENCY) {
            return value;
          }
          const rate = rates[`${currencyCode}_${DEFAULT_CURRENCY}`];
          return value * (rate || 0);
        },
        fromUSD: (value: number, rates: IExchangeRates) => {
          if (!(currencyCode in SUPPORTED_EXCHANGE_RATES)) {
            return value;
          }
          if (currencyCode === DEFAULT_CURRENCY) {
            return value;
          }
          const rate = rates[`${DEFAULT_CURRENCY}_${currencyCode}`];
          return value * (rate || 0);
        },
      };
    }
    return acc;
  },
  {} as Record<
    string,
    {
      toUSD: (value: number, rates: IExchangeRates) => number;
      fromUSD: (value: number, rates: IExchangeRates) => number;
    }
  >
);

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

export const walletPageParams = {
  ADD_BANK: 'add-bank-account',
} as const;

export type TWalletPageParams = (typeof walletPageParams)[keyof typeof walletPageParams];

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
      id: process.env.NEXT_PUBLIC_NEAR_USDT_CONTRACT,
      decimals: 6,
    },
    [CURRENCY_SYMBOLS.USDC]: {
      id: process.env.NEXT_PUBLIC_NEAR_USDC_CONTRACT,
      decimals: 6,
    },
  };
})();

export const NFT_CONTRACTS = {
  CERTIFICATES: process.env.NEXT_PUBLIC_NEAR_CERT_CONTRACT,
  BADGES: process.env.NEXT_PUBLIC_NEAR_BADGES_CONTRACT,
};

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
