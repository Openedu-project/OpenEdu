import type { UniqueIdentifier } from '@dnd-kit/core';
import { uniqueID } from '@oe/core/utils/unique';
import type { IDndSortableItem } from '../types';
import { MultipleAdapter } from './mulitple-adapter';

export class NestedArrayAdapter<ItemType, ChildItemType> extends MultipleAdapter<ItemType, ChildItemType> {
  convertToContainerItem(data: ItemType[]): IDndSortableItem<ItemType, ChildItemType>[] {
    return data.map(item => {
      if (Array.isArray(item)) {
        return {
          id: item[0][this.config.idProp as keyof ItemType] ?? uniqueID(),
          original: item,
          items: item.map(subItem => ({
            id: subItem[this.config.idItemProp as keyof ChildItemType] ?? uniqueID(),
            original: subItem,
          })),
        };
      }
      return {
        id: item[this.config.idProp as keyof ItemType] ?? uniqueID(),
        original: item,
      };
    }) as IDndSortableItem<ItemType, ChildItemType>[];
  }

  convertToOriginal(data: IDndSortableItem<ItemType, ChildItemType>[]): ItemType[] {
    return data.map(item => {
      if (item.items) {
        return item.items.map(item => item.original);
      }
      return item.original;
    }) as ItemType[];
  }

  addItem(
    items: IDndSortableItem<ItemType, ChildItemType>[],
    parentId: UniqueIdentifier | null,
    newItem: ItemType | ChildItemType,
    toLast = false
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
    } else if (parent) {
      parent.items = toLast
        ? [
            { id: parent.id, original: parent.original as unknown as ChildItemType },
            { id: uniqueID(), original: newItem as ChildItemType },
          ]
        : [
            { id: uniqueID(), original: newItem as ChildItemType },
            { id: parent.id, original: parent.original as unknown as ChildItemType },
          ];
    }
    newItems[parentIndex] = parent;
    return newItems;
  }
}
