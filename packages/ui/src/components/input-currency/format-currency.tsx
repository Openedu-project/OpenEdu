import { type LanguageCode, languageWithCurrency } from '@oe/i18n/languages-currency';
import { useLocale } from 'next-intl';
import { formatValue } from 'react-currency-input-field';

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
