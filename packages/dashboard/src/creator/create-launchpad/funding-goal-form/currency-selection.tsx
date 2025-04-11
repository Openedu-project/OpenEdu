import { useGetCurrencyList } from '@oe/api';
import usdcIcon from '@oe/assets/images/icons/usdc-icon.png';
import usdtIcon from '@oe/assets/images/icons/usdt-icon.png';
import { Image } from '@oe/ui';
import { FormControl, FormField, FormItem } from '@oe/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui';
import { Loader2 } from 'lucide-react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type CurrencySelectionProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
};

const currencyIcons: { [key in 'usdt' | 'usdc']: string } = {
  usdt: usdtIcon.src,
  usdc: usdcIcon.src,
};

const CurrencySelection = <TFormValues extends FieldValues>({ form }: CurrencySelectionProps<TFormValues>) => {
  const { dataCurrencyList, isLoadingCurrencyList } = useGetCurrencyList();

  if (isLoadingCurrencyList) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <FormField
      control={form.control}
      name={'currency' as Path<TFormValues>}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-40 rounded-lg">
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {dataCurrencyList?.[0]?.value
                .filter(curr => curr.type === 'crypto')
                .map(currency => (
                  <SelectItem value={currency.symbol} key={currency.symbol}>
                    <div className="flex items-center gap-2">
                      <Image
                        alt="icon"
                        src={currencyIcons[currency.symbol.toLowerCase() as 'usdt' | 'usdc']}
                        width={10}
                        height={10}
                        className="w-6 object-contain"
                      />
                      <p>{currency.symbol}</p>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export { CurrencySelection };
