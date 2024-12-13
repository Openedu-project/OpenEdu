import type { IDataConfig } from '../types';
import { ArrayAdapter } from './array-adapter';
import type { DataAdapter } from './base-adapter';
import { MultipleAdapter } from './mulitple-adapter';
import { NestedArrayAdapter } from './nested-array-adapter';
import { TreeAdapter } from './tree-adapter';

export function createDataAdapter<T, K>(config: IDataConfig<T, K>): DataAdapter<T, K> {
  switch (config.type) {
    case 'multiple-container':
      return new MultipleAdapter<T, K>(config);
    case 'nested-array':
      return new NestedArrayAdapter<T, K>(config);
    case 'tree':
      return new TreeAdapter<T, K>(config);
    default:
      return new ArrayAdapter<T, K>(config);
  }
}
