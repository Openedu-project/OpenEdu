'use client';
import type { CSSProperties } from 'react';
import { cn } from '#utils/cn';
import type { IDndSortableChildItemProps } from './types';

import { useSortable } from '@dnd-kit/sortable';
import { Slot } from '@radix-ui/react-slot';
import { DndSortableChildItemContext } from './dnd-sortable-context';

export function DndSortableChildItem<ChildItemType>({
  item,
  style,
  className,
  dragOverlay,
  children,
}: IDndSortableChildItemProps<ChildItemType>) {
  const { attributes, listeners, setNodeRef, isDragging, transition, transform } = useSortable({
    id: item.id,
    disabled: dragOverlay,
  });
  const itemStyle: CSSProperties = {
    ...style,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(1) scaleY(1)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <DndSortableChildItemContext.Provider value={{ attributes, listeners, setNodeRef }}>
      <Slot
        className={cn(className, isDragging && 'relative z-50', dragOverlay && 'bg-background shadow-sm')}
        style={itemStyle}
        ref={dragOverlay ? undefined : setNodeRef}
      >
        {children}
      </Slot>
    </DndSortableChildItemContext.Provider>
  );
}
