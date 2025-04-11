'use client';
import { type AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import type { CSSProperties } from 'react';
import { DndSortableItemContext } from './dnd-sortable-context';
import type { IDndSortableItemProps } from './types';

const animateLayoutChanges: AnimateLayoutChanges = args => defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export function DndSortableItem<ItemType, ChildItemType>({
  children,
  id,
  item,
  style,
  className,
  content,
  adapter,
  descendants,
  toggleCollapse,
  ...props
}: IDndSortableItemProps<ItemType, ChildItemType>) {
  const { active, attributes, isDragging, listeners, over, setNodeRef, transition, transform } = useSortable({
    id,
    data: {
      type: 'container',
      children: item?.items ?? [],
    },
    animateLayoutChanges,
  });
  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== 'container') ||
      (item?.items?.findIndex(item => item.id === over.id) ?? -1) !== -1
    : false;

  const itemStyle: CSSProperties = {
    ...style,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(1) scaleY(1)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...(adapter?.config.type === 'tree' && {
      paddingLeft: (item?.depth ?? 0) * (adapter?.config?.indent ?? adapter?.DEFAULT_INDENT_SIZE),
    }),
  };

  return (
    <DndSortableItemContext.Provider
      value={{
        attributes,
        listeners,
        isOverContainer,
        activeItem: item,
        descendants,
        setNodeRef,
        toggleCollapse,
      }}
    >
      <div {...props} className={className} style={itemStyle} ref={setNodeRef}>
        {content}
        {children}
      </div>
    </DndSortableItemContext.Provider>
  );
}
