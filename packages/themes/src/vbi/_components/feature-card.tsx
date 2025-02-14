import { Card } from '@oe/ui/shadcn/card';
import { cn } from '@oe/ui/utils/cn';

interface FeatureCardProps {
  title: string;
  description: string;
  variant?: 'default' | 'primary';
  className?: string;
}

const FeatureCard = ({ title, description, variant = 'default', className }: FeatureCardProps) => (
  <Card className={cn('p-6 md:p-8', variant === 'primary' ? 'bg-primary text-accent' : 'bg-muted', className)}>
    <h3 className="mb-4 font-bold text-xl md:text-2xl">{title}</h3>
    <p
      className={cn(
        'text-sm md:text-base lg:text-lg',
        variant === 'primary' ? 'text-accent/80' : 'text-accent-foreground/80'
      )}
    >
      {description}
    </p>
  </Card>
);

export { FeatureCard, type FeatureCardProps };
