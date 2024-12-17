import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { uniqueID } from '@oe/core/utils/unique';
import type { IDndSortableItem, IHandleDragEndProps, IToggleCollapseProps } from '../types';
import { DataAdapter } from './base-adapter';

export class TreeAdapter<ItemType, ChildItemType> extends DataAdapter<ItemType, ChildItemType> {
  setChildren(item: ItemType, children: ItemType[]): ItemType {
    (item[this.config.childrenProp as keyof ItemType] as unknown as ItemType[]) = children;
    return item;
  }

  convertToContainerItem(data: ItemType[]): IDndSortableItem<ItemType, ChildItemType>[] {
    const flattenTree = (
      items: ItemType[],
      parentId: UniqueIdentifier | null = null,
      depth = 0
    ): IDndSortableItem<ItemType, ChildItemType>[] => {
      return (
        (items?.flatMap(item => [
          { id: item[this.config.idProp as keyof ItemType] ?? uniqueID(), original: item, parentId, depth },
          ...flattenTree(
            (item[this.config.childrenProp as keyof ItemType] as ItemType[])?.map(child => ({
              ...child,
              [this.config.idProp as keyof ItemType]: child[this.config.idProp as keyof ItemType],
            })) ?? [],
            item[this.config.idProp as keyof ItemType] as UniqueIdentifier,
            depth + 1
          ),
        ]) as IDndSortableItem<ItemType, ChildItemType>[]) ?? []
      );
    };

    return flattenTree(data);
  }

  convertToOriginal(data: IDndSortableItem<ItemType, ChildItemType>[]): ItemType[] {
    const nodeMap = new Map<UniqueIdentifier, ItemType>();
    const childrenMap = new Map<UniqueIdentifier, UniqueIdentifier[]>();

    for (const item of data) {
      const { [this.config.childrenProp as keyof ItemType]: children, ...restData } = item.original;
      nodeMap.set(item.id, { ...restData } as ItemType);

      if (item.parentId) {
        const siblings = childrenMap.get(item.parentId) || [];
        siblings.push(item.id);
        childrenMap.set(item.parentId, siblings);
      }
    }

    childrenMap.forEach((childIds, parentId) => {
      const parent = nodeMap.get(parentId);
      if (parent) {
        nodeMap.set(
          parentId,
          this.setChildren(
            parent,
            childIds.map(id => nodeMap.get(id)).filter(node => node !== undefined)
          )
        );
      }
    });

    return data
      .filter(item => !item.parentId)
      .map(item => nodeMap.get(item.id))
      .filter(node => node !== undefined);
  }

  addItem(
    items: IDndSortableItem<ItemType, ChildItemType>[],
    parentId: UniqueIdentifier | null,
    newItem: ItemType,
    toLast = true
  ): IDndSortableItem<ItemType, ChildItemType>[] {
    if (!parentId) {
      return toLast
        ? [...items, { id: uniqueID(), original: newItem, depth: 0 } as IDndSortableItem<ItemType, ChildItemType>]
        : [{ id: uniqueID(), original: newItem, depth: 0 } as IDndSortableItem<ItemType, ChildItemType>, ...items];
    }
    const descendants = this.findAllDescendants(items, parentId);
    const lastDescendant = descendants[descendants.length - 1];
    const parent = items.find(item => item.id === parentId);
    const parentIndex = items.findIndex(item => item.id === parent?.id);
    const lastDescendantIndex = items.findIndex(item => item.id === lastDescendant?.id);
    const newItems = [...items];
    toLast
      ? newItems.splice((lastDescendantIndex >= 0 ? lastDescendantIndex : parentIndex) + 1, 0, {
          id: uniqueID(),
          original: newItem,
          parentId,
          depth: (parent?.depth ?? 0) + 1,
        })
      : newItems.splice(parentIndex + 1, 0, {
          id: uniqueID(),
          original: newItem,
          parentId,
          depth: (parent?.depth ?? 0) + 1,
        });
    return newItems;
  }

  removeItem(
    items: IDndSortableItem<ItemType, ChildItemType>[],
    id: UniqueIdentifier
  ): IDndSortableItem<ItemType, ChildItemType>[] {
    const descendants = this.findAllDescendants(items, id);

    const idsToRemove = [id, ...descendants.map(item => item.id)];

    return items.filter(item => !idsToRemove.includes(item.id));
  }

