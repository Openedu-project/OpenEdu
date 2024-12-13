import type { CSSProperties } from 'react';
import { cn } from '#utils/cn';
import type { ISortableItemProps } from './types';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from '@radix-ui/react-slot';
import { SortableItemContext } from './utils/context';

export function SortableItem<T>({ item, style, className, dragOverlay, renderChildItem }: ISortableItemProps<T>) {
  const { attributes, listeners, setNodeRef, isDragging, transition, transform } = useSortable({
    id: item.id,
    disabled: dragOverlay,
  });
  const itemStyle: CSSProperties = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <SortableItemContext.Provider value={{ attributes, listeners, ref: setNodeRef }}>
      <Slot
        className={cn(className, isDragging && 'relative z-50', dragOverlay && 'bg-background shadow')}
        style={itemStyle}
        ref={dragOverlay ? undefined : setNodeRef}
      >
        {renderChildItem?.({ item })}
      </Slot>
    </SortableItemContext.Provider>
  );
}
