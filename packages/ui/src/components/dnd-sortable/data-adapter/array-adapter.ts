import { arrayMove } from '@dnd-kit/sortable';
import { uniqueID } from '@oe/core/utils/unique';
import type { IDndSortableItem, IHandleDragEndProps } from '../types';
import { DataAdapter } from './base-adapter';

export class ArrayAdapter<ItemType, ChildItemType = ItemType> extends DataAdapter<ItemType, ChildItemType> {
  convertToContainerItem(data: ItemType[]): IDndSortableItem<ItemType, ChildItemType>[] {
    return data.map(item => ({
      id: item[this.config.idProp as keyof ItemType] ?? uniqueID(),
      original: item,
    })) as IDndSortableItem<ItemType, ChildItemType>[];
  }

  convertToOriginal(data: IDndSortableItem<ItemType, ChildItemType>[]): ItemType[] {
    return data.map(item => ({
      ...item.original,
      [this.config.childrenProp as keyof ItemType]: item.items?.map(item => item.original),
    }));
  }

  handleDragEnd({ items, active, over, setItems, onChange }: IHandleDragEndProps<ItemType, ChildItemType>) {
    if (!over || active?.id === over.id) {
      return;
    }

    const activeIndex = this.findContainerIndex(items, active?.id);
    const overIndex = this.findContainerIndex(items, over?.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      const newItems = arrayMove(items, activeIndex, overIndex);
      setItems(newItems);
      onChange(this.convertToOriginal(newItems));
    }
  }
}
