import { cn } from '@oe/ui';

interface StatCardProps {
  value?: number;
  label?: string;
  className?: string;
  variant?: 'default' | 'primary';
}

/**
 * Formats a number into a concise string representation using K notation
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 0)
 * @param addPlus - Whether to add '+' for values over 1000 (default: true)
 * @returns Formatted string
 */
const formatCompactNumber = (value: number, decimals?: number, addPlus?: boolean): string => {
  // Handle invalid input
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return '0';
  }

  // Handle negative numbers
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  // Format number based on range
  let formattedValue: string;
  if (absoluteValue < 1000) {
    formattedValue = absoluteValue.toFixed(decimals);
  } else {
    const k = absoluteValue / 1000;
    // Round to specified decimal places
    formattedValue = `${k.toFixed(decimals)}K`;

    // Add plus sign for values over 1000 if requested
    if (addPlus && absoluteValue >= 1000) {
      formattedValue += '+';
    }
  }

  // Add negative sign back if necessary
  return isNegative ? `-${formattedValue}` : formattedValue;
};

const StatCard = ({ value, label, className, variant = 'default' }: StatCardProps) => (
  <div className={cn('text-center', className)}>
    <div
      className={cn(
        'mb-2 font-bold text-primary text-sm md:text-lg lg:text-3xl',
        variant === 'primary' && 'text-accent'
      )}
    >
      {value ? formatCompactNumber(value) : 0}
    </div>
    <div
      className={cn(
        'max-w-[80px] text-primary text-xs tracking-wider sm:max-w-[100px] lg:max-w-[200px]',
        variant === 'primary' && 'text-accent'
      )}
    >
      {label}
    </div>
  </div>
);

StatCard.displayName = 'StatCard';

export { StatCard, type StatCardProps };
