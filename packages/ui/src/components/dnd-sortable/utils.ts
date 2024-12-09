import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { IDndSortableBaseItem, IDndSortableDataAdapterConfig, IDndSortableNormalizedItem } from './types';

// Abstract base DataAdapter class
export abstract class DataAdapter<T extends IDndSortableBaseItem> {
  config: IDndSortableDataAdapterConfig<T>;

  constructor(config: IDndSortableDataAdapterConfig<T>) {
    this.config = {
      idPath: 'id',
      childrenPath: 'children' as keyof T,
      type: 'array',
      ...config,
    };
  }

  getId(item: T | IDndSortableNormalizedItem<T>): string | number {
    if (!item) {
      return '';
    }

    if (typeof this.config.idPath === 'function') {
      return this.config.idPath(item as T);
    }

    return item[this.config.idPath as keyof (T | IDndSortableNormalizedItem<T>)] as string | number;
  }

  getChildren(item: T): T[] {
    if (this.config.getChildren) {
      return this.config.getChildren(item);
    }
    return (item[this.config.childrenPath as keyof T] as unknown as T[]) || [];
  }

  setChildren(item: T, children: T[]): T {
    if (this.config.setChildren) {
      return this.config.setChildren(item, children);
    }
    return {
      ...item,
      [this.config.childrenPath as keyof T]: children,
    } as T;
  }

  abstract normalize(items: T[], depth?: number, parentId?: string | null): IDndSortableNormalizedItem<T>[];
  abstract denormalize(items: IDndSortableNormalizedItem<T>[]): T[];
  abstract updateItems(items: IDndSortableNormalizedItem<T>[], event: DragEndEvent): IDndSortableNormalizedItem<T>[];
}

// Specific DataAdapter implementations
export class NestedArrayDataAdapter<T extends IDndSortableBaseItem> extends DataAdapter<T> {
  normalize(items: (T | T[])[], depth = 0, parentId: string | null = null): IDndSortableNormalizedItem<T>[] {
    return items.map((item, index) => {
      if (Array.isArray(item)) {
        return {
          id: `${parentId || 'root'}-group-${index}`,
          type: 'group',
          items: this.normalize(item, depth + 1, `${parentId || 'root'}-${index}`),
          depth,
          originalData: {} as T,
        };
      }
      return {
        ...item,
        depth,
        originalData: item,
      };
    });
  }

  denormalize(items: IDndSortableNormalizedItem<T>[]): T[] {
    return items.map(item => {
      if (item.type === 'group' && item.items) {
        return this.denormalize(item.items) as unknown as T;
      }
      return item.originalData;
    });
  }

  updateItems(items: IDndSortableNormalizedItem<T>[], event: DragEndEvent): IDndSortableNormalizedItem<T>[] {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return items;
    }

    const findAndUpdate = (items: IDndSortableNormalizedItem<T>[]): IDndSortableNormalizedItem<T>[] => {
      const activeIndex = items.findIndex(item => this.getId(item) === active.id);
      const overIndex = items.findIndex(item => this.getId(item) === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        return arrayMove(items, activeIndex, overIndex);
      }

      return items.map(item => {
        if (item.type === 'group' && item.items) {
          return {
            ...item,
            items: findAndUpdate(item.items),
          };
        }
        return item;
      });
    };

    return findAndUpdate(items);
  }
}

export class TreeDataAdapter<T extends IDndSortableBaseItem> extends DataAdapter<T> {
  normalize(items: T[]): IDndSortableNormalizedItem<T>[] {
    const flattenTree = (
      items: T[],
      parentId: string | number | null = null,
      depth = 0
    ): IDndSortableNormalizedItem<T>[] => {
      return (
        items?.flatMap((item, index) => [
          { originalData: item, parentId, depth, index },
          ...flattenTree(item?.children ?? [], item.id, depth + 1),
        ]) ?? []
      );
      // return items.flatMap((item, index) => {
      //   const children = this.getChildren(item);
      //   return [
      //     {
      //       id: this.getId(item),
      //       depth,
      //       originalData: item,
      //       parentId: parentId,
      //       index,
      //       items: children.length > 0 ? flattenTree(children, this.getId(item), depth + 1) : undefined,
      //     },
      //     ...(children.length > 0 ? flattenTree(children, this.getId(item), depth + 1) : []),
      //   ];
      // });
    };

    return flattenTree(items);
  }

  denormalize(items: IDndSortableNormalizedItem<T>[]): T[] {
    const itemsByParent: { [key: string | number]: IDndSortableNormalizedItem<T>[] } = {};

    // Nhóm items theo parentId
    for (const item of items) {
      const parentId = item.parentId ?? 'root';
      if (!itemsByParent[parentId]) {
        itemsByParent[parentId] = [];
      }
      itemsByParent[parentId].push(item);
    }

    // Hàm đệ quy để build tree
    const buildTreeRecursive = (parentId: string | number | 'root'): T[] => {
      const children = itemsByParent[parentId] || [];
      return children.map(item => {
        const node = { ...item.originalData };
        const childItems = buildTreeRecursive(this.getId(item.originalData));
        if (childItems.length > 0) {
          this.setChildren(node, childItems);
        }
        return node;
      });
    };

    // Bắt đầu build từ root
    return buildTreeRecursive('root');
  }

