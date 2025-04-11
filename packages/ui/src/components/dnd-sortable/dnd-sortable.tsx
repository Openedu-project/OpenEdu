'use client';
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
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from '#components/spinner';
import { cn } from '#utils/cn';
import { createDataAdapter } from './data-adapter';
import { DndSortableChildItem } from './dnd-sortable-child-item';
import { DndSortableItem } from './dnd-sortable-item';
import type { IDndSortableChildItem, IDndSortableItem, IDndSortableProps, RenderChildItemFunction } from './types';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const defaultDndContextConfig = {
  measuring: {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  },
};

export function DndSortable<ItemType, ChildItemType>({
  data,
  dataConfig,
  dndContextProps,
  dragOverlayProps,
  className,
  renderConfig,
  ref,
  loading,
  onChange,
}: IDndSortableProps<ItemType, ChildItemType>) {
  const [items, setItems] = useState<IDndSortableItem<ItemType, ChildItemType>[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);

  const adapter = useMemo(() => createDataAdapter(dataConfig), [dataConfig]);

  const [clonedItems, setClonedItems] = useState<IDndSortableItem<ItemType, ChildItemType>[] | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: adapter.coordinateGetter,
    })
  );

  const updateItems = useCallback(
    (newItems: IDndSortableItem<ItemType, ChildItemType>[]) => {
      setItems(newItems);
      onChange?.(adapter.convertToOriginal(newItems));
    },
    [adapter, onChange]
  );

  const toggleCollapse = useCallback(
    (activeItemId: UniqueIdentifier) => {
      const activeItem = items.find(currentItem => currentItem.id === activeItemId);
      if (!activeItem) {
        return;
      }

      const newItems = adapter.toggleCollapse({
        activeItem,
        items,
        clonedItems,
        setItems,
      });
      if (newItems) {
        updateItems(newItems as IDndSortableItem<ItemType, ChildItemType>[]);
      }
    },
    [adapter, items, clonedItems, updateItems]
  );

  const onDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setActiveId(active.id);

      if (dataConfig?.type === 'tree') {
        toggleCollapse(active.id);
      }
    },
    [dataConfig, toggleCollapse]
  );

  const onDragOver = useCallback(
    (event: DragOverEvent) => {
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
    },
    [adapter, items]
  );

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      adapter.handleDragEnd({
        ...event,
        items,
        clonedItems,
        setItems,
        dataConfig,
        onChange,
      });
      setActiveId(null);
    },
    [adapter, items, clonedItems, dataConfig, onChange]
  );

  const onDragCancel = useCallback(() => {
    if (clonedItems) {
      updateItems(clonedItems);
    }

    setActiveId(null);
  }, [clonedItems, updateItems]);

  const addItem = useCallback(
    (parentId: UniqueIdentifier | null, defaultItem: ItemType | ChildItemType) => {
      const newItems = adapter.addItem(items, parentId, defaultItem);
      updateItems(newItems as IDndSortableItem<ItemType, ChildItemType>[]);
    },
    [adapter, items, updateItems]
  );

  const removeItem = useCallback(
    (item: IDndSortableItem<ItemType, ChildItemType> | IDndSortableChildItem<ChildItemType>) => {
      const newItems = adapter.removeItem(items, item.id);
      updateItems(newItems as IDndSortableItem<ItemType, ChildItemType>[]);
    },
    [adapter, items, updateItems]
  );

  const updateItem = useCallback(
    (
      value: ItemType[keyof ItemType] | ChildItemType[keyof ChildItemType],
      key: keyof ItemType | keyof ChildItemType,
      item: IDndSortableItem<ItemType, ChildItemType> | IDndSortableChildItem<ChildItemType>
    ) => {
      const newItems = adapter.updateItem(value, key, item, items);
      updateItems(newItems as IDndSortableItem<ItemType, ChildItemType>[]);
    },
    [adapter, items, updateItems]
  );

  const updateItemWithNewItem = useCallback(
    (
      newItem: ItemType | ChildItemType,
      currentItem: IDndSortableItem<ItemType, ChildItemType> | IDndSortableChildItem<ChildItemType>
    ) => {
      const newItemContainer = adapter.convertToContainerItem([newItem as ItemType])[0];
      const newItems = adapter.updateItemWithNewItem(newItemContainer, currentItem, items);
      updateItems(newItems as IDndSortableItem<ItemType, ChildItemType>[]);
      // return adapter.convertToOriginal(newItems);
    },
    [adapter, items, updateItems]
  );

  useImperativeHandle(
    ref,
    () => ({
      items: items.map(item => item.original),
      addItem: (defaultItem: ItemType | ChildItemType) => addItem(null, defaultItem),
    }),
    [addItem, items]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  useEffect(() => {
    const items = adapter.convertToContainerItem(data);
    setItems(items);
    setClonedItems(items);
  }, [data, adapter.convertToContainerItem]);

  const renderSortableChildItemDragOverlay = useCallback(
    (id: UniqueIdentifier) => {
      const item = adapter.findItemById(items, id);
      if (!item) {
        return null;
      }
      return (
        <DndSortableChildItem<ChildItemType> item={item} dragOverlay>
          {renderConfig?.renderChildItem?.({
            item,
            onRemoveItem: () => removeItem(item),
          })}
        </DndSortableChildItem>
      );
    },
    [adapter, items, renderConfig?.renderChildItem, removeItem]
  );

  const renderSortableItemDragOverlay = useCallback(
    (containerId: UniqueIdentifier) => {
      const { renderItem, renderChildItem, ...containerProps } = renderConfig ?? {};
      const descendants = adapter.findAllDescendants(clonedItems ?? [], containerId);
      return (
        <DndSortableItem
          id={containerId}
          item={items?.find(item => item.id === containerId)}
          adapter={adapter}
          content={renderItem?.({
            items: adapter.convertToOriginal(items),
            item: items?.find(item => item.id === containerId) as IDndSortableItem<ItemType, ChildItemType>,
            descendants: descendants,
            dragOverlay: true,
            index: 0,
          })}
          descendants={descendants}
          {...containerProps}
        >
          {items
            ?.find(item => item.id === containerId)
            ?.items?.map(item => (
              <DndSortableChildItem<ChildItemType> key={item.id} item={item} dragOverlay>
                {renderChildItem?.({
                  item,
                  onRemoveItem: () => removeItem(item),
                })}
              </DndSortableChildItem>
            ))}
        </DndSortableItem>
      );
    },
    [adapter, items, clonedItems, renderConfig, removeItem]
  );

  const collisionDetection = useMemo(
    () =>
      adapter.collisionDetectionStrategy({
        activeId,
        items,
        lastOverId,
        recentlyMovedToNewContainer,
      }),
    [adapter, activeId, items]
  );

  const renderSortableChildItems = useCallback(
    (
      containerItems: IDndSortableChildItem<ChildItemType>[],
      renderChildItem?: RenderChildItemFunction<ChildItemType>
    ) => (
      <SortableContext
        items={containerItems?.map(item => item.id) ?? []}
        strategy={
          dataConfig?.itemDirection === 'vertical' ? verticalListSortingStrategy : horizontalListSortingStrategy
        }
      >
        {containerItems?.map(item => (
          <DndSortableChildItem<ChildItemType> key={item.id} item={item}>
            {renderChildItem?.({
              item,
              onRemoveItem: () => removeItem(item),
              onUpdateItem: updateItem,
              onUpdateItemWithNewItem: updateItemWithNewItem,
            })}
          </DndSortableChildItem>
        ))}
      </SortableContext>
    ),
    [dataConfig?.itemDirection, removeItem, updateItem, updateItemWithNewItem]
  );

  const dndContextCommonProps = {
    sensors,
    collisionDetection,
    ...defaultDndContextConfig,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragCancel,
  };

  return (
    <DndContext {...dndContextCommonProps} {...dndContextProps}>
      <div className={cn('relative flex gap-4', className)}>
        <SortableContext
          items={items.map(item => item.id)}
          strategy={dataConfig?.direction === 'vertical' ? verticalListSortingStrategy : horizontalListSortingStrategy}
        >
          {items.map((item, index) => {
            const { renderItem, renderChildItem, ...containerProps } = renderConfig ?? {};
            const descendants = adapter.findAllDescendants(clonedItems ?? [], item.id);
            return (
              <DndSortableItem
                key={item.id}
                id={item.id}
                item={item}
                adapter={adapter}
                content={renderItem?.({
                  items: adapter.convertToOriginal(items),
                  item,
                  dragOverlay: false,
                  descendants,
                  index,
                  onAddChild: (defaultItem: ChildItemType) => addItem(item.id, defaultItem),
                  onRemoveItem: () => removeItem(item),
                  onUpdateItem: updateItem,
                  onUpdateItemWithNewItem: updateItemWithNewItem,
                })}
                descendants={descendants}
                toggleCollapse={() => toggleCollapse(item.id)}
                {...containerProps}
              >
                {item?.items &&
                  (dataConfig?.childDnDContextProps ? (
                    <DndContext
                      {...dndContextCommonProps}
                      {...(typeof dataConfig?.childDnDContextProps === 'object'
                        ? dataConfig?.childDnDContextProps
                        : {})}
                    >
                      {renderSortableChildItems(item.items, renderChildItem)}
                    </DndContext>
                  ) : (
                    renderSortableChildItems(item.items, renderChildItem)
                  ))}
              </DndSortableItem>
            );
          })}
        </SortableContext>
        {loading && <Spinner className="z-50 bg-transparent" hasIcon={false} />}
      </div>
      {typeof window !== 'undefined' &&
        createPortal(
          <DragOverlay dropAnimation={dropAnimation} {...dragOverlayProps}>
            {activeId
              ? items.find(item => item.id === activeId)
                ? renderSortableItemDragOverlay(activeId)
                : renderSortableChildItemDragOverlay(activeId)
              : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
