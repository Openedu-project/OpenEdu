import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';
import { cn } from '#utils/cn';
import { SortableItemContext } from './sortable-context';
import type { IDndSortableBaseItem, IDndSortableItemProps, SortableContextValue } from './types';

const DEFAULT_INDENT_SIZE = 20;
export function SortableItem<T extends IDndSortableBaseItem>({
  children,
  className = '',
  style = {},
  isClone = false,
  data,
  adapter,
  depth,
}: IDndSortableItemProps<T>) {
  const id = adapter.getId(data);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: isClone,
    data,
  });

  const sortableContext: SortableContextValue = {
    attributes,
    listeners,
    ref: setNodeRef,
    isDragging,
    isClone,
  };

  const itemStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...style,
  };

  return (
    <SortableItemContext.Provider value={sortableContext}>
      <div
        ref={setNodeRef}
        className={cn(className, isDragging ? 'relative z-50' : '', isClone ? 'scale-105 bg-background shadow' : '')}
        style={{
          ...itemStyle,
          ...(adapter.config.type === 'tree' && {
            paddingLeft: depth !== undefined ? depth * (adapter.config?.indent ?? DEFAULT_INDENT_SIZE) : 0,
          }),
        }}
      >
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}
