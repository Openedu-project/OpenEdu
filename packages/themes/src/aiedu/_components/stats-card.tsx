import { cn } from '@oe/ui';

interface StatsCardProps {
  percentage: number;
  description: string;
  className?: string;
}
const StatsCard = ({ percentage, description, className }: StatsCardProps) => {
  return (
    <div className={cn('relative flex w-full items-center gap-2 md:gap-4', className)}>
      {/* Circle with percentage */}
      <div className="relative flex-shrink-0">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary border-dashed md:h-32 md:w-32">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary md:h-24 md:w-24">
            <span className="font-bold text-primary text-xl md:text-3xl">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Text description */}
      <div className="flex-grow rounded-full bg-info/20 p-6">
        <p className="font-medium">{description}</p>
      </div>
    </div>
  );
};

export { StatsCard, type StatsCardProps };
