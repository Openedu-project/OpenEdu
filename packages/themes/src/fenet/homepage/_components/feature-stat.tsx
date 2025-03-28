import { cn } from '@oe/ui/utils/cn';

interface FeatureStatProps {
  description?: string;
  title?: string;
  borderBottom?: boolean;
  className?: string;
}

const FeatureStat = ({ description, title, className, borderBottom = false }: FeatureStatProps) => {
  return (
    <div className={cn('mx-auto grid max-w-xl grid-cols-3 gap-4 p-2', borderBottom ? 'border-b' : '', className)}>
      <p className={cn('col-span-1 font-bold text-accent text-lg md:text-xl')}>{title}</p>
      <p className={cn('col-span-2 line-clamp-2 text-accent/80 text-md md:text-lg')}>{description}</p>
    </div>
  );
};
FeatureStat.displayName = 'FeatureStat';
export { FeatureStat, type FeatureStatProps };
