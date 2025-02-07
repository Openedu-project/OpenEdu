import type { IDndSortableDataConfig } from '../types';
import { ArrayAdapter } from './array-adapter';
import type { DataAdapter } from './base-adapter';
import { MultipleAdapter } from './mulitple-adapter';
import { NestedArrayAdapter } from './nested-array-adapter';
import { TreeAdapter } from './tree-adapter';

export type { DataAdapter };

export function createDataAdapter<ItemType, ChildItemType>(
  config: IDndSortableDataConfig<ItemType, ChildItemType>
): DataAdapter<ItemType, ChildItemType> {
  switch (config.type) {
    case 'multiple-container':
      return new MultipleAdapter<ItemType, ChildItemType>(config);
    case 'nested-array':
      return new NestedArrayAdapter<ItemType, ChildItemType>(config);
    case 'tree':
      return new TreeAdapter<ItemType, ChildItemType>(config);
    default:
      return new ArrayAdapter<ItemType, ChildItemType>(config);
  }
}
