import type { TAssetList, TBalanceValue, TExchangeRates, TTokenBalances, TWallet } from '#types/wallet';
import { ASSET_TYPES, CHAIN, CURRENCY_SYMBOLS } from './wallet';

export const calculateAssetList = (
  wallets: TWallet[],
  tokenBalances: TTokenBalances,
  exchangeRates: TExchangeRates
): TAssetList[] => {
  const vndWallet = wallets.find(wallet => wallet.currency === CURRENCY_SYMBOLS.VND);
  const usdWallet = wallets.find(wallet => wallet.currency === CURRENCY_SYMBOLS.USD);
  const pointWallet = wallets.find(wallet => wallet.currency === CURRENCY_SYMBOLS.POINT);
  const usdtWallet = wallets.find(wallet => wallet.currency === CURRENCY_SYMBOLS.USDT);
  const usdcWallet = wallets.find(wallet => wallet.currency === CURRENCY_SYMBOLS.USDC);
  const nearWallet = wallets.find(wallet => wallet.network === CHAIN.NEAR);

  const vndBalance = Number.parseFloat(vndWallet?.balance || '0');
  const usdBalance = Number.parseFloat(usdWallet?.balance || '0');
  const pointBalance = Number.parseFloat(pointWallet?.balance || '0');

  const usdtEarningBalance = Number.parseFloat(usdtWallet?.earning_balance || '0');
  const usdcEarningBalance = Number.parseFloat(usdcWallet?.earning_balance || '0');

  const usdToVndExchangeRate = 1 / exchangeRates.VND_USD;

  const fiatAssets: TAssetList[] = [
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
        vnd: usdBalance * usdToVndExchangeRate,
      },
    },
  ];

  const nonFiatAssets: TAssetList[] = [
    {
      wallet_id: nearWallet?.id || '',
      amount: tokenBalances.near.balance || 0,
      type: ASSET_TYPES.TOKEN,
      symbol: CURRENCY_SYMBOLS.NEAR,
      value: (tokenBalances.near.balance || 0) * exchangeRates.NEAR_USD,
      exchangeValue: {
        usd: (tokenBalances.near.balance || 0) * exchangeRates.NEAR_USD,
        vnd: ((tokenBalances.near.balance || 0) * exchangeRates.NEAR_USD) / exchangeRates.VND_USD,
      },
    },
    {
      wallet_id: pointWallet?.id || '',
      amount: pointBalance,
      type: ASSET_TYPES.POINT,
      symbol: CURRENCY_SYMBOLS.POINT,
      value: pointBalance,
    },
    {
      wallet_id: usdtWallet?.id || '',
      amount: tokenBalances.tokens.USDT?.balance || 0,
      type: ASSET_TYPES.TOKEN,
      symbol: CURRENCY_SYMBOLS.USDT,
      value: (tokenBalances.tokens.USDT?.balance || 0) * exchangeRates.USDT_USD,
      exchangeValue: {
        usd: (tokenBalances.tokens.USDT?.balance || 0) * exchangeRates.USDT_USD,
        vnd: ((tokenBalances.tokens.USDT?.balance || 0) * exchangeRates.USDT_USD) / exchangeRates.VND_USD,
      },
      earningBalance: {
        usd: usdtEarningBalance * exchangeRates.USDT_USD,
        vnd: (usdtEarningBalance * exchangeRates.USDT_USD) / exchangeRates.VND_USD,
      },
    },
    {
      wallet_id: usdcWallet?.id || '',
      amount: tokenBalances.tokens.USDC?.balance || 0,
      type: ASSET_TYPES.TOKEN,
      symbol: CURRENCY_SYMBOLS.USDC,
      value: (tokenBalances.tokens.USDC?.balance || 0) * exchangeRates.USDC_USD,
      exchangeValue: {
        usd: (tokenBalances.tokens.USDC?.balance || 0) * exchangeRates.USDC_USD,
        vnd: ((tokenBalances.tokens.USDC?.balance || 0) * exchangeRates.USDC_USD) / exchangeRates.VND_USD,
      },
      earningBalance: {
        usd: usdcEarningBalance * exchangeRates.USDC_USD,
        vnd: (usdcEarningBalance * exchangeRates.USDC_USD) / exchangeRates.VND_USD,
      },
    },
  ];

  const availWallet = wallets.find(wallet => wallet.network === CHAIN.AVAIL);

  if (availWallet) {
    nonFiatAssets.push({
      wallet_id: availWallet.id,
      amount: tokenBalances.tokens.AVAIL.balance || 0,
      type: ASSET_TYPES.TOKEN,
      symbol: CURRENCY_SYMBOLS.AVAIL,
      value: (tokenBalances.tokens.AVAIL.balance || 0) * exchangeRates.AVAIL_USD,
      exchangeValue: {
        usd: (tokenBalances.tokens.AVAIL.balance || 0) * exchangeRates.AVAIL_USD,
        vnd: ((tokenBalances.tokens.AVAIL.balance || 0) * exchangeRates.AVAIL_USD) / exchangeRates.VND_USD,
      },
    });
  }

  const sortedNonFiatAssets = nonFiatAssets.sort((a, b) => (b.value || 0) - (a.value || 0));
  return [...fiatAssets, ...sortedNonFiatAssets];
};

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
