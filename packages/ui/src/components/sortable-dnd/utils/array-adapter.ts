import { arrayMove } from '@dnd-kit/sortable';
import { uniqueID } from '@oe/core/utils/unique';
import type { IContainerItem, IHandleDragEndProps } from '../types';
import { DataAdapter } from './base-adapter';

export class ArrayAdapter<T, K> extends DataAdapter<T, K> {
  convertToContainerItem(data: T[]): IContainerItem<T, K>[] {
    return data.map(item => ({
      id: item[this.config.idProp as keyof T] ?? uniqueID(),
      original: item,
    })) as IContainerItem<T, K>[];
  }

  convertToOriginal(data: IContainerItem<T, K>[]): T[] {
    return data.map(item => ({
      ...item.original,
      [this.config.childrenProp as keyof T]: item.items?.map(item => item.original),
    }));
  }

  handleDragEnd({ items, active, over, setItems, setContainers, onSort }: IHandleDragEndProps<T, K>) {
    if (!over || active?.id === over.id) {
      return;
    }

    const activeIndex = this.findContainerIndex(items, active?.id);
    const overIndex = this.findContainerIndex(items, over?.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      const newItems = arrayMove(items, activeIndex, overIndex);
      setItems(newItems);
      setContainers(newItems.map(item => item.id));
      onSort(this.convertToOriginal(newItems));
    }
  }
}
