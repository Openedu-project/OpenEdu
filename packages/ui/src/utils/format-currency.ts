const defaultOptions: Intl.NumberFormatOptions = {
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

export const formatCurrency = (
  value: number | undefined,
  locale = 'en-US',
  options: Intl.NumberFormatOptions = defaultOptions
): string => {
  if (value === undefined) {
    return '';
  }

  const formatter = new Intl.NumberFormat(locale, options);

  return formatter.format(value);
};

export function formatVNDCurrency(type: string, amount: number) {
  return formatCurrency(amount, 'en-US', {
    useGrouping: true,
    minimumFractionDigits: type.toUpperCase() === 'VND' ? 0 : 2,
    maximumFractionDigits: type.toUpperCase() === 'VND' ? 0 : 2,
  });
}
