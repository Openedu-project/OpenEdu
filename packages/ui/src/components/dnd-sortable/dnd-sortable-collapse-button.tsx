'use client';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useDndSortableItemContext } from './dnd-sortable-context';

export const DndSortableCollapseButton = ({ className = '', ...props }: ButtonProps) => {
  const { toggleCollapse, activeItem, descendants } = useDndSortableItemContext();

  if (!(activeItem && (descendants?.length ?? 0) > 0)) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('z-10 h-6 w-6 transition-opacity group-hover/field:opacity-100', className)}
      {...props}
      onClick={() => toggleCollapse?.()}
    >
      {activeItem?.collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </Button>
  );
};
