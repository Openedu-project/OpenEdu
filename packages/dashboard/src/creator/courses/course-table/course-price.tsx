import type { ICourse } from '@oe/api/types/course/course';
import { formatCurrency } from '@oe/core/utils/currency';
import type { LanguageCode } from '@oe/i18n/languages';
import { languageWithCurrency } from 'node_modules/@oe/ui/src/components/input-currency/languages-map';

const findLocaleForCurrency = (currencyCode: string): LanguageCode => {
  const entry = Object.entries(languageWithCurrency).find(([_, details]) => details.currencyCode === currencyCode);
  return (entry?.[0] || 'en') as LanguageCode;
};

export default function CoursePrice({
  priceSettings,
}: {
  priceSettings: ICourse['price_settings'];
}) {
  if (!priceSettings) {
    return <span className="giant-iheading-semibold20 text-primary">-</span>;
  }

  if (!priceSettings.is_pay) {
    return <div className="font-medium text-sm text-success">Free</div>;
  }

  const fiatLocale = findLocaleForCurrency(priceSettings.fiat_currency);
  const hasFiatDiscount = Number(priceSettings.fiat_discount_price) > 0;
  const hasCryptoDiscount = Number(priceSettings.crypto_discount_price) > 0;

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex flex-col gap-0.5">
        {hasFiatDiscount ? (
          <>
            <span>
              {formatCurrency(Number(priceSettings.fiat_discount_price), {
                currency: priceSettings.fiat_currency,
                locale: fiatLocale,
              })}
            </span>
            <span className="text-muted-foreground text-xs line-through">
              {formatCurrency(Number(priceSettings.fiat_price), {
                currency: priceSettings.fiat_currency,
                locale: fiatLocale,
              })}
            </span>
          </>
        ) : (
          <span>
            {formatCurrency(Number(priceSettings.fiat_price), {
              currency: priceSettings.fiat_currency,
              locale: fiatLocale,
            })}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        {hasCryptoDiscount ? (
          <>
            <span>
              {formatCurrency(Number(priceSettings.crypto_discount_price), {
                currency: priceSettings.crypto_currency,
                type: 'crypto',
                decimals: 2,
              })}
            </span>
            <span className="text-muted-foreground text-xs line-through">
              {formatCurrency(Number(priceSettings.crypto_price), {
                currency: priceSettings.crypto_currency,
                type: 'crypto',
                decimals: 2,
              })}
            </span>
          </>
        ) : (
          <span>
            {formatCurrency(Number(priceSettings.crypto_price), {
              currency: priceSettings.crypto_currency,
              type: 'crypto',
              decimals: 2,
            })}
          </span>
        )}
      </div>
    </div>
  );
}
