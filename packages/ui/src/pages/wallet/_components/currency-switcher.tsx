'use client';
import { FIAT_CURRENCIES } from '@oe/api';
// import { FIAT_CURRENCIES } from "@oe/api";
import { findCurrencyFromLocale } from '@oe/core';
import type { LanguageCode } from '@oe/i18n';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { Selectbox } from '#components/selectbox';
import { useWalletStore } from '../_store/useWalletStore';

export const CurrencySwitcher = () => {
  const locale = useLocale() as LanguageCode;
  const { selectedCurrency, setSelectedCurrency } = useWalletStore();
  // const tCurrency = useTranslations("wallets.currency");

  useEffect(() => {
    setSelectedCurrency(findCurrencyFromLocale(locale));
  }, [locale, setSelectedCurrency]);

  return (
    <Selectbox
      value={selectedCurrency}
      onChange={setSelectedCurrency}
      className="w-40"
      displayValue={currency => {
        const Icon = FIAT_CURRENCIES[currency as keyof typeof FIAT_CURRENCIES]?.icon;
        return (
          <span className="flex items-center gap-2">
            {Icon && <Icon />}
            {currency}
          </span>
        );
      }}
      options={Object.values(FIAT_CURRENCIES).map(currency => ({
        id: currency.value,
        value: currency.value,
        label: (
          <span className="flex items-center gap-2">
            <currency.icon />
            {currency.value}
          </span>
        ),
      }))}
    />
  );
};
