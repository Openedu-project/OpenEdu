import { GripVertical } from 'lucide-react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useSortableContext } from './sortable-context';

export const DragHandle = ({ className = '' }: { className?: string }) => {
  const { attributes, listeners } = useSortableContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('z-10 h-6 w-6 transition-opacity group-hover/field:opacity-100', className)}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-4 w-4" />
    </Button>
  );
};
