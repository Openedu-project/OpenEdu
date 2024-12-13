import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useSortableContainerContext, useSortableItemContext } from './utils/context';

export const DragButton = ({
  className = '',
  attributes,
  listeners,
  ...props
}: ButtonProps & { attributes: Partial<DraggableAttributes>; listeners: Partial<DraggableSyntheticListeners> }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('z-10 h-6 w-6 transition-opacity group-hover/field:opacity-100', className)}
      {...attributes}
      {...listeners}
      {...props}
    >
      <GripVertical className="h-4 w-4" />
    </Button>
  );
};

export const DragButtonContainer = (props: ButtonProps) => {
  const { attributes, listeners } = useSortableContainerContext();
  return <DragButton attributes={attributes} listeners={listeners} {...props} />;
};

export const DragButtonItem = (props: ButtonProps) => {
  const { attributes, listeners } = useSortableItemContext();
  return <DragButton attributes={attributes} listeners={listeners} {...props} />;
};
