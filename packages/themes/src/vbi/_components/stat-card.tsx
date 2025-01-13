import { cn } from '@oe/ui/utils/cn';

interface StatCardProps {
  value?: number;
  label?: string;
  className?: string;
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

const StatCard = ({ value, label, className }: StatCardProps) => (
  <div className={cn('text-center', className)}>
    <div className="mb-2 font-bold text-md text-primary md:text-lg lg:text-3xl">
      {value ? formatCompactNumber(value) : 0}
    </div>
    <div className="text-foreground/80 text-sm uppercase tracking-wider">{label}</div>
  </div>
);

StatCard.displayName = 'StatCard';

export { StatCard, type StatCardProps };
