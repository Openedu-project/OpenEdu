import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { uniqueID } from '@oe/core/utils/unique';
import type { IContainerItem, IHandleDragEndProps } from '../types';
import { DataAdapter } from './base-adapter';

export class TreeAdapter<T, K> extends DataAdapter<T, K> {
  setChildren(item: T, children: T[]): T {
    (item[this.config.childrenProp as keyof T] as unknown as T[]) = children;
    return item;
  }

  convertToContainerItem(data: T[]): IContainerItem<T, K>[] {
    const flattenTree = (items: T[], parentId: UniqueIdentifier | null = null, depth = 0): IContainerItem<T, K>[] => {
      return (
        (items?.flatMap((item, index) => [
          { id: item[this.config.idProp as keyof T] ?? uniqueID(), original: item, parentId, depth, index },
          ...flattenTree(
            (item[this.config.childrenProp as keyof T] as T[])?.map(child => ({
              ...child,
              [this.config.idProp as keyof T]: child[this.config.idProp as keyof T],
            })) ?? [],
            item[this.config.idProp as keyof T] as UniqueIdentifier,
            depth + 1
          ),
        ]) as IContainerItem<T, K>[]) ?? []
      );
    };

    return flattenTree(data);
  }

  convertToOriginal(data: IContainerItem<T, K>[]): T[] {
    const nodeMap = new Map<UniqueIdentifier, T>();
    const childrenMap = new Map<UniqueIdentifier, UniqueIdentifier[]>();

    for (const item of data) {
      const { [this.config.childrenProp as keyof T]: children, ...restData } = item.original;
      nodeMap.set(item.id, { ...restData } as T);

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
      .filter(item => item.parentId === null)
      .map(item => nodeMap.get(item.id))
      .filter(node => node !== undefined);
  }

  // handleDragEnd({
  //   items,
  //   active,
  //   delta,
  //   over,
  //   setItems,
  //   setContainers,
  //   setActiveId,
  //   onSort,
  // }: IHandleDragEndProps<T, K>): void {
  //   const activeIndex = items.findIndex(item => item.id === active?.id);
  //   const overIndex = items.findIndex(item => item.id === over?.id);

  //   if (activeIndex === -1 || overIndex === -1) {
  //     return;
  //   }

  //   const newItems = active?.id === over?.id ? items : arrayMove(items, activeIndex, overIndex);
  //   const activeItem = items[activeIndex];
  //   const previousItem = newItems[overIndex - 1];

  //   const dragDepth = Math.round((delta?.x ?? 0) / (this.config.indent ?? this.DEFAULT_INDENT_SIZE));
  //   const projectedDepth = (activeItem?.depth ?? 0) + dragDepth;

  //   const maxDepth = previousItem ? (previousItem.depth ?? 0) + 1 : 0;
  //   const minDepth = 0;

  //   let depth = projectedDepth;
  //   if (depth >= maxDepth) {
  //     depth = maxDepth;
  //   }
  //   if (depth < minDepth) {
  //     depth = minDepth;
  //   }

  //   let newParentId: string | number | null | undefined = null;
  //   if (depth === 0) {
  //     newParentId = null;
  //   } else if (depth === previousItem?.depth) {
  //     newParentId = previousItem?.parentId;
  //   } else if (depth > (previousItem?.depth ?? 0)) {
  //     newParentId = previousItem?.original ? previousItem.id : null;
  //   } else {
  //     newParentId =
  //       newItems
  //         .slice(0, overIndex)
  //         .reverse()
  //         .find(item => item.depth === depth - 1)?.id ?? null;
  //   }

  //   const findAllDescendants = (parentId: string | number): IContainerItem<T, K>[] => {
  //     const descendants: IContainerItem<T, K>[] = [];
  //     const currentDepth = items.find(item => item.id === parentId)?.depth ?? 0;

  //     for (let i = activeIndex + 1; i < items.length; i++) {
  //       const item = items[i];
  //       if (!item) {
  //         break;
  //       }
  //       if ((item.depth ?? 0) <= currentDepth) {
  //         break;
  //       }
  //       descendants.push(item);
  //     }
  //     return descendants;
  //   };

  //   const descendants = activeItem ? findAllDescendants(activeItem.id) : [];
  //   const oldDepth = activeItem?.depth ?? 0;

  //   const finalItems = newItems.map((item, index) => {
  //     if (index < overIndex) {
  //       return item;
  //     }

  //     const itemId = item.id;

  //     if (itemId === active?.id) {
  //       return {
  //         ...item,
  //         depth,
  //         parentId: newParentId,
  //       };
  //     }

  //     const descendant = descendants.find(d => d.id === itemId);
  //     if (descendant) {
  //       const relativeDepth = (descendant.depth ?? 0) - (oldDepth ?? 0);
  //       return {
  //         ...item,
  //         depth: depth + relativeDepth,
  //         parentId: item.parentId,
  //       };
  //     }

  //     return item;
  //   }) as IContainerItem<T, K>[];

  //   setItems(finalItems);
  //   setContainers(finalItems.map(item => item.id));
  //   onSort(this.convertToOriginal(finalItems));
  //   setActiveId(null);
  // }

  handleDragEnd({
    clonedItems,
    active,
    delta,
    over,
    setItems,
    setContainers,
    setActiveId,
    onSort,
  }: IHandleDragEndProps<T, K>): void {
    if (!(clonedItems && active?.id && over?.id)) {
      setActiveId(null);
      return;
    }

    const activeIndex = clonedItems.findIndex(item => item.id === active.id);
    const overIndex = clonedItems.findIndex(item => item.id === over.id);

    if (activeIndex === -1 || overIndex === -1) {
      setActiveId(null);
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

    const descendants = activeItem ? this.findAllDescendants(clonedItems, activeIndex) : [];
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
    }) as IContainerItem<T, K>[];

    setItems(finalItems);
    setContainers(finalItems.map(item => item.id));
    onSort(this.convertToOriginal(finalItems));
    setActiveId(null);
  }

  findAllDescendants(items: IContainerItem<T, K>[], activeIndex: number): IContainerItem<T, K>[] {
    const descendants: IContainerItem<T, K>[] = [];
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
}
