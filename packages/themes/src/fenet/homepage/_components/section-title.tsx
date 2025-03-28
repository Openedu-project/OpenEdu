import { cn } from '@oe/ui/utils/cn';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  centered?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const SectionTitle = ({ subtitle, title, centered = true, variant = 'primary', className }: SectionTitleProps) => {
  return (
    <div className={cn(`max-w-3xl ${centered ? 'mx-auto text-center' : 'text-center md:text-start'}`, className)}>
      <h2
        className={cn(
          // biome-ignore lint/nursery/useSortedClasses: <explanation>
          'mb-4 font-bold text-4xl text-foreground md:text-5xl leading-[1.25] md:leading-[1.25]',
          variant === 'secondary' && 'text-background'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-foreground/80 text-md md:text-lg', variant === 'secondary' && 'text-background/80')}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
SectionTitle.displayName = 'SectionTitle';
export { SectionTitle, type SectionTitleProps };
