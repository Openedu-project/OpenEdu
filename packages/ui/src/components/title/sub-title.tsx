import { BlinkIcon } from '@oe/assets/icons/blink';
import { cn } from '@oe/ui/utils/cn';

const SubTitle = ({ children, className }: { children: string; className?: string }) => {
  return (
    <div className="flex items-center gap-2">
      <BlinkIcon height={40} width={40} />
      <p className={cn('giant-iheading-semibold20 md:giant-iheading-semibold24 line-clamp-2 text-primary', className)}>
        {children}
      </p>
    </div>
  );
};

SubTitle.displayName = 'SubTitle';
export { SubTitle };
