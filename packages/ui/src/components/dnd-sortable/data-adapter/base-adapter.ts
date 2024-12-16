import { closestCenter } from '@dnd-kit/core';

import type { CollisionDetection, KeyboardCoordinateGetter, UniqueIdentifier } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type {
  ICollisionDetectionStrategyProps,
  IDndSortableChildItem,
  IDndSortableDataConfig,
  IDndSortableItem,
  IHandleDragEndProps,
  IHandleDragOverProps,
  IToggleCollapseProps,
} from '../types';

export abstract class DataAdapter<ItemType, ChildItemType = ItemType> {
  DEFAULT_INDENT_SIZE = 20;
  config: IDndSortableDataConfig<ItemType, ChildItemType> = {
    idProp: 'id' as keyof ItemType,
    childrenProp: 'children' as keyof ItemType,
    idItemProp: 'id' as keyof ChildItemType,
    type: 'array',
  };

  constructor(config: IDndSortableDataConfig<ItemType, ChildItemType>) {
    this.config = config;
  }

  findContainerItemById(items: IDndSortableItem<ItemType, ChildItemType>[], id?: UniqueIdentifier) {
    return id !== undefined ? items.find(item => item.id === id) : undefined;
  }

  findContainerItemByItemId(items: IDndSortableItem<ItemType, ChildItemType>[], id?: UniqueIdentifier) {
    return id !== undefined ? items.find(item => item.items?.find(item => item.id === id)) : undefined;
  }

  findItemById(items: IDndSortableItem<ItemType, ChildItemType>[], id?: UniqueIdentifier) {
    let result: IDndSortableChildItem<ChildItemType> | undefined;

    for (const item of items) {
      const itemFound = item.items?.find(item => item.id === id);

      if (itemFound) {
        result = itemFound;
        break;
      }
    }

    return result;
  }

  findContainerIndex(items: IDndSortableItem<ItemType, ChildItemType>[], id?: UniqueIdentifier) {
    return id !== undefined ? items.findIndex(item => item.id === id) : -1;
  }

  findContainerIndexByItemId(items: IDndSortableItem<ItemType, ChildItemType>[], id?: UniqueIdentifier) {
    return id !== undefined ? items.findIndex(item => item.items?.find(item => item.id === id)) : -1;
  }

  findItemIndex(items: IDndSortableItem<ItemType, ChildItemType>[], id?: UniqueIdentifier) {
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

  findId(items: IDndSortableItem<ItemType, ChildItemType>[], id?: UniqueIdentifier) {
    if (id !== undefined && items.find(item => item.id === id)) {
      return id;
    }

    return items.find(item => item.items?.find(item => item.id === id))?.id;
  }

  collisionDetectionStrategy(_: ICollisionDetectionStrategyProps<ItemType, ChildItemType>): CollisionDetection {
    return closestCenter;
  }

  coordinateGetter: KeyboardCoordinateGetter = sortableKeyboardCoordinates;

  handleDragOver(_: IHandleDragOverProps<ItemType, ChildItemType>): IDndSortableItem<ItemType, ChildItemType>[] | null {
    return null;
  }

  findAllDescendants(
    _: IDndSortableItem<ItemType, ChildItemType>[],
    __: UniqueIdentifier
  ): IDndSortableItem<ItemType, ChildItemType>[] {
    return [];
  }

  addItem(
    _: IDndSortableItem<ItemType, ChildItemType>[],
    __: UniqueIdentifier | null,
    ___: ItemType | ChildItemType,
    ____?: boolean
  ): IDndSortableItem<ItemType, ChildItemType>[] {
    return [];
  }

  removeItem(
    items: IDndSortableItem<ItemType, ChildItemType>[] | IDndSortableChildItem<ChildItemType>[],
    id: UniqueIdentifier
  ): IDndSortableItem<ItemType, ChildItemType>[] | IDndSortableChildItem<ChildItemType>[] {
    const newItems: IDndSortableItem<ItemType, ChildItemType>[] = [];

    for (const item of items) {
      if (item.id === id) {
        continue;
      }

      if (
        (item as IDndSortableItem<ItemType, ChildItemType>).items &&
        ((item as IDndSortableItem<ItemType, ChildItemType>).items?.length ?? 0) > 0
      ) {
        (item as IDndSortableItem<ItemType, ChildItemType>).items = this.removeItem(
          (item as IDndSortableItem<ItemType, ChildItemType>).items as IDndSortableChildItem<ChildItemType>[],
          id
        ) as IDndSortableChildItem<ChildItemType>[];
      }

      newItems.push(item as IDndSortableItem<ItemType, ChildItemType>);
    }

    return newItems;
  }

  toggleCollapse(
    _: IToggleCollapseProps<ItemType, ChildItemType>
  ): IDndSortableItem<ItemType, ChildItemType>[] | undefined {
    return;
  }

  updateItem(
    value: ItemType[keyof ItemType] | ChildItemType[keyof ChildItemType],
    key: keyof ItemType | keyof ChildItemType,
    activeItem: IDndSortableItem<ItemType, ChildItemType> | IDndSortableChildItem<ChildItemType>,
    items: IDndSortableItem<ItemType, ChildItemType>[]
  ): IDndSortableItem<ItemType, ChildItemType>[] {
    const newItems = [...items];

    const itemIndex = newItems.findIndex(item => item.id === activeItem.id);

    if (itemIndex !== -1) {
      newItems[itemIndex] = {
        ...activeItem,
        original: { ...activeItem.original, [key]: value } as ItemType,
      } as IDndSortableItem<ItemType, ChildItemType>;

      return newItems;
    }

    return newItems.map(item => {
      if (item.items) {
        const childIndex = item.items.findIndex(child => child.id === activeItem.id);

        if (childIndex !== -1) {
          return {
            ...item,
            items: item.items.map((child, index) =>
              index === childIndex
                ? {
                    ...child,
                    original: { ...child.original, [key]: value } as ChildItemType,
                  }
                : child
            ),
          };
        }
      }
      return item;
    });
  }

  abstract convertToContainerItem(data: ItemType[]): IDndSortableItem<ItemType, ChildItemType>[];
  abstract convertToOriginal(data: IDndSortableItem<ItemType, ChildItemType>[]): ItemType[];
  abstract handleDragEnd(props: IHandleDragEndProps<ItemType, ChildItemType>): void;
}