  updateItems(items: IDndSortableNormalizedItem<T>[], event: DragEndEvent): IDndSortableNormalizedItem<T>[] {
    const { active, over } = event;
    const activeIndex = items.findIndex(item => this.getId(item.originalData) === active.id);
    const overIndex = items.findIndex(item => this.getId(item.originalData) === over?.id);

    if (activeIndex === -1 || overIndex === -1) {
      return items;
    }

    const newItems = active.id === over?.id ? items : arrayMove(items, activeIndex, overIndex);
    const activeItem = items[activeIndex];
    const previousItem = newItems[overIndex - 1];
    const nextItem = newItems[overIndex + 1];

    // Tính toán độ sâu dựa trên khoảng cách kéo
    const dragDepth = Math.round(event.delta.x / (this.config.indent ?? 20));
    const projectedDepth = (activeItem?.depth ?? 0) + dragDepth;

    // Tính toán độ sâu tối đa và tối thiểu cho phép
    const maxDepth = previousItem ? previousItem.depth + 1 : 0;
    const minDepth = nextItem ? nextItem.depth : 0;

    // Giới hạn độ sâu trong phạm vi cho phép
    let depth = projectedDepth;
    if (depth > maxDepth) {
      depth = maxDepth;
    }
    if (depth < minDepth) {
      depth = minDepth;
    }

    // Xác định parentId mới
    let newParentId: string | number | null | undefined = null;
    if (depth === 0) {
      newParentId = null;
    } else if (previousItem) {
      if (depth === previousItem.depth) {
        // Cùng cấp với previous item
        newParentId = previousItem.parentId;
      } else if (depth > previousItem.depth) {
        // Là con của previous item
        newParentId = this.getId(previousItem);
      } else {
        // Tìm parent phù hợp với depth mới
        for (let i = overIndex - 1; i >= 0; i--) {
          if (newItems[i]?.depth === depth) {
            newParentId = newItems[i]?.parentId;
            break;
          }
        }
      }
    }

    console.log('newParentId', newParentId, depth, newItems, activeItem, previousItem, nextItem);

    // Cập nhật item được kéo với depth và parentId mới
    return newItems.map(item => {
      if (this.getId(item.originalData) === active.id) {
        return {
          ...item,
          depth,
          parentId: newParentId,
        };
      }
      return item;
    });
  }
}

export class ArrayDataAdapter<T extends IDndSortableBaseItem> extends DataAdapter<T> {
  normalize(items: T[], depth = 0): IDndSortableNormalizedItem<T>[] {
    return items.map(item => ({
      ...item,
      depth,
      originalData: item,
    }));
  }

  denormalize(items: IDndSortableNormalizedItem<T>[]): T[] {
    return items.map(item => item.originalData);
  }

  updateItems(items: IDndSortableNormalizedItem<T>[], event: DragEndEvent): IDndSortableNormalizedItem<T>[] {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return items;
    }

    const activeIndex = items.findIndex(item => this.getId(item) === active.id);
    const overIndex = items.findIndex(item => this.getId(item) === over.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      return arrayMove(items, activeIndex, overIndex);
    }

    return items;
  }
}

// Custom structure adapter
export class CustomDataAdapter<T extends IDndSortableBaseItem> extends DataAdapter<T> {
  private normalizeFunc: (items: T[], depth?: number) => IDndSortableNormalizedItem<T>[];
  private denormalizeFunc: (items: IDndSortableNormalizedItem<T>[]) => T[];
  private updateItemsFunc: (
    items: IDndSortableNormalizedItem<T>[],
    activeId: string | number,
    overId: string | number
  ) => IDndSortableNormalizedItem<T>[];

  constructor(
    config: IDndSortableDataAdapterConfig<T> & {
      normalize: (items: T[], depth?: number) => IDndSortableNormalizedItem<T>[];
      denormalize: (items: IDndSortableNormalizedItem<T>[]) => T[];
      updateItems: (
        items: IDndSortableNormalizedItem<T>[],
        activeId: string | number,
        overId: string | number
      ) => IDndSortableNormalizedItem<T>[];
    }
  ) {
    super(config);
    this.normalizeFunc = config.normalize;
    this.denormalizeFunc = config.denormalize;
    this.updateItemsFunc = config.updateItems;
  }

  normalize(items: T[], depth = 0): IDndSortableNormalizedItem<T>[] {
    return this.normalizeFunc(items, depth);
  }

  denormalize(items: IDndSortableNormalizedItem<T>[]): T[] {
    return this.denormalizeFunc(items);
  }

  updateItems(items: IDndSortableNormalizedItem<T>[], event: DragEndEvent): IDndSortableNormalizedItem<T>[] {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return items;
    }

    return this.updateItemsFunc(items, active.id, over.id);
  }
}

// Factory function to create appropriate adapter
export function createDataAdapter<T extends IDndSortableBaseItem>(
  config: IDndSortableDataAdapterConfig<T>
): DataAdapter<T> {
  switch (config.type) {
    case 'tree':
      return new TreeDataAdapter<T>(config);
    case 'array':
      return new ArrayDataAdapter<T>(config);
    case 'nested-array':
      return new NestedArrayDataAdapter<T>(config);
    case 'custom':
      return new CustomDataAdapter<T>(
        config as Required<Pick<IDndSortableDataAdapterConfig<T>, 'normalize' | 'denormalize' | 'updateItems'>>
      );
    default:
      return new ArrayDataAdapter<T>(config);
  }
}
