import { uniqueID } from '@oe/core/utils/unique';
import type { IContainerItem } from '../types';
import { MultipleAdapter } from './mulitple-adapter';

export class NestedArrayAdapter<T, K> extends MultipleAdapter<T, K> {
  convertToContainerItem(data: T[]): IContainerItem<T, K>[] {
    return data.map(item => {
      if (Array.isArray(item)) {
        return {
          id: item[0][this.config.idProp as keyof T] ?? uniqueID(),
          original: item,
          items: item.map(subItem => ({
            id: subItem[this.config.idItemProp as keyof K] ?? uniqueID(),
            original: subItem,
          })),
        };
      }
      return {
        id: item[this.config.idProp as keyof T] ?? uniqueID(),
        original: item,
      };
    }) as IContainerItem<T, K>[];
  }

  convertToOriginal(data: IContainerItem<T, K>[]): T[] {
    return data.map(item => {
      if (item.items) {
        return item.items.map(item => item.original);
      }
      return item.original;
    }) as T[];
  }
}