  handleDragEnd({
    clonedItems,
    active,
    delta,
    over,
    setItems,
    onChange,
  }: IHandleDragEndProps<ItemType, ChildItemType>): void {
    if (!(clonedItems && active?.id && over?.id)) {
      return;
    }

    const activeIndex = clonedItems.findIndex(item => item.id === active.id);
    const overIndex = clonedItems.findIndex(item => item.id === over.id);

    if (activeIndex === -1 || overIndex === -1) {
      return;
    }

    const newItems = active.id === over.id ? clonedItems : arrayMove(clonedItems, activeIndex, overIndex);
    const activeItem = clonedItems[activeIndex];
    const previousItem = newItems[overIndex - 1];

    const dragDepth = Math.round((delta?.x ?? 0) / (this.config.indent ?? this.DEFAULT_INDENT_SIZE));
    const projectedDepth = (activeItem?.depth ?? 0) + dragDepth;

    const maxDepth = previousItem ? (previousItem.depth ?? 0) + 1 : 0;
    const minDepth = 0;

    let depth = projectedDepth;
    if (depth >= maxDepth) {
      depth = maxDepth;
    }
    if (depth < minDepth) {
      depth = minDepth;
    }

    let newParentId: string | number | null | undefined = null;
    if (depth === 0) {
      newParentId = null;
    } else if (depth === previousItem?.depth) {
      newParentId = previousItem?.parentId;
    } else if (depth > (previousItem?.depth ?? 0)) {
      newParentId = previousItem?.original ? previousItem.id : null;
    } else {
      newParentId =
        newItems
          .slice(0, overIndex)
          .reverse()
          .find(item => item.depth === depth - 1)?.id ?? null;
    }

    const descendants = activeItem ? this.findAllDescendants(clonedItems, active.id) : [];
    const oldDepth = activeItem?.depth ?? 0;

    const finalItems = newItems.map((item, index) => {
      if (index < overIndex) {
        return item;
      }

      const itemId = item.id;

      if (itemId === active.id) {
        return {
          ...item,
          depth,
          parentId: newParentId,
        };
      }

      const descendant = descendants.find(d => d.id === itemId);
      if (descendant) {
        const relativeDepth = (descendant.depth ?? 0) - oldDepth;
        return {
          ...item,
          depth: depth + relativeDepth,
          parentId: item.parentId,
        };
      }

      return item;
    }) as IDndSortableItem<ItemType, ChildItemType>[];

    setItems(finalItems);
    onChange?.(this.convertToOriginal(finalItems));
  }

  findAllDescendants(
    items: IDndSortableItem<ItemType, ChildItemType>[],
    activeId: UniqueIdentifier
  ): IDndSortableItem<ItemType, ChildItemType>[] {
    const descendants: IDndSortableItem<ItemType, ChildItemType>[] = [];
    const activeIndex = items.findIndex(item => item.id === activeId);
    const activeItem = items[activeIndex];
    const currentDepth = activeItem?.depth ?? 0;

    for (let i = activeIndex + 1; i < items.length; i++) {
      const item = items[i];
      if (!item) {
        break;
      }
      if ((item.depth ?? 0) <= currentDepth) {
        break;
      }
      descendants.push(item);
    }
    return descendants;
  }

  toggleCollapse({
    activeItem,
    items,
    clonedItems,
    setItems,
  }: IToggleCollapseProps<ItemType, ChildItemType>): IDndSortableItem<ItemType, ChildItemType>[] | undefined {
    if (!clonedItems) {
      return;
    }

    const activeIndex = items.findIndex(item => item.id === activeItem.id);
    if (activeIndex === -1) {
      return;
    }

    let newItems: IDndSortableItem<ItemType, ChildItemType>[];

    if (activeItem.collapsed) {
      const descendants = this.findAllDescendants(clonedItems, activeItem.id);

      newItems = [...items];
      descendants.forEach((descendant, index) => {
        newItems.splice(activeIndex + 1 + index, 0, {
          ...descendant,
          collapsed: false,
        });
      });
    } else {
      const descendants = this.findAllDescendants(items, activeItem.id);
      newItems = items.filter(item => !descendants.find(d => d.id === item.id));
    }

    const updatedItems = newItems.map(item =>
      item.id === activeItem.id ? { ...item, collapsed: !activeItem.collapsed } : item
    );

    setItems(updatedItems);
  }
}
