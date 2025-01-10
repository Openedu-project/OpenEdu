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
import type { LanguageCode } from '@oe/i18n/languages';

type CurrencyType = 'fiat' | 'crypto';

interface FormatCurrencyOptions {
  locale?: LanguageCode;
  currency?: string;
  type?: CurrencyType;
  decimals?: number;
  showSymbol?: boolean;
}

export const formatCurrency = (amount: number, options: FormatCurrencyOptions = {}): string => {
  const { locale = 'en-US', currency = 'USD', type = 'fiat', decimals, showSymbol = true } = options;

  try {
    if (type === 'crypto') {
      const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals ?? 8,
        maximumFractionDigits: decimals ?? 8,
      });

      const formattedAmount = formatter.format(amount);
      return showSymbol ? `${formattedAmount} ${currency}` : formattedAmount;
    }

    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals ?? 2,
      maximumFractionDigits: decimals ?? 2,
      currencyDisplay: showSymbol ? 'symbol' : 'code',
    });

    return formatter.format(amount);
  } catch {
    return amount.toString();
  }
};
