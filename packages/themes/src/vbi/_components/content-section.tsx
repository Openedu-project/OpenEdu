import { cn } from '@oe/ui/utils/cn';

interface ContentSectionProps {
  title?: string;
  description?: string;
  className?: string;
}
const ContentSection = ({ title, description, className }: ContentSectionProps) => {
  return (
    <div className={cn('space-y-4 text-foreground', className)}>
      <h2 className="font-bold text-lg leading-tight lg:text-xl">{title}</h2>
      <p className="text-md lg:text-lg">{description}</p>
    </div>
  );
};

ContentSection.displayName = 'ContentSection';

export { ContentSection, type ContentSectionProps };
