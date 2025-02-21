// import type React from 'react';
// import { useCallback, useEffect, useState } from 'react';
// import { Input } from '#shadcn/input';
// import { cn } from '#utils/cn';

// interface InputCurrencyProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
//   value: number | undefined;
//   onChange: (value?: number) => void;
//   locale?: string;
//   className?: string;
//   maxValue?: number;
// }

// const parseNumber = (str: string): number => Number.parseInt(str.replaceAll(/\D/g, ''), 10);

// export function InputCurrency({
//   value,
//   onChange,
//   locale = 'en-US',
//   className,
//   maxValue = Number.MAX_SAFE_INTEGER,
//   ...props
// }: InputCurrencyProps) {
//   const [displayValue, setDisplayValue] = useState('');

//   const formatter = useCallback(
//     () =>
//       new Intl.NumberFormat(locale, {
//         useGrouping: true,
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0,
//       }),
//     [locale]
//   );

//   const formatNumber = useCallback(
//     (num: number | undefined): string => (num === undefined ? '' : formatter().format(num)),
//     [formatter]
//   );

//   useEffect(() => {
//     setDisplayValue(formatNumber(value));
//   }, [value, formatNumber]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value;

//     if (inputValue === '') {
//       onChange(0);
//       setDisplayValue('');
//       return;
//     }

//     const parsedValue = parseNumber(inputValue);

//     if (parsedValue !== undefined && parsedValue <= maxValue) {
//       onChange(parsedValue);
//       setDisplayValue(inputValue);
//     }
//   };

//   const handleBlur = () => {
//     if (value === 0 || value === undefined) {
//       setDisplayValue('');
//       return;
//     }
//     setDisplayValue(formatNumber(value));
//   };

//   return (
//     <Input
//       type="text"
//       value={displayValue}
//       onChange={handleChange}
//       onBlur={handleBlur}
//       className={cn(className)}
//       {...props}
//     />
//   );
// }

// InputCurrency.displayName = 'InputCurrency';

import { languageWithCurrency } from '@oe/i18n/languages-currency';
import { useLocale } from 'next-intl';
import CurrencyInput, { type CurrencyInputProps } from 'react-currency-input-field';
import { cn } from '#utils/cn';

export type InputCurrencyProps = Omit<CurrencyInputProps, 'onChange'> & {
  hasCurrency?: boolean;
  locale?: string;
  onChange: (value: string | undefined) => void;
};

function InputCurrency({ value, onChange, className, hasCurrency = true, locale, ...props }: InputCurrencyProps) {
  const internalLocale = useLocale();

  const handleChange = (value: string | undefined) => {
    onChange?.(value);
  };

  return (
    <CurrencyInput
      value={value}
      onValueChange={handleChange}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      intlConfig={{
        locale: locale ?? internalLocale,
        currency: hasCurrency ? (languageWithCurrency[locale ?? internalLocale]?.currencyCode ?? 'USD') : '',
      }}
      autoComplete="off"
      {...props}
    />
  );
}

export { InputCurrency };
