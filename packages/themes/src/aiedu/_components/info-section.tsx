import { cn } from '@oe/ui';
import { AieduButton } from './button';

interface InfoSectionProps {
  title?: string;
  description?: string;
  button?: {
    text?: string;
    link?: string;
  };
  className?: string;
  variant?: 'default' | 'outline';
}
const InfoSection = ({ title, description, button, className, variant = 'default' }: InfoSectionProps) => {
  return (
    <div className={cn('space-y-2 text-foreground md:space-y-6', className)}>
      <h2 className={`font-bold text-[32px] lg:text-[40px] ${variant === 'outline' && 'text-background'}`}>{title}</h2>
      <p
        className={`overflow-hidden text-[18px] text-foreground/80 leading-tight md:max-h-[8.4em] md:text-[24px] ${
          variant === 'outline' && '!text-background'
        }`}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 6,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
        }}
      >
        {description}
      </p>

      {button && <AieduButton link={button?.link} text={button?.text} variant={variant} className="mt-8" />}
    </div>
  );
};

InfoSection.displayName = 'InfoSection';

export { InfoSection, type InfoSectionProps };
