import type { BaseAutocompleteProps } from '../autocomplete/types';

export interface FlattenedItem extends TreeItem {
  parentId: number | string | null;
  depth: number;
  index: number;
}
export interface TreeItem {
  id: number | string;
  children?: TreeItem[];
  collapsed?: boolean;
  title: string;
}

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
