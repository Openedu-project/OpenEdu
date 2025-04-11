import { FIAT_CURRENCIES } from '@oe/api';
import { useTranslations } from 'next-intl';
import { Selectbox } from '#components/selectbox';
import type { SelectboxProps } from '../selectbox/selectbox';

export function FiatSelectCurrency(props: Omit<SelectboxProps, 'options'>) {
  const tWallet = useTranslations('wallets');
  return (
    <Selectbox
      {...props}
      displayValue={currency => {
        const Icon = FIAT_CURRENCIES[currency as keyof typeof FIAT_CURRENCIES]?.icon;
        return (
          <span className="flex items-center gap-2">
            {Icon && <Icon />}
            {tWallet(`currency.${currency?.toString()?.toLowerCase()}`)}
          </span>
        );
      }}
      options={Object.values(FIAT_CURRENCIES).map(currency => ({
        id: currency.value,
        value: currency.value,
        label: (
          <span className="flex items-center gap-2">
            <currency.icon />
            {tWallet(`currency.${currency?.value?.toString()?.toLowerCase()}`)}
          </span>
        ),
      }))}
    />
  );
}
