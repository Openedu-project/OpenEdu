import { cn } from '@oe/ui';

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description: string;
  centered?: boolean;
  variant?: 'primary' | 'secondary';
}

const SectionHeader = ({ subtitle, title, description, centered = true, variant = 'primary' }: SectionHeaderProps) => {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : 'text-center sm:text-start'}`}>
      <h3
        className={cn(
          'mb-3 font-semibold text-primary text-sm uppercase tracking-wider md:text-lg',
          variant === 'secondary' && 'text-background'
        )}
      >
        {subtitle}
      </h3>
      <h2
        className={cn(
          'mb-4 font-bold text-3xl text-foreground md:text-4xl',
          variant === 'secondary' && 'text-background'
        )}
      >
        {title}
      </h2>
      <p className={cn('text-foreground/80 text-md md:text-lg', variant === 'secondary' && 'text-background/80')}>
        {description}
      </p>
    </div>
  );
};
SectionHeader.displayName = 'SectionHeader';
export { SectionHeader, type SectionHeaderProps };
