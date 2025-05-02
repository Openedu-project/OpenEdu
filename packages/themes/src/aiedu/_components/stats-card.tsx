import { cn } from '@oe/ui';

interface StatsCardProps {
  percentage: number;
  description: string;
  className?: string;
}
const StatsCard = ({ percentage, description, className }: StatsCardProps) => {
  return (
    <div className={cn('relative flex w-full items-center gap-4', className)}>
      {/* Circle with percentage */}
      <div className="relative flex-shrink-0">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary border-dashed">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <span className="font-bold text-2xl text-primary">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Text description */}
      <div className="flex-grow rounded-full bg-info/20 px-6 py-4">
        <p className="font-medium">{description}</p>
      </div>
    </div>
  );
};

export { StatsCard, type StatsCardProps };
