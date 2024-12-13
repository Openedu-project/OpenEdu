import { closestCenter } from '@dnd-kit/core';

import type { CollisionDetection, KeyboardCoordinateGetter, UniqueIdentifier } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type {
  ICollisionDetectionStrategyProps,
  IContainerItem,
  IDataConfig,
  IHandleDragEndProps,
  IHandleDragOverProps,
  ISortableItem,
} from '../types';

export abstract class DataAdapter<T, K> {
  DEFAULT_INDENT_SIZE = 20;
  config: IDataConfig<T, K> = {
    idProp: 'id' as keyof T,
    childrenProp: 'children' as keyof T,
    idItemProp: 'id' as keyof K,
    type: 'array',
  };

  constructor(config: IDataConfig<T, K>) {
    this.config = config;
  }

  findContainerItemById(items: IContainerItem<T, K>[], id?: UniqueIdentifier) {
    return id !== undefined ? items.find(item => item.id === id) : undefined;
  }

  findContainerItemByItemId(items: IContainerItem<T, K>[], id?: UniqueIdentifier) {
    return id !== undefined ? items.find(item => item.items?.find(item => item.id === id)) : undefined;
  }

  findItemById(items: IContainerItem<T, K>[], id?: UniqueIdentifier) {
    let result: ISortableItem<K> | undefined;

    for (const item of items) {
      const itemFound = item.items?.find(item => item.id === id);

      if (itemFound) {
        result = itemFound;
        break;
      }
    }

    return result;
  }

  findContainerIndex(items: IContainerItem<T, K>[], id?: UniqueIdentifier) {
    return id !== undefined ? items.findIndex(item => item.id === id) : -1;
  }

  findContainerIndexByItemId(items: IContainerItem<T, K>[], id?: UniqueIdentifier) {
    return id !== undefined ? items.findIndex(item => item.items?.find(item => item.id === id)) : -1;
  }

  findItemIndex(items: IContainerItem<T, K>[], id?: UniqueIdentifier) {
    let result: number | undefined = -1;

    for (const item of items) {
      const itemFound = item.items?.findIndex(item => item.id === id);

      if (itemFound) {
        result = itemFound;
        break;
      }
    }

    return result;
  }

  findId(items: IContainerItem<T, K>[], id?: UniqueIdentifier) {
    if (id !== undefined && items.find(item => item.id === id)) {
      return id;
    }

    return items.find(item => item.items?.find(item => item.id === id))?.id;
  }

  collisionDetectionStrategy(_: ICollisionDetectionStrategyProps<T, K>): CollisionDetection {
    return closestCenter;
  }

  coordinateGetter: KeyboardCoordinateGetter = sortableKeyboardCoordinates;

  handleDragOver(_: IHandleDragOverProps<T, K>): IContainerItem<T, K>[] | null {
    return null;
  }

  findAllDescendants(_: IContainerItem<T, K>[], __: number): IContainerItem<T, K>[] {
    return [];
  }

  abstract convertToContainerItem(data: T[]): IContainerItem<T, K>[];
  abstract convertToOriginal(data: IContainerItem<T, K>[]): T[];
  abstract handleDragEnd(props: IHandleDragEndProps<T, K>): void;
}
