import { cn } from '#utils/cn';

export function Paragraph({ text, align }: { text: string; align?: 'start' | 'center' | 'end' }) {
  return (
    <p
      className={cn(
        'text-muted-foreground',
        align === 'center' && 'text-center',
        align === 'end' && 'text-right',
        align === 'start' && 'text-left'
      )}
    >
      {text}
    </p>
  );
}
