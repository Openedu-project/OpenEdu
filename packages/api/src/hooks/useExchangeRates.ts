import { DEFAULT_CURRENCY, type FormatCurrencyOptions, formatCurrency } from '@oe/core';
import useSWR from 'swr';
import type { IExchangeRates } from '#types/exchange-rates';
import type { HTTPResponse } from '#types/fetch';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';

const RATE_SEPARATOR = '_';

type ConversionStrategy = {
  canApply: (rates: IExchangeRates, from: string, to: string) => boolean;
  convert: (amount: number, rates: IExchangeRates, from: string, to: string) => number;
};

const conversionStrategies: ConversionStrategy[] = [
  // Direct conversion
  {
    canApply: (rates, from, to) => !!rates[`${from}_${to}`],
    convert: (amount, rates, from, to) => amount * (rates[`${from}_${to}`] || 0),
  },
  // Reverse conversion
  {
    canApply: (rates, from, to) => !!rates[`${to}_${from}`],
    convert: (amount, rates, from, to) => amount / (rates[`${to}_${from}`] || 0),
  },
  // Through USD
  {
    canApply: (rates, from, to) => !!rates[`${from}_${DEFAULT_CURRENCY}`] && !!rates[`${DEFAULT_CURRENCY}_${to}`],
    convert: (amount, rates, from, to) =>
      amount * (rates[`${from}_${DEFAULT_CURRENCY}`] || 0) * (rates[`${DEFAULT_CURRENCY}_${to}`] || 0),
  },
  // Through USD reverse
  {
    canApply: (rates, from, to) => !!rates[`${to}_${DEFAULT_CURRENCY}`] && !!rates[`${DEFAULT_CURRENCY}_${from}`],
    convert: (amount, rates, from, to) =>
      amount / ((rates[`${to}_${DEFAULT_CURRENCY}`] || 0) * (rates[`${DEFAULT_CURRENCY}_${from}`] || 0)),
  },
];

export const useExchangeRates = () => {
  const {
    data: exchangeRatesData,
    isLoading,
    mutate,
  } = useSWR<HTTPResponse<IExchangeRates>>(API_ENDPOINT.EXCHANGE_RATES, fetchAPI, {
    revalidateOnMount: true,
  });

  const rates = exchangeRatesData?.data;

  const getSupportedCurrencies = () => {
    if (!rates) {
      return new Set<string>();
    }

    const currencies = new Set<string>();
    for (const key of Object.keys(rates)) {
      if (key.includes('last_update_at') || key.includes('next_update_at')) {
        continue;
      }
      const [from, to] = key.split(RATE_SEPARATOR);
      if (from) {
        currencies.add(from);
      }
      if (to) {
        currencies.add(to);
      }
    }
    return currencies;
  };

  const convertCurrency = (
    amount: number,
    from: string,
    to: string = DEFAULT_CURRENCY,
    options?: FormatCurrencyOptions
  ): number | string => {
    if (rates && amount && from !== to) {
      const strategy = conversionStrategies.find(s => s.canApply(rates, from, to));
      const convertedAmount = strategy ? strategy.convert(amount, rates, from, to) : 0;

      return options ? formatCurrency(convertedAmount, { currency: to, ...options }) : convertedAmount;
    }

    return options ? formatCurrency(amount, { currency: to, ...options }) : amount;
  };

  return {
    exchangeRates: rates,
    exchangeRatesLoading: isLoading,
    mutateExchangeRates: mutate,
    convertCurrency,
    supportedExchangeRatesCurrencies: getSupportedCurrencies(),
  };
};
