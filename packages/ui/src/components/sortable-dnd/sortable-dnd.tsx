import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  type DropAnimation,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '#utils/cn';
import { SortableDndContainer } from './sortable-dnd-container';
import { SortableItem } from './sortable-item';
import type { IContainerItem, IMultipleSortableProps } from './types';
import { createDataAdapter } from './utils/create-adapter';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export function SortableDnd<T, K>({
  data,
  dataConfig,
  dndContextProps,
  dragOverlayProps,
  className,
  renderConfig,
  onSort,
}: IMultipleSortableProps<T, K>) {
  const [items, setItems] = useState<IContainerItem<T, K>[]>([]);
  const [containers, setContainers] = useState<UniqueIdentifier[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [descendantsCount, setDescendantsCount] = useState(0);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const adapter = createDataAdapter(dataConfig);

  const [clonedItems, setClonedItems] = useState<IContainerItem<T, K>[] | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: adapter.coordinateGetter,
    })
  );

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    setClonedItems(items);

    if (adapter.config.type === 'tree') {
      const activeIndex = items.findIndex(item => item.id === active.id);
      const descendants = adapter.findAllDescendants(items, activeIndex);

      const filteredItems = items.filter(item => !descendants.find(d => d.id === item.id));
      setItems(filteredItems);
      setContainers(filteredItems.map(item => item.id));
      setDescendantsCount(descendants.length);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const result = adapter.handleDragOver({
      active: event.active,
      over: event.over,
      items,
      recentlyMovedToNewContainer,
    });
    if (result) {
      recentlyMovedToNewContainer.current = true;
      setItems(result);
    }
  };

  const onDragEnd = (event: DragEndEvent) =>
    adapter.handleDragEnd({
      ...event,
      items,
      clonedItems,
      setContainers,
      setActiveId,
      setItems,
      dataConfig,
      onSort,
    });

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
      setContainers(clonedItems.map(item => item.id));
      onSort(adapter.convertToOriginal(clonedItems));
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  useEffect(() => {
    const items = adapter.convertToContainerItem(data);
    setItems(items);
    setContainers(items.map(item => item.id));
  }, [data, adapter.convertToContainerItem]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={adapter.collisionDetectionStrategy({
        activeId,
        items,
        lastOverId,
        recentlyMovedToNewContainer,
      })}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      {...dndContextProps}
    >
      <div className={cn('flex gap-4', className)}>
        <SortableContext
          items={containers}
          strategy={dataConfig?.direction === 'vertical' ? verticalListSortingStrategy : horizontalListSortingStrategy}
        >
          {containers.map(containerId => {
            const container = items?.find(item => item.id === containerId);
            const { renderChildItem, ...containerProps } = renderConfig ?? {};
            return (
              <SortableDndContainer
                key={containerId}
                id={containerId}
                item={container}
                adapter={adapter}
                {...containerProps}
              >
                {container?.items ? (
                  dataConfig?.childDnDContextProps ? (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={adapter.collisionDetectionStrategy({
                        activeId,
                        items,
                        lastOverId,
                        recentlyMovedToNewContainer,
                      })}
                      measuring={{
                        droppable: {
                          strategy: MeasuringStrategy.Always,
                        },
                      }}
                      onDragStart={onDragStart}
                      onDragOver={onDragOver}
                      onDragEnd={onDragEnd}
                      onDragCancel={onDragCancel}
                      {...(typeof dataConfig?.childDnDContextProps === 'object'
                        ? dataConfig?.childDnDContextProps
                        : {})}
                    >
                      <SortableContext
                        items={container.items?.map(item => item.id) ?? []}
                        strategy={
                          dataConfig?.itemDirection === 'vertical'
                            ? verticalListSortingStrategy
                            : horizontalListSortingStrategy
                        }
                      >
                        {container.items?.map(item => {
                          return <SortableItem<K> key={item.id} renderChildItem={renderChildItem} item={item} />;
                        })}
                      </SortableContext>
                    </DndContext>
                  ) : (
                    <SortableContext
                      items={container.items?.map(item => item.id) ?? []}
                      strategy={
                        dataConfig?.itemDirection === 'vertical'
                          ? verticalListSortingStrategy
                          : horizontalListSortingStrategy
                      }
                    >
                      {container.items?.map(item => {
                        return <SortableItem<K> key={item.id} renderChildItem={renderChildItem} item={item} />;
                      })}
                    </SortableContext>
                  )
                ) : null}
              </SortableDndContainer>
            );
          })}
        </SortableContext>
      </div>
      {typeof window !== 'undefined' &&
        createPortal(
          <DragOverlay dropAnimation={dropAnimation} {...dragOverlayProps}>
            {activeId
              ? containers.includes(activeId)
                ? renderContainerDragOverlay(activeId)
                : renderSortableItemDragOverlay(activeId)
              : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    const item = adapter.findItemById(items, id);

    if (!item) {
      return null;
    }

    return <SortableItem<K> item={item} renderChildItem={renderConfig?.renderChildItem} dragOverlay />;
  }

  function renderContainerDragOverlay(containerId: UniqueIdentifier) {
    const { renderChildItem, ...containerProps } = renderConfig ?? {};

    return (
      <SortableDndContainer
        id={containerId}
        item={items?.find(item => item.id === containerId)}
        adapter={adapter}
        count={descendantsCount}
        {...containerProps}
      >
        {items
          ?.find(item => item.id === containerId)
          ?.items?.map(item => (
            <SortableItem<K> key={item.id} item={item} renderChildItem={renderChildItem} />
          ))}
      </SortableDndContainer>
    );
  }
}
