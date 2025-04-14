'use client';
import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useDndSortableChildItemContext, useDndSortableItemContext } from './dnd-sortable-context';

const DndSortableDragButtonInternal = ({
  className = '',
  attributes,
  listeners,
  ...props
}: ButtonProps & {
  attributes?: Partial<DraggableAttributes>;
  listeners?: Partial<DraggableSyntheticListeners>;
}) => {
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

export const DndSortableDragButton = (props: ButtonProps) => {
  const { attributes, listeners } = useDndSortableItemContext();
  return <DndSortableDragButtonInternal attributes={attributes} listeners={listeners} {...props} />;
};

export const DndSortableDragButtonChildItem = (props: ButtonProps) => {
  const { attributes, listeners } = useDndSortableChildItemContext();
  return <DndSortableDragButtonInternal attributes={attributes} listeners={listeners} {...props} />;
};
