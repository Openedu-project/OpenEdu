import type { BaseAutocompleteProps } from '../autocomplete/types';
import type { TreeItem } from '../sortable-tree/types';

export interface BaseAutocompleteTreeProps<T> extends BaseAutocompleteProps<T> {
  // treeData: TreeItems;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export interface AutocompleteTreeProps extends BaseAutocompleteTreeProps<TreeItem> {
  value?: TreeItem | null;
  onChange?: (option: TreeItem | null) => void;
}

export interface AutocompleteTreeMultipleProps extends BaseAutocompleteTreeProps<TreeItem> {
  value?: TreeItem[];
  onChange?: (options: TreeItem[]) => void;
  maxSelected?: number;
}
