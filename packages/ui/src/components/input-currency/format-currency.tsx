import { useLocale } from 'next-intl';
import { formatValue } from 'react-currency-input-field';
import { type LanguageCode, languageWithCurrency } from './languages-map';

export function formatCurrency(value: string, hasCurrency = true) {
  const locale = useLocale();

  return formatValue({
    value,
    intlConfig: {
      locale,
      currency: hasCurrency ? (languageWithCurrency[locale as LanguageCode]?.currencyCode ?? 'USD') : '',
    },
  });
}
