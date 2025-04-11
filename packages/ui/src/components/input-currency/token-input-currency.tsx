import { InputCurrency, type InputCurrencyProps } from './input-currency';

export function TokenInputCurrency({ currency, ...props }: InputCurrencyProps & { currency: string }) {
  return <InputCurrency intlConfig={undefined} suffix={currency} {...props} />;
}
