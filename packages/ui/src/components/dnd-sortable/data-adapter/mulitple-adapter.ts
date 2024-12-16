import {
  type CollisionDetection,
  type DroppableContainer,
  KeyboardCode,
  type KeyboardCoordinateGetter,
  type UniqueIdentifier,
  closestCenter,
  closestCorners,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { uniqueID } from '@oe/core/utils/unique';
import type {
  ICollisionDetectionStrategyProps,
  IDndSortableItem,
  IHandleDragEndProps,
  IHandleDragOverProps,
} from '../types';
import { DataAdapter } from './base-adapter';

export class MultipleAdapter<ItemType, ChildItemType> extends DataAdapter<ItemType, ChildItemType> {
  directions: string[] = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

  convertToContainerItem(data: ItemType[]): IDndSortableItem<ItemType, ChildItemType>[] {
    return data.map(column => ({
      id: column[this.config.idProp as keyof ItemType] ?? uniqueID(),
      original: column,
      items: (column[this.config.childrenProp as keyof ItemType] as ChildItemType[])?.map(item => ({
        id: item[this.config.idItemProp as keyof ChildItemType] ?? uniqueID(),
        original: item,
      })),
    })) as IDndSortableItem<ItemType, ChildItemType>[];
  }

  convertToOriginal(data: IDndSortableItem<ItemType, ChildItemType>[]): ItemType[] {
    return data.map(column => ({
      ...column.original,
      [this.config.childrenProp as keyof ItemType]: column.items?.map(item => item.original),
    }));
  }

  addItem(
    items: IDndSortableItem<ItemType, ChildItemType>[],
    parentId: UniqueIdentifier | null,
    newItem: ItemType | ChildItemType,
    toLast = true
  ): IDndSortableItem<ItemType, ChildItemType>[] {
    const newItems = [...items];

    if (!parentId) {
      return toLast
        ? [...items, { id: uniqueID(), original: newItem as ItemType }]
        : [{ id: uniqueID(), original: newItem as ItemType }, ...items];
    }

    const parent = items.find(item => item.id === parentId);
    const parentIndex = items.findIndex(item => item.id === parent?.id);
    if (!(parent && parentIndex !== -1)) {
      return items;
    }

    if (parent?.items && (parent?.items?.length ?? 0) > 0) {
      parent.items[toLast ? 'push' : 'unshift']({
        id: uniqueID(),
        original: newItem as ChildItemType,
      });
    } else {
      parent.items = [{ id: uniqueID(), original: newItem as ChildItemType }];
    }
    newItems[parentIndex] = parent;
    return newItems;
  }

  coordinateGetter: KeyboardCoordinateGetter = (
    event,
    { context: { active, droppableRects, droppableContainers, collisionRect } }
  ) => {
    if (this.directions.includes(event.code)) {
      event.preventDefault();

      if (!(active && collisionRect)) {
        return;
      }

      const filteredContainers: DroppableContainer[] = [];

      for (const entry of droppableContainers.getEnabled()) {
        if (!entry || entry?.disabled) {
          return;
        }

        const rect = droppableRects.get(entry.id);

        if (!rect) {
          return;
        }

        const data = entry.data.current;

        if (data) {
          const { type, children } = data;

          if (type === 'container' && children?.length > 0) {
            if (active.data.current?.type !== 'container') {
              return;
            }
          }
        }

        switch (event.code) {
          case KeyboardCode.Down:
            if (collisionRect.top < rect.top) {
              filteredContainers.push(entry);
            }
            break;
          case KeyboardCode.Up:
            if (collisionRect.top > rect.top) {
              filteredContainers.push(entry);
            }
            break;
          case KeyboardCode.Left:
            if (collisionRect.left >= rect.left + rect.width) {
              filteredContainers.push(entry);
            }
            break;
          case KeyboardCode.Right:
            if (collisionRect.left + collisionRect.width <= rect.left) {
              filteredContainers.push(entry);
            }
            break;
          default:
            break;
        }
      }

      const collisions = closestCorners({
        active,
        collisionRect: collisionRect,
        droppableRects,
        droppableContainers: filteredContainers,
        pointerCoordinates: null,
      });
      const closestId = getFirstCollision(collisions, 'id');

      if (closestId !== null) {
        const newDroppable = droppableContainers.get(closestId);
        const newNode = newDroppable?.node.current;
        const newRect = newDroppable?.rect.current;

        if (newNode && newRect) {
          if (newDroppable.id === 'placeholder') {
            return {
              x: newRect.left + (newRect.width - collisionRect.width) / 2,
              y: newRect.top + (newRect.height - collisionRect.height) / 2,
            };
          }

          if (newDroppable.data.current?.type === 'container') {
            return {
              x: newRect.left + 20,
              y: newRect.top + 74,
            };
          }

          return {
            x: newRect.left,
            y: newRect.top,
          };
        }
      }
    }

    return undefined;
  };

  collisionDetectionStrategy({
    activeId,
    items,
    lastOverId,
    recentlyMovedToNewContainer,
  }: ICollisionDetectionStrategyProps<ItemType, ChildItemType>): CollisionDetection {
    return args => {
      if (activeId !== null && items.find(item => item.id === activeId)) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container =>
            items.find(item => item.id === container.id)
          ),
        });
      }

      const pointerIntersections = pointerWithin(args);
      const intersections = pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');
      if (overId !== null) {
        const overItem = items.find(item => item.id === overId);
        if (overItem) {
          const containerItems = overItem.items;

          if (containerItems && containerItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                container => container.id !== overId && containerItems.find(item => item.id === container.id)
              ),
            })[0]?.id as string | number;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      if (recentlyMovedToNewContainer?.current) {
        lastOverId.current = activeId;
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    };
  }

  handleDragOver({ active, items, over, recentlyMovedToNewContainer }: IHandleDragOverProps<ItemType, ChildItemType>) {
    const overId = over?.id;

    if (overId == null || (active?.id && items.find(item => item.id === active?.id))) {
      return null;
    }

    const overContainer = this.findId(items, overId);
    const activeContainer = active?.id ? this.findId(items, active.id) : null;

    if (!(overContainer && activeContainer)) {
      return null;
    }
    if (activeContainer !== overContainer) {
      const activeContainerItems = items.find(item => item.id === activeContainer);
      const overContainerItems = items.find(item => item.id === overContainer);

      if (!(activeContainerItems && overContainerItems)) {
        return null;
      }

      const activeIndex = activeContainerItems.items?.findIndex(item => item.id === active?.id);
      const overIndex = overContainerItems.items?.findIndex(item => item.id === overId) ?? -1;

      const activeItem = activeIndex !== undefined ? activeContainerItems.items?.[activeIndex] : undefined;

      const newItems = items.map(container => {
        if (container.id === activeContainer) {
          return {
            ...container,
            items: container.items?.filter(item => item.id !== active?.id),
          };
        }

        if (container.id === overContainer) {
          const newItems = [...(container.items || [])];
          const insertIndex = items.find(item => item.id === overId)
            ? newItems.length
            : overIndex >= 0
              ? overIndex
              : newItems.length;

          if (activeItem) {
            newItems.splice(insertIndex, 0, activeItem);
          }

          return {
            ...container,
            items: newItems,
          };
        }

        return container;
      });

      recentlyMovedToNewContainer.current = true;
      return newItems;
    }

    return null;
  }

  handleDragEnd({ active, items, over, setItems, onChange }: IHandleDragEndProps<ItemType, ChildItemType>) {
    if (!(active?.id && over?.id)) {
      return;
    }
    if (active?.id && items.find(item => item.id === active.id) && over?.id) {
      const containers = items.map(item => item.id);
      const activeIndex = containers.indexOf(active.id);
      const overIndex = containers.indexOf(over.id);
      const newItems = arrayMove(items, activeIndex, overIndex);

      setItems(newItems);
      onChange(this.convertToOriginal(newItems));
      return;
    }

    const activeContainer = active?.id ? this.findId(items, active.id) : null;
    const overId = over?.id;

    const overContainer = this.findId(items, overId);
    if (overContainer) {
      const activeIndex = active?.id
        ? (items.find(item => item.id === activeContainer)?.items?.findIndex(item => item.id === active.id) ?? -1)
        : -1;
      const overIndex = overId
        ? (items.find(item => item.id === overContainer)?.items?.findIndex(item => item.id === overId) ?? -1)
        : -1;
      if (activeIndex !== overIndex) {
        const newItems = items.map(item => {
          if (item.id === overContainer) {
            return {
              ...item,
              items: arrayMove(item.items || [], activeIndex, overIndex),
            };
          }

          return item;
        });

        setItems(newItems);
        onChange(this.convertToOriginal(newItems));
      }
    }
  }
}
