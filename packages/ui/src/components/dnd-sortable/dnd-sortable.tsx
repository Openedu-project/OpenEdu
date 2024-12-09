import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { SortableContainer } from './sortable-container';
import type { IDndSortableBaseItem, IDndSortableProps } from './types';
import { createDataAdapter } from './utils';

export function DndSortable<T extends IDndSortableBaseItem>({
  items,
  onSort,
  renderItem,
  className = '',
  containerProps,
  dragOverlayProps = {},
  dataConfig = {
    type: 'array',
  },
  useDragOverlay = true,
  ...rest
}: IDndSortableProps<T>) {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const adapter = createDataAdapter<T>(dataConfig);
  const normalizedItems = adapter.normalize(items);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log('handleDragStart', event.active.id);
    setActiveId(event.active.id);
  };

  const handleDragCancel = () => {
    console.log('handleDragCancel');
    setActiveId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const newItems = adapter.updateItems(normalizedItems, event);
    console.log('newItems', adapter.denormalize(newItems), event);
    onSort(adapter.denormalize(newItems));
  };

  const activeItem = activeId ? normalizedItems.find(item => adapter.getId(item) === activeId) : null;
  console.log('activeId', activeId, normalizedItems, activeItem);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      {...rest}
    >
      <SortableContainer
        {...containerProps}
        items={normalizedItems}
        renderItem={renderItem}
        className={className}
        adapter={adapter}
      />

      {useDragOverlay && (
        <DragOverlay
          {...dragOverlayProps}
          dropAnimation={{
            ...defaultDropAnimation,
            ...dragOverlayProps.dropAnimation,
          }}
        >
          {activeId && activeItem && renderItem({ item: activeItem, isClone: true, adapter, depth: 0 })}
        </DragOverlay>
      )}
    </DndContext>
  );
}
