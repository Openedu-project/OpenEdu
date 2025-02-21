import { useExchangeRates } from '@oe/api/hooks/useExchangeRates';
import { findLocaleFromCurrency } from '@oe/core/utils/currency';
import { formatDateTime } from '@oe/core/utils/datetime';
import {
  FiatSelectCurrency,
  InputCurrency,
  TokenInputCurrency,
  TokenSelectCurrency,
} from '@oe/ui/components/input-currency';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Switch } from '@oe/ui/shadcn/switch';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function PriceForm({ loading }: { loading: boolean }) {
  const tCourse = useTranslations('course');
  const { exchangeRates, convertCurrency } = useExchangeRates();

  const form = useFormContext();

  const isPay = useWatch({ name: 'is_pay' });
  const fiatUnitCost = useWatch({ name: 'fiat_unit_cost' });
  const fiatDiscountPrice = useWatch({ name: 'fiat_discount_price' });
  const cryptoEnabled = useWatch({ name: 'crypto_payment_enabled' });
  const cryptoUnitCost = useWatch({ name: 'crypto_unit_cost' });
  const cryptoDiscountPrice = useWatch({ name: 'crypto_discount_price' });
  const fiatCurrency = form.watch('fiat_currency');
  const cryptoCurrency = form.watch('crypto_currency');

  useEffect(() => {
    const cost = Math.floor(Number(fiatUnitCost)) || 0;
    const discount = Math.floor(Number(fiatDiscountPrice)) || 0;
    const final = Math.max(0, cost - discount);
    form.setValue('fiat_price', final.toString());
  }, [fiatUnitCost, fiatDiscountPrice, form]);

  useEffect(() => {
    const cost = Number(cryptoUnitCost) || 0;
    const discount = Number(cryptoDiscountPrice) || 0;
    const final = Math.max(0, cost - discount);
    form.setValue('crypto_price', final.toString());
  }, [cryptoUnitCost, cryptoDiscountPrice, form]);

  const syncFiatToCrypto = () => {
    const convertedCost = convertCurrency(Number(fiatUnitCost), fiatCurrency, cryptoCurrency);
    form.setValue('crypto_unit_cost', convertedCost.toString());

    const convertedDiscount = convertCurrency(Number(fiatDiscountPrice), fiatCurrency, cryptoCurrency);
    form.setValue('crypto_discount_price', convertedDiscount.toString());
  };

  const syncCryptoToFiat = () => {
    const convertedCost = Math.floor(convertCurrency(Number(cryptoUnitCost), cryptoCurrency, fiatCurrency) as number);
    form.setValue('fiat_unit_cost', convertedCost.toString());

    const convertedDiscount = Math.floor(
      convertCurrency(Number(cryptoDiscountPrice), cryptoCurrency, fiatCurrency) as number
    );
    form.setValue('fiat_discount_price', convertedDiscount.toString());
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 border-b p-4 shadow-sm">
        <h2 className="mb-0 font-medium text-lg">{tCourse('price.title')}</h2>
        <FormFieldWithLabel
          name="is_pay"
          label={tCourse('price.free')}
          infoText={tCourse('price.isFreeInfo')}
          isToggleField
          render={({ field }) => (
            <Switch checked={!field.value} onCheckedChange={checked => field.onChange(!checked)} />
          )}
        />
        <Button size="sm" className="ml-auto gap-2" type="submit" disabled={loading} loading={loading}>
          {tCourse('common.actions.save')}
          <CheckIcon className="h-4 w-4" />
        </Button>
      </div>

      {isPay && (
        <div className="scrollbar flex h-full flex-col space-y-6 overflow-y-auto p-4">
          {/* Fiat Currency Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="mb-0 font-medium text-base">{tCourse('price.fiatCurrency')}</h3>
              {cryptoEnabled && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={syncFiatToCrypto}
                  className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                  {tCourse('price.syncToCrypto')}
                </Button>
              )}
            </div>
            <FormFieldWithLabel
              name="fiat_currency"
              infoText={tCourse('price.fiatCurrencyInfo')}
              render={({ field }) => <FiatSelectCurrency value={field.value} onChange={field.onChange} />}
            />

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <FormFieldWithLabel
                name="fiat_unit_cost"
                label={tCourse('price.unitCost')}
                infoText={tCourse('price.unitCostInfo')}
                className="relative flex-1"
                formMessageClassName="absolute"
                render={({ field }) => (
                  <InputCurrency
                    value={field.value}
                    locale={findLocaleFromCurrency(fiatCurrency)}
                    allowNegativeValue={false}
                    onChange={value => {
                      field.onChange(value);
                      // if (cryptoEnabled && Number(cryptoUnitCost) === 0) {
                      //   const convertedValue = convertCurrency(
                      //     Number(value),
                      //     form.watch("fiat_currency"),
                      //     form.watch("crypto_currency")
                      //   );
                      //   console.log(convertedValue);
                      //   form.setValue(
                      //     "crypto_unit_cost",
                      //     convertedValue.toString()
                      //   );
                      // }
                    }}
                  />
                )}
              />

              <FormFieldWithLabel
                name="fiat_discount_price"
                label={tCourse('price.discountPrice')}
                infoText={tCourse('price.discountPriceInfo')}
                className="relative flex-1"
                formMessageClassName="absolute"
                render={({ field }) => (
                  <InputCurrency
                    value={field.value}
                    locale={findLocaleFromCurrency(fiatCurrency)}
                    allowNegativeValue={false}
                    onChange={value => {
                      field.onChange(value);
                      // if (cryptoEnabled && Number(cryptoDiscountPrice) === 0) {
                      //   const convertedValue = convertCurrency(
                      //     Number(value),
                      //     form.watch("fiat_currency"),
                      //     form.watch("crypto_currency")
                      //   );
                      //   form.setValue(
                      //     "crypto_discount_price",
                      //     convertedValue.toString()
                      //   );
                      // }
                    }}
                  />
                )}
              />

              <FormFieldWithLabel
                name="fiat_price"
                label={tCourse('price.finalPrice')}
                infoText={tCourse('price.finalPriceInfo')}
                className="relative flex-1"
                formMessageClassName="absolute"
                render={({ field }) => (
                  <InputCurrency
                    value={field.value}
                    locale={findLocaleFromCurrency(fiatCurrency)}
                    allowNegativeValue={false}
                    onChange={field.onChange}
                    disabled
                  />
                )}
              />
            </div>
          </div>

          <FormFieldWithLabel
            name="crypto_payment_enabled"
            label={tCourse('price.enableCrypto')}
            infoText={tCourse('price.enableCryptoInfo')}
            isToggleField
            render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
          />

          {/* Crypto Currency Section */}
          {cryptoEnabled && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="mb-0 font-medium text-base">{tCourse('price.cryptoCurrency')}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={syncCryptoToFiat}
                  className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowUpIcon className="h-4 w-4" />
                  {tCourse('price.syncToFiat')}
                </Button>
              </div>
              <FormFieldWithLabel
                name="crypto_currency"
                infoText={tCourse('price.cryptoCurrencyInfo')}
                render={({ field }) => (
                  <TokenSelectCurrency value={field.value} onChange={field.onChange} disabled={!cryptoEnabled} />
                )}
              />

              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <FormFieldWithLabel
                  name="crypto_unit_cost"
                  label={tCourse('price.cryptoUnitCost')}
                  infoText={tCourse('price.cryptoUnitCostInfo')}
                  className="relative flex-1"
                  formMessageClassName="absolute"
                  render={({ field }) => (
                    <TokenInputCurrency
                      currency={form.watch('crypto_currency')}
                      value={field.value}
                      allowNegativeValue={false}
                      onChange={value => {
                        field.onChange(value);
                        // if (Number(fiatUnitCost) === 0) {
                        //   const convertedValue = convertCurrency(
                        //     Number(value),
                        //     form.watch("crypto_currency"),
                        //     form.watch("fiat_currency")
                        //   );
                        //   form.setValue(
                        //     "fiat_unit_cost",
                        //     convertedValue.toString()
                        //   );
                        // }
                      }}
                    />
                  )}
                />

                <FormFieldWithLabel
                  name="crypto_discount_price"
                  label={tCourse('price.cryptoDiscountPrice')}
                  infoText={tCourse('price.cryptoDiscountPriceInfo')}
                  className="relative flex-1"
                  formMessageClassName="absolute"
                  render={({ field }) => (
                    <TokenInputCurrency
                      currency={form.watch('crypto_currency')}
                      value={field.value}
                      allowNegativeValue={false}
                      onChange={value => {
                        field.onChange(value);
                        // if (Number(fiatDiscountPrice) === 0) {
                        //   const convertedValue = convertCurrency(
                        //     Number(value),
                        //     form.watch("crypto_currency"),
                        //     form.watch("fiat_currency")
                        //   );
                        //   form.setValue(
                        //     "fiat_discount_price",
                        //     convertedValue.toString()
                        //   );
                        // }
                      }}
                    />
                  )}
                />

                <FormFieldWithLabel
                  name="crypto_price"
                  label={tCourse('price.cryptoPrice')}
                  infoText={tCourse('price.cryptoPriceInfo')}
                  className="relative flex-1"
                  formMessageClassName="absolute"
                  render={({ field }) => (
                    <TokenInputCurrency
                      currency={form.watch('crypto_currency')}
                      value={field.value}
                      allowNegativeValue={false}
                      onChange={field.onChange}
                      disabled
                    />
                  )}
                />
              </div>
            </div>
          )}

          {/* Exchange Rate Display */}
          {cryptoEnabled && (
            <div className="mt-4 space-y-2 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <h4 className="mb-0 font-medium text-sm">{tCourse('price.exchangeRate')}</h4>
                <p className="text-muted-foreground text-xs">
                  <span className="mr-1 font-medium">{tCourse('price.lastUpdated')}:</span>
                  {formatDateTime(exchangeRates?.USD_VND_last_update_at || 0)}
                </p>
              </div>
              <div className="space-y-1 text-gray-600 text-sm">
                <p>
                  <span className="mr-1 font-medium">1 {form.watch('fiat_currency')} =</span>
                  {convertCurrency(1, form.watch('fiat_currency'), form.watch('crypto_currency'))}
                  {form.watch('crypto_currency')}
                </p>
                <p>
                  <span className="mr-1 font-medium">1 {form.watch('crypto_currency')} =</span>
                  {convertCurrency(1, form.watch('crypto_currency'), form.watch('fiat_currency'))}
                  {form.watch('fiat_currency')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
