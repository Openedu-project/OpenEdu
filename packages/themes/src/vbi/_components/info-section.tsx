import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';

interface InfoSectionProps {
  title?: string;
  titleSub?: string;
  button?: {
    text?: string;
    link?: string;
  };
  className?: string;
}
const InfoSection = ({ title, titleSub, button, className }: InfoSectionProps) => {
  return (
    <div className={cn('space-y-6 text-foreground', className)}>
      <h2 className="font-bold text-xl uppercase leading-tight lg:text-3xl">{title}</h2>
      <p className="text-foreground/80 text-lg">{titleSub}</p>

      <Button>
        <Link
          href={button?.link ? button?.link : '#'}
          className="bg-inherit text-primary-foreground hover:no-underline"
        >
          {button?.text}
        </Link>
      </Button>
    </div>
  );
};

InfoSection.displayName = 'InfoSection';

export { InfoSection, type InfoSectionProps };
