import { cn } from '#utils/cn';

export function Heading({
  text,
  align,
  headingType = 'h1',
}: { text: string; align?: 'start' | 'center' | 'end'; headingType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }) {
  const Tag = headingType;
  return (
    <Tag
      className={cn(
        'm-0',
        align === 'center' && 'text-center',
        align === 'end' && 'text-right',
        align === 'start' && 'text-left'
      )}
    >
      {text}
    </Tag>
  );
}
