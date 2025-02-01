// Tiền tệ thông thường
// console.log(formatCurrency(1234567.89));
// // "$1,234,567.89"

// console.log(formatCurrency(1234567.89, { locale: 'vi-VN', currency: 'VND' }));
// // "1.234.567,89 ₫"

// console.log(formatCurrency(1234567.89, {
//   locale: 'ja-JP',
//   currency: 'JPY',
//   decimals: 0
// }));
// // "¥1,234,568"

// // Tiền điện tử
// console.log(formatCurrency(0.12345678, {
//   type: 'crypto',
//   currency: 'BTC'
// }));
// // "0.12345678 BTC"

// console.log(formatCurrency(1234.5678, {
//   type: 'crypto',
//   currency: 'ETH',
//   decimals: 4
// }));
// // "1,234.5678 ETH"

// // Không hiển thị ký hiệu tiền tệ
// console.log(formatCurrency(1234.56, { showSymbol: false }));
// // "1,234.56"
import { DEFAULT_LOCALE } from '@oe/i18n/constants';
import type { LanguageCode } from '@oe/i18n/languages';
import { languageWithCurrency } from '@oe/i18n/languages-currency';

export const DEFAULT_CURRENCY = 'USD';

export interface FormatCurrencyOptions extends Intl.NumberFormatOptions {
  locale?: LanguageCode;
  currency?: string;
  // type?: CurrencyType;
  decimals?: number;
  showSymbol?: boolean;
}

export const findLocaleFromCurrency = (currencyCode?: string): LanguageCode => {
  const entry = Object.entries(languageWithCurrency).find(([_, details]) => details.currencyCode === currencyCode);
  return (entry?.[0] || DEFAULT_LOCALE) as LanguageCode;
};

export const findCurrencyFromLocale = (locale: LanguageCode): string => {
  return languageWithCurrency[locale as LanguageCode]?.currencyCode ?? DEFAULT_CURRENCY;
};

const isValidLocale = (locale?: LanguageCode): boolean => {
  return !!locale && locale in languageWithCurrency;
};

const isValidFiatCurrency = (currency?: string): boolean => {
  return !!currency && Object.values(languageWithCurrency).some(details => details.currencyCode === currency);
};

export const formatCurrency = (amount: number, options: FormatCurrencyOptions = {}): string => {
  const { decimals, showSymbol = true, ...rest } = options;

  const locale = isValidLocale(options.locale)
    ? (options.locale as LanguageCode)
    : isValidFiatCurrency(options.currency)
      ? findLocaleFromCurrency(options.currency)
      : DEFAULT_LOCALE;

  const currency = isValidFiatCurrency(options.currency)
    ? options.currency
    : options.currency || findCurrencyFromLocale(locale) || DEFAULT_CURRENCY;

  try {
    const isFiatCurrency = isValidFiatCurrency(currency);

    const formatter = new Intl.NumberFormat(locale, {
      ...(isFiatCurrency && {
        style: 'currency',
        currency,
        currencyDisplay: showSymbol ? 'symbol' : 'code',
      }),
      minimumFractionDigits: decimals ?? (isFiatCurrency ? 2 : 8),
      maximumFractionDigits: decimals ?? (isFiatCurrency ? 2 : 8),
      ...rest,
    });

    const formattedAmount = formatter.format(amount);
    return isFiatCurrency ? formattedAmount : showSymbol ? `${formattedAmount} ${currency}` : formattedAmount;
  } catch {
    return amount.toString();
  }
};
