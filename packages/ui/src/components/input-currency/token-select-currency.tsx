import { CRYPTO_CURRENCIES, TOKEN_OPTIONS } from '@oe/api';
import { useTranslations } from 'next-intl';
import { Selectbox } from '#components/selectbox';
import type { SelectboxProps } from '../selectbox/selectbox';

export function TokenSelectCurrency(props: Omit<SelectboxProps, 'options'>) {
  const tWallet = useTranslations('wallets');
  return (
    <Selectbox
      {...props}
      options={(TOKEN_OPTIONS.NEAR || []).map(currency => ({
        id: currency.value,
        label: (
          <div className="flex items-center gap-2">
            {CRYPTO_CURRENCIES[currency.value as keyof typeof CRYPTO_CURRENCIES]?.icon({
              className: 'size-4',
            })}
            {tWallet(`currency.${currency.label?.toString()?.toLowerCase()}`)}
          </div>
        ),
        value: currency.value,
      }))}
    />
  );
}
