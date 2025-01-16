import type { ICourse } from '@oe/api/types/course/course';
import { formatCurrency } from '@oe/core/utils/currency';
import type { LanguageCode } from '@oe/i18n/languages';
import { languageWithCurrency } from '@oe/ui/components/input-currency';
import { useTranslations } from 'next-intl';

const findLocaleForCurrency = (currencyCode: string): LanguageCode => {
  const entry = Object.entries(languageWithCurrency).find(([_, details]) => details.currencyCode === currencyCode);
  return (entry?.[0] || 'en') as LanguageCode;
};

export default function CoursePrice({
  priceSettings,
  variant = 'block',
}: {
  priceSettings: ICourse['price_settings'];
  variant?: 'block' | 'inline';
}) {
  const tCourses = useTranslations('courses');

  if (!priceSettings) {
    return <span className="giant-iheading-semibold20 text-primary">-</span>;
  }

  if (!priceSettings.is_pay) {
    return <div className="mcaption-bold16 lg:mcaption-bold20 text-success">{tCourses('payment.free')}</div>;
  }

  const fiatLocale = findLocaleForCurrency(priceSettings.fiat_currency);
  const hasFiatDiscount = Number(priceSettings.fiat_discount_price) > 0;
  const hasCryptoDiscount = Number(priceSettings.crypto_discount_price) > 0;

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className={`flex gap-0.5 ${variant === 'block' ? 'flex-col' : 'flex-row flex-wrap items-center gap-2'} `}>
        {hasFiatDiscount ? (
          <>
            <span className="mcaption-bold16 lg:mcaption-bold20">
              {formatCurrency(Number(priceSettings.fiat_discount_price), {
                currency: priceSettings.fiat_currency,
                locale: fiatLocale,
              })}
            </span>
            <span className="mcaption-regular12 lg:mcaption-regular16 text-muted-foreground line-through">
              {formatCurrency(Number(priceSettings.fiat_price), {
                currency: priceSettings.fiat_currency,
                locale: fiatLocale,
              })}
            </span>
          </>
        ) : (
          <span className="mcaption-bold16 lg:mcaption-bold20">
            {formatCurrency(Number(priceSettings.fiat_price), {
              currency: priceSettings.fiat_currency,
              locale: fiatLocale,
            })}
          </span>
        )}
      </div>

      <div className={`flex gap-0.5 ${variant === 'block' ? 'flex-col' : 'flex-row flex-wrap items-center gap-2'} `}>
        {hasCryptoDiscount ? (
          <>
            <span className="mcaption-bold16 lg:mcaption-bold20">
              {formatCurrency(Number(priceSettings.crypto_discount_price), {
                currency: priceSettings.crypto_currency,
                type: 'crypto',
                decimals: 2,
              })}
            </span>
            <span className="mcaption-regular12 lg:mcaption-regular16 text-muted-foreground line-through">
              {formatCurrency(Number(priceSettings.crypto_price), {
                currency: priceSettings.crypto_currency,
                type: 'crypto',
                decimals: 2,
              })}
            </span>
          </>
        ) : (
          <span className="mcaption-bold16 lg:mcaption-bold20">
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
