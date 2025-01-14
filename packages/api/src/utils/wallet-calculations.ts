import type { TAssetList, TBalanceValue, TExchangeRates, TTokenBalances, TWallet } from '#types/wallet';
import { ASSET_TYPES, CHAIN, CURRENCY_SYMBOLS } from './wallet';

// Tính earning balance từ USDT và USDC
export const calculateEarnings = (wallets: TWallet[], exchangeRates: TExchangeRates): TBalanceValue => {
  const usdtWallet = wallets.find(w => w.currency === CURRENCY_SYMBOLS.USDT);
  const usdcWallet = wallets.find(w => w.currency === CURRENCY_SYMBOLS.USDC);

  const usdtEarningBalance = Number.parseFloat(usdtWallet?.earning_balance || '0');
  const usdcEarningBalance = Number.parseFloat(usdcWallet?.earning_balance || '0');

  const totalUSD = usdtEarningBalance * exchangeRates.USDT_USD + usdcEarningBalance * exchangeRates.USDC_USD;

  return {
    usd: totalUSD,
    vnd: totalUSD / exchangeRates.VND_USD,
  };
};

// Tính giá trị của fiat assets (VND, USD)
export const calculateFiatAssets = (wallets: TWallet[], exchangeRates: TExchangeRates): TAssetList[] => {
  const vndWallet = wallets.find(w => w.currency === CURRENCY_SYMBOLS.VND);
  const usdWallet = wallets.find(w => w.currency === CURRENCY_SYMBOLS.USD);

  const vndBalance = Number.parseFloat(vndWallet?.balance || '0');
  const usdBalance = Number.parseFloat(usdWallet?.balance || '0');

  return [
    {
      wallet_id: vndWallet?.id || '',
      amount: vndBalance,
      type: ASSET_TYPES.FIAT,
      symbol: CURRENCY_SYMBOLS.VND,
      value: vndBalance,
      exchangeValue: {
        usd: vndBalance * exchangeRates.VND_USD,
        vnd: vndBalance,
      },
    },
    {
      wallet_id: usdWallet?.id || '',
      amount: usdBalance,
      type: ASSET_TYPES.FIAT,
      symbol: CURRENCY_SYMBOLS.USD,
      value: usdBalance,
      exchangeValue: {
        usd: usdBalance,
        vnd: usdBalance / exchangeRates.VND_USD,
      },
    },
  ];
};

// Tính giá trị của NEAR token
export const calculateNearAsset = (
  wallet: TWallet | undefined,
  balance: number,
  exchangeRates: TExchangeRates
): TAssetList => {
  const usdValue = balance * exchangeRates.NEAR_USD;

  return {
    wallet_id: wallet?.id || '',
    amount: balance,
    type: ASSET_TYPES.TOKEN,
    symbol: CURRENCY_SYMBOLS.NEAR,
    value: usdValue,
    exchangeValue: {
      usd: usdValue,
      vnd: usdValue / exchangeRates.VND_USD,
    },
  };
};

// Tính giá trị của stablecoin assets (USDT, USDC)
export const calculateStablecoinAssets = (
  wallets: TWallet[],
  tokenBalances: TTokenBalances,
  exchangeRates: TExchangeRates
): TAssetList[] => {
  const usdtWallet = wallets.find(w => w.currency === CURRENCY_SYMBOLS.USDT);
  const usdcWallet = wallets.find(w => w.currency === CURRENCY_SYMBOLS.USDC);

  const usdtBalance = tokenBalances.tokens.USDT?.balance || 0;
  const usdcBalance = tokenBalances.tokens.USDC?.balance || 0;

  const usdtEarningBalance = Number.parseFloat(usdtWallet?.earning_balance || '0');
  const usdcEarningBalance = Number.parseFloat(usdcWallet?.earning_balance || '0');

  return [
    {
      wallet_id: usdtWallet?.id || '',
      amount: usdtBalance,
      type: ASSET_TYPES.TOKEN,
      symbol: CURRENCY_SYMBOLS.USDT,
      value: usdtBalance * exchangeRates.USDT_USD,
      exchangeValue: {
        usd: usdtBalance * exchangeRates.USDT_USD,
        vnd: (usdtBalance * exchangeRates.USDT_USD) / exchangeRates.VND_USD,
      },
      earningBalance: {
        usd: usdtEarningBalance * exchangeRates.USDT_USD,
        vnd: (usdtEarningBalance * exchangeRates.USDT_USD) / exchangeRates.VND_USD,
      },
    },
    {
      wallet_id: usdcWallet?.id || '',
      amount: usdcBalance,
      type: ASSET_TYPES.TOKEN,
      symbol: CURRENCY_SYMBOLS.USDC,
      value: usdcBalance * exchangeRates.USDC_USD,
      exchangeValue: {
        usd: usdcBalance * exchangeRates.USDC_USD,
        vnd: (usdcBalance * exchangeRates.USDC_USD) / exchangeRates.VND_USD,
      },
      earningBalance: {
        usd: usdcEarningBalance * exchangeRates.USDC_USD,
        vnd: (usdcEarningBalance * exchangeRates.USDC_USD) / exchangeRates.VND_USD,
      },
    },
  ];
};

