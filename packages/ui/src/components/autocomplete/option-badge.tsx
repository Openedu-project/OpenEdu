import { X } from 'lucide-react';
import { Badge } from '#shadcn/badge';
import { cn } from '#utils/cn';

interface OptionBadgeProps {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
  isFixed?: boolean;
}

export function OptionBadge({ label, onRemove, disabled, isFixed }: OptionBadgeProps) {
  return (
    <Badge
      className={cn(
        'h-6 leading-3',
        disabled && 'cursor-not-allowed',
        isFixed && 'bg-muted text-muted-foreground hover:bg-muted'
      )}
    >
      {label}
      {!(disabled || isFixed) && (
        <button
          className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          type="button"
          onClick={e => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
