import { cn } from '@oe/ui';

interface TitleProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}
const Title = ({ title, description, variant = 'primary', className }: TitleProps) => {
  return description ? (
    <div className={cn('space-y-2', variant === 'secondary' && 'text-background', className)}>
      <h3
        className={`font-bold text-[32px] capitalize leading-tight lg:text-[40px] ${
          variant === 'secondary' && 'text-background'
        }`}
      >
        {title}
      </h3>
      <p
        className={`relative text-[18px] text-foreground leading-tight md:text-[24px] ${
          variant === 'secondary' && '!text-background'
        }`}
      >
        {description}
      </p>
    </div>
  ) : (
    <h3 className={cn('font-bold text-[32px] lg:text-[40px]', variant === 'secondary' && 'text-background', className)}>
      {title}
    </h3>
  );
};

export { Title, type TitleProps };