// Tính giá trị của Avail token
export const calculateAvailAsset = (
  wallet: TWallet | undefined,
  balance: number,
  exchangeRates: TExchangeRates
): TAssetList => {
  const usdValue = balance * exchangeRates.AVAIL_USD;

  return {
    wallet_id: wallet?.id || '',
    amount: balance,
    type: ASSET_TYPES.TOKEN,
    symbol: CURRENCY_SYMBOLS.AVAIL,
    value: usdValue,
    exchangeValue: {
      usd: usdValue,
      vnd: usdValue / exchangeRates.VND_USD,
    },
  };
};

// Tính point balance
export const calculatePointAsset = (wallet: TWallet | undefined): TAssetList => {
  const pointBalance = Number.parseFloat(wallet?.balance || '0');

  return {
    wallet_id: wallet?.id || '',
    amount: pointBalance,
    type: ASSET_TYPES.POINT,
    symbol: CURRENCY_SYMBOLS.POINT,
    value: pointBalance,
  };
};

// Hàm tính tổng asset value
export const calculateTotalAssetValue = (assetList: TAssetList[]): TBalanceValue => {
  return assetList.reduce(
    (total, asset) => ({
      usd: total.usd + (asset.exchangeValue?.usd || 0),
      vnd: total.vnd + (asset.exchangeValue?.vnd || 0),
    }),
    { usd: 0, vnd: 0 }
  );
};

// Hàm gốc backward compatible
export const calculateAssetList = (
  wallets: TWallet[],
  tokenBalances: TTokenBalances,
  exchangeRates: TExchangeRates
): TAssetList[] => {
  const fiatAssets = calculateFiatAssets(wallets, exchangeRates);
  const nearAsset = calculateNearAsset(
    wallets.find(w => w.network === CHAIN.NEAR),
    tokenBalances.near.balance || 0,
    exchangeRates
  );
  const stablecoinAssets = calculateStablecoinAssets(wallets, tokenBalances, exchangeRates);
  const pointAsset = calculatePointAsset(wallets.find(w => w.currency === CURRENCY_SYMBOLS.POINT));

  const availWallet = wallets.find(w => w.network === CHAIN.AVAIL);
  const availAsset = availWallet
    ? calculateAvailAsset(availWallet, tokenBalances.tokens.AVAIL.balance || 0, exchangeRates)
    : null;

  const allAssets = [...fiatAssets, nearAsset, pointAsset, ...stablecoinAssets, ...(availAsset ? [availAsset] : [])];

  return allAssets.sort((a, b) => (b.value || 0) - (a.value || 0));
};

// cũ
export const calculateTotals = (assetList: TAssetList[]): [TBalanceValue, TBalanceValue] => {
  const totalEarning: TBalanceValue = { vnd: 0, usd: 0 };
  const totalAssetValue: TBalanceValue = { vnd: 0, usd: 0 };

  for (const asset of assetList) {
    totalEarning.vnd += asset.earningBalance?.vnd || 0;
    totalEarning.usd += asset.earningBalance?.usd || 0;

    totalAssetValue.vnd += asset.exchangeValue?.vnd || 0;
    totalAssetValue.usd += asset.exchangeValue?.usd || 0;
  }

  return [totalEarning, totalAssetValue];
};
