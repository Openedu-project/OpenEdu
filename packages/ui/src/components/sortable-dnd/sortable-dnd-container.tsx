import { type AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';
import type { IContainerItem, IContainerProps } from './types';
import { SortableContainerContext } from './utils/context';

const animateLayoutChanges: AnimateLayoutChanges = args => defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export function SortableDndContainer<T, K>({
  children,
  id,
  item,
  style,
  adapter,
  count,
  renderItem,
  ...props
}: IContainerProps<T, K>) {
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
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...(adapter?.config.type === 'tree' && {
      marginLeft: (item?.depth ?? 0) * (adapter?.config?.indent ?? adapter?.DEFAULT_INDENT_SIZE),
    }),
  };

  return (
    <SortableContainerContext.Provider value={{ attributes, listeners, isOverContainer, ref: setNodeRef }}>
      <div {...props} style={itemStyle} ref={setNodeRef}>
        {renderItem?.({ item: item as IContainerItem<T, K>, count })}
        {children}
      </div>
    </SortableContainerContext.Provider>
  );
}
