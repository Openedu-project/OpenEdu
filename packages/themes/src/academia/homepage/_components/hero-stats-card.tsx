import { cn } from '@oe/ui/utils/cn';
interface StatsCardProps {
  number: number;
  label: string;
  color?: string;
  className?: string;
}

const formatNumber = (number: number): string => {
  if (number >= 10000) {
    return `${Math.floor(number / 1000)}K+`;
  }
  if (number >= 1000) {
    const thousands = (number / 1000).toFixed(1);
    // Remove .0 if it exists
    return `${thousands.endsWith('.0') ? Math.floor(number / 1000) : thousands}K+`;
  }
  if (number >= 100) {
    return '100+';
  }
  return number.toString();
};

export const StatsCard = ({ number, label, color = '#fd86f5', className }: StatsCardProps) => {
  return (
    <div className={cn('relative z-0 h-32 w-32', className)}>
      <div className="-left-4 -top-2 -z-10 absolute h-8 w-8 rounded-full" style={{ backgroundColor: color }} />
      <div className="relative z-0">
        <p className="giant-iheading-bold32">{formatNumber(number)}</p>
        <p className="giant-iheading-regular16 text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};
