import { Button, Link, cn } from '@oe/ui';
import { ArrowRight } from 'lucide-react';
interface AieduButtonProps {
  link?: string;
  text?: string;
  variant?: 'default' | 'outline';
  className?: string;
}
const AieduButton = ({ link, text, variant = 'default', className }: AieduButtonProps) => {
  return (
    <Link
      href={link ? link : '#'}
      className={cn(
        '!p-0 h-fit w-full max-w-[300px] border-none hover:no-underline',
        variant === 'outline' && '!text-primary',
        className
      )}
    >
      <Button
        variant={variant === 'default' ? 'default' : 'outline'}
        className={cn(
          '!pr-0 flex h-fit w-full items-center justify-between rounded-full bg-primary px-6 py-3 font-bold text-[16px] text-background hover:bg-primary/80 md:text-[20px]',
          variant === 'outline' && 'border-primary bg-background text-primary hover:bg-background hover:text-primary/80'
        )}
      >
        <span className="mr-4 w-[calc(100%-28px)]"> {text}</span>
        <div className={cn('mr-2 rounded-full bg-background p-1', variant === 'outline' && 'bg-primary')}>
          <ArrowRight className={cn('h-6 w-6 text-primary', variant === 'outline' && 'text-secondary')} />
        </div>
      </Button>
    </Link>
  );
};

export { AieduButton, type AieduButtonProps };
