import { Plus } from 'lucide-react';
import { formatCompactNumber } from '../_utils/utils';
interface StatItemProps {
  value?: number;
  label: string;
}

interface FeatureItemProps {
  title: string;
  description: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="text-center">
    <div className="mb-2 font-bold text-3xl text-foreground">{value ? formatCompactNumber(value) : 0}</div>
    <div className="text-foreground/80 text-sm uppercase tracking-wider">{label}</div>
  </div>
);

StatItem.displayName = 'StatItem';

const FeatureItem = ({ title, description }: FeatureItemProps) => (
  <div className="flex gap-4">
    <div className="mt-1 shrink-0">
      <div className="flex h-6 w-6 items-center justify-center rounded-xs bg-primary text-background">
        <Plus className="h-4 w-4" />
      </div>
    </div>
    <div>
      <p className="mb-2 font-bold text-foreground text-md">{title}</p>
      <p className="text-foreground/80">{description}</p>
    </div>
  </div>
);

FeatureItem.displayName = 'FeatureItem';

export { type StatItemProps, StatItem, FeatureItem, type FeatureItemProps };
