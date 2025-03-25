import { cn } from '@oe/ui/utils/cn';

interface AchievementStatProps {
  percentage: number;
  description: string;
  variant?: 'primary' | 'secondary';
}

const AchievementStat = ({ percentage, description, variant = 'primary' }: AchievementStatProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg p-4',
        variant === 'primary' ? 'bg-background' : 'bg-secondary'
      )}
    >
      <div className="relative h-24 w-24">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg className="h-full w-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={variant === 'primary' ? '#FFA500' : '#FFFFFF'}
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            className="stroke-current"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-2xl">{percentage}%</span>
        </div>
      </div>
      <p className="mt-2 text-center text-sm">{description}</p>
    </div>
  );
};
AchievementStat.displayName = 'AchievementStat';

export { AchievementStat, type AchievementStatProps };
