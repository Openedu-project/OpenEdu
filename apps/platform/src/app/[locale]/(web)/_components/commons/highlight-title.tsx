import { cn } from '@oe/ui/utils/cn';

interface HighlightTitleProps {
  text: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export default function HighlightTitle({ text, className, iconClassName, textClassName }: HighlightTitleProps) {
  return (
    <div className={cn('mb-2 flex items-center gap-2 text-primary', className)}>
      <span className={cn('giant-iheading-semibold24', iconClassName)}>✧</span>
      <span className={cn('giant-iheading-semibold20 md:giant-iheading-semibold24', textClassName)}>{text}</span>
    </div>
  );
}
