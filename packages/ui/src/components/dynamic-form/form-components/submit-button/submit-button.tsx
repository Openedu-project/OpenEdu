import { FormSubmitButton } from '#shadcn/form';
import { cn } from '#utils/cn';

export function SubmitButton({ text, align }: { text: string; align?: 'start' | 'center' | 'end' }) {
  return (
    <div
      className={cn(
        'flex',
        align === 'center' && 'justify-center',
        align === 'end' && 'justify-end',
        align === 'start' && 'justify-start'
      )}
    >
      <FormSubmitButton label={text} />
    </div>
  );
}
